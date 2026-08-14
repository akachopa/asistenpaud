import type { AIFeature } from "./schemas";

export interface AIProviderResult {
  output: unknown;
  tokenInput: number;
  tokenOutput: number;
  model: string;
}

export interface AIProvider {
  readonly name: string;
  generate(
    feature: AIFeature,
    systemPrompt: string,
    userPrompt: string,
    input: unknown,
  ): Promise<AIProviderResult>;
}
