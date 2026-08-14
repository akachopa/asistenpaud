import { ActivityGenerator } from "./activity-generator";

export const metadata = { title: "Buat Kegiatan" };

export default async function NewActivityPage({ searchParams }: PageProps<"/app/activity/new">) {
  const params = await searchParams;
  const quickwin = params.quickwin === "1";
  return <ActivityGenerator quickwin={quickwin} />;
}
