import { CompareView } from "@/components/compare/compare-view";
import { getPlayers } from "@/lib/data";

export default async function ComparePage() {
  const players = await getPlayers();
  return <CompareView players={players} />;
}
