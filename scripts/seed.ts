import { createClient } from "@supabase/supabase-js";
import { sampleMatches, samplePlayers } from "../lib/sample-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.");
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function seed() {
  const matchResult = await supabase.from("matches").upsert(sampleMatches);
  if (matchResult.error) throw matchResult.error;

  const playerResult = await supabase.from("players").upsert(samplePlayers);
  if (playerResult.error) throw playerResult.error;

  console.log(`Seeded ${sampleMatches.length} matches and ${samplePlayers.length} players.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
