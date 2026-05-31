import { Dashboard } from "@/components/dashboard/dashboard";
import { getCurrentMatch, getPlayers } from "@/lib/data";

export default async function HomePage() {
  const [match, players] = await Promise.all([getCurrentMatch(), getPlayers()]);
  return <Dashboard initialMatch={match} players={players} />;
}
