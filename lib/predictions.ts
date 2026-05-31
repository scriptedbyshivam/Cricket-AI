import type { FantasyPick, Match, Player } from "@/lib/types";

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));
const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);

export function normalisePlayer(player: Player) {
  const form = average(player.last_5_scores);
  const bowlingScore = player.bowling_avg > 0 ? clamp(100 - player.bowling_avg * 1.7 + (6.5 - player.bowling_economy) * 8) : 0;
  return {
    attack: clamp(player.batting_sr * 0.65 + form * 0.35),
    defence: clamp(player.batting_avg * 1.45 + (player.role === "Wicketkeeper" ? 8 : 0)),
    consistency: clamp(100 - standardDeviation(player.last_5_scores) * 1.7 + average(player.last_5_scores) * 0.25),
    strikeRate: clamp(player.batting_sr * 0.75),
    economy: player.bowling_economy > 0 ? clamp(100 - player.bowling_economy * 11 + bowlingScore * 0.25) : 28
  };
}

export function fantasyPoints(player: Player, match: Match): number {
  const form = average(player.last_5_scores) * 0.65;
  const batting = player.batting_avg * 0.45 + player.batting_sr * 0.12;
  const bowling = player.bowling_avg > 0 ? (55 - player.bowling_avg) * 0.55 + (7 - player.bowling_economy) * 5 : 0;
  const roleBoost = player.role === "All-rounder" ? 13 : player.role === "Wicketkeeper" ? 7 : player.role === "Bowler" ? 6 : 4;
  const matchTempo = average(match.runs_per_over.team1.slice(-5)) + average(match.runs_per_over.team2.slice(-5));
  return Math.round(clamp(form + batting + bowling + roleBoost + matchTempo * 0.35, 10, 125));
}

export function generateFantasyTeam(players: Player[], match: Match): FantasyPick[] {
  return [...players]
    .map((player) => ({ ...player, predictedPoints: fantasyPoints(player, match) }))
    .sort((a, b) => b.predictedPoints - a.predictedPoints)
    .slice(0, 11);
}

export function buildMilestones(match: Match, players: Player[]) {
  const top = [...players].sort((a, b) => average(b.last_5_scores) - average(a.last_5_scores)).slice(0, 8);
  return top.map((player, index) => {
    const needed = Math.max(6, Math.round(100 - (player.last_5_scores[0] % 100)));
    const labels = [
      `${player.name.split(" ").at(-1)} needs ${needed} runs`,
      `${player.name.split(" ").at(-1)} tracking ${Math.round(player.batting_sr)} SR`,
      `${match.team1} projects ${match.current_score + (match.overs - match.current_overs) * 6}`,
      `${player.role} impact window opens`
    ];
    return labels[index % labels.length];
  });
}

export function currentMomentum(match: Match) {
  return match.momentum_per_over[Math.max(0, match.current_overs - 1)] ?? 50;
}

function standardDeviation(values: number[]) {
  const mean = average(values);
  const variance = average(values.map((value) => (value - mean) ** 2));
  return Math.sqrt(variance);
}
