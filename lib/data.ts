import { sampleMatches, samplePlayers } from "@/lib/sample-data";
import { supabase } from "@/lib/supabase";
import type { Match, Player } from "@/lib/types";

export async function getCurrentMatch(): Promise<Match> {
  if (!supabase) return sampleMatches[0];
  const { data, error } = await supabase.from("matches").select("*").order("current_overs", { ascending: false }).limit(1).maybeSingle();
  if (error || !data) return sampleMatches[0];
  return data as Match;
}

export async function getMatchById(id: string): Promise<Match | null> {
  if (!supabase) return sampleMatches.find((match) => match.id === id) ?? null;
  const { data, error } = await supabase.from("matches").select("*").eq("id", id).maybeSingle();
  if (error) return null;
  return data as Match | null;
}

export async function getPlayers(): Promise<Player[]> {
  if (!supabase) return samplePlayers;
  const { data, error } = await supabase.from("players").select("*").order("name");
  if (error || !data?.length) return samplePlayers;
  return data as Player[];
}
