export type JsonRecord = Record<string, unknown>;

export type Match = {
  id: string;
  title: string;
  team1: string;
  team2: string;
  overs: number;
  current_score: number;
  current_wickets: number;
  current_overs: number;
  win_probability: number[];
  momentum_per_over: number[];
  runs_per_over: {
    team1: number[];
    team2: number[];
  };
};

export type Player = {
  id: string;
  name: string;
  role: "Batter" | "Bowler" | "All-rounder" | "Wicketkeeper";
  batting_avg: number;
  batting_sr: number;
  bowling_avg: number;
  bowling_economy: number;
  last_5_scores: number[];
};

export type FantasyPick = Player & {
  predictedPoints: number;
};
