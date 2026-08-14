import type { AIProvider, AIProviderResult } from "./provider";
import type { AIFeature } from "./schemas";

interface ChatCompletionResponse {
  choices: { message: { content: string } }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
}

// Provider untuk API yang kompatibel dengan OpenAI Chat Completions
// (OpenAI, OpenRouter, Groq, Ollama, dsb) via AI_BASE_URL + AI_API_KEY.
export class OpenAICompatibleProvider implements AIProvider {
  readonly name = "openai-compatible";
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    this.baseUrl = process.env.AI_BASE_URL ?? "https://api.openai.com/v1";
    this.apiKey = process.env.AI_API_KEY ?? "";
    this.model = process.env.AI_MODEL ?? "gpt-4o-mini";
  }

  async generate(
    _feature: AIFeature,
    systemPrompt: string,
    userPrompt: string,
  ): Promise<AIProviderResult> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`AI provider error ${res.status}: ${body.slice(0, 300)}`);
    }

    const data = (await res.json()) as ChatCompletionResponse;
    const content = data.choices[0]?.message?.content ?? "";
    let output: unknown;
    try {
      output = JSON.parse(content);
    } catch {
      // coba ekstrak blok JSON jika model membungkus dengan teks
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Output AI bukan JSON valid");
      output = JSON.parse(match[0]);
    }

    return {
      output,
      tokenInput: data.usage?.prompt_tokens ?? 0,
      tokenOutput: data.usage?.completion_tokens ?? 0,
      model: this.model,
    };
  }
}
