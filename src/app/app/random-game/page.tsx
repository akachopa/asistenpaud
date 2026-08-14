import { RandomGameClient } from "./random-game-client";

export const metadata = { title: "Kasih Saya Game!" };

export default async function RandomGamePage({ searchParams }: PageProps<"/app/random-game">) {
  const params = await searchParams;
  const get = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : undefined;
  };
  return (
    <RandomGameClient
      initialDuration={get("duration")}
      initialNoTools={get("noTools") === "1"}
      initialLocation={get("location")}
    />
  );
}
