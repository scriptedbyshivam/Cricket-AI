import { FantasyView } from "@/components/fantasy/fantasy-view";
import { getCurrentMatch, getPlayers } from "@/lib/data";

export default async function FantasyPage() {
  const [match, players] = await Promise.all([getCurrentMatch(), getPlayers()]);
  return <FantasyView match={match} players={players} />;
}
