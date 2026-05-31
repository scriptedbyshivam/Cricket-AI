import type { Match, Player } from "@/lib/types";

export const sampleMatches: Match[] = [
  {
    id: "ind-aus-odi-1",
    title: "IND vs AUS, Mumbai ODI",
    team1: "IND",
    team2: "AUS",
    overs: 50,
    current_score: 186,
    current_wickets: 4,
    current_overs: 31,
    win_probability: [52, 55, 58, 54, 61, 63, 59, 57, 62, 66, 68, 64, 70, 73, 71, 75, 78, 76, 74, 79, 82, 80, 77, 81, 84, 83, 86, 88, 85, 87, 89],
    momentum_per_over: [48, 55, 60, 42, 66, 71, 46, 44, 62, 74, 78, 50, 81, 84, 58, 79, 86, 64, 47, 82, 89, 65, 43, 76, 88, 71, 91, 94, 52, 80, 87],
    runs_per_over: {
      team1: [4, 7, 9, 2, 11, 8, 3, 5, 10, 12, 6, 4, 13, 9, 5, 8, 11, 6, 4, 12, 10, 7, 3, 9, 14, 6, 12, 10, 4, 8, 9],
      team2: [5, 4, 6, 8, 3, 7, 9, 10, 4, 5, 6, 9, 3, 4, 8, 5, 4, 7, 9, 5, 3, 6, 8, 5, 4, 7, 6, 4, 8, 5, 3]
    }
  },
  {
    id: "eng-nz-t20-1",
    title: "ENG vs NZ, London T20",
    team1: "ENG",
    team2: "NZ",
    overs: 20,
    current_score: 142,
    current_wickets: 5,
    current_overs: 16,
    win_probability: [49, 51, 45, 58, 61, 55, 64, 68, 63, 70, 72, 66, 74, 77, 71, 75],
    momentum_per_over: [45, 52, 36, 68, 72, 44, 75, 81, 49, 78, 83, 41, 80, 86, 54, 77],
    runs_per_over: {
      team1: [8, 6, 4, 15, 11, 3, 13, 12, 5, 14, 10, 4, 16, 9, 5, 12],
      team2: [7, 7, 9, 4, 5, 10, 6, 5, 9, 4, 6, 11, 5, 4, 8, 6]
    }
  },
  {
    id: "sa-pak-odi-1",
    title: "SA vs PAK, Cape Town ODI",
    team1: "SA",
    team2: "PAK",
    overs: 50,
    current_score: 223,
    current_wickets: 6,
    current_overs: 42,
    win_probability: [44, 47, 43, 40, 52, 55, 50, 46, 58, 61, 56, 63, 60, 54, 67, 70, 66, 62, 59, 64, 68, 72, 69, 65, 71, 73, 75, 70, 67, 74, 76, 78, 72, 69, 65, 60, 63, 66, 68, 71, 73, 76],
    momentum_per_over: [38, 55, 34, 31, 70, 76, 46, 40, 74, 79, 43, 80, 61, 42, 82, 88, 57, 45, 39, 69, 76, 84, 61, 44, 79, 82, 86, 49, 41, 80, 83, 89, 52, 38, 34, 29, 60, 68, 72, 78, 84, 90],
    runs_per_over: {
      team1: [3, 7, 2, 4, 12, 9, 5, 3, 11, 8, 4, 10, 6, 3, 13, 8, 5, 4, 3, 9, 10, 12, 5, 4, 11, 8, 7, 3, 4, 12, 9, 8, 5, 3, 2, 4, 7, 8, 9, 10, 8, 12],
      team2: [6, 4, 8, 9, 3, 4, 7, 8, 4, 5, 9, 4, 6, 8, 4, 3, 7, 8, 9, 5, 4, 3, 6, 8, 4, 5, 4, 9, 8, 4, 3, 5, 8, 9, 10, 11, 7, 5, 4, 3, 5, 4]
    }
  }
];

export const samplePlayers: Player[] = [
  { id: "p1", name: "Virat Kohli", role: "Batter", batting_avg: 58.7, batting_sr: 93.4, bowling_avg: 0, bowling_economy: 0, last_5_scores: [82, 44, 117, 31, 68] },
  { id: "p2", name: "Rohit Sharma", role: "Batter", batting_avg: 49.2, batting_sr: 91.9, bowling_avg: 0, bowling_economy: 0, last_5_scores: [61, 12, 88, 46, 29] },
  { id: "p3", name: "Shubman Gill", role: "Batter", batting_avg: 46.9, batting_sr: 102.2, bowling_avg: 0, bowling_economy: 0, last_5_scores: [74, 51, 19, 104, 38] },
  { id: "p4", name: "KL Rahul", role: "Wicketkeeper", batting_avg: 50.1, batting_sr: 88.7, bowling_avg: 0, bowling_economy: 0, last_5_scores: [39, 76, 21, 54, 67] },
  { id: "p5", name: "Hardik Pandya", role: "All-rounder", batting_avg: 34.5, batting_sr: 112.1, bowling_avg: 35.1, bowling_economy: 5.7, last_5_scores: [36, 18, 52, 27, 44] },
  { id: "p6", name: "Ravindra Jadeja", role: "All-rounder", batting_avg: 32.8, batting_sr: 87.5, bowling_avg: 36.2, bowling_economy: 4.9, last_5_scores: [28, 41, 12, 39, 33] },
  { id: "p7", name: "Jasprit Bumrah", role: "Bowler", batting_avg: 6.4, batting_sr: 58.3, bowling_avg: 24.3, bowling_economy: 4.6, last_5_scores: [2, 8, 0, 5, 1] },
  { id: "p8", name: "Mohammed Siraj", role: "Bowler", batting_avg: 7.1, batting_sr: 62.2, bowling_avg: 28.5, bowling_economy: 5.1, last_5_scores: [4, 0, 9, 2, 6] },
  { id: "p9", name: "Glenn Maxwell", role: "All-rounder", batting_avg: 35.8, batting_sr: 126.4, bowling_avg: 46.2, bowling_economy: 5.9, last_5_scores: [45, 101, 16, 38, 72] },
  { id: "p10", name: "Steve Smith", role: "Batter", batting_avg: 43.6, batting_sr: 88.4, bowling_avg: 0, bowling_economy: 0, last_5_scores: [54, 37, 66, 11, 49] },
  { id: "p11", name: "David Warner", role: "Batter", batting_avg: 45.3, batting_sr: 95.5, bowling_avg: 0, bowling_economy: 0, last_5_scores: [88, 23, 41, 75, 18] },
  { id: "p12", name: "Mitchell Marsh", role: "All-rounder", batting_avg: 36.4, batting_sr: 101.7, bowling_avg: 38.8, bowling_economy: 5.8, last_5_scores: [62, 35, 8, 57, 44] },
  { id: "p13", name: "Pat Cummins", role: "Bowler", batting_avg: 12.8, batting_sr: 77.4, bowling_avg: 28.2, bowling_economy: 5.3, last_5_scores: [12, 6, 17, 3, 21] },
  { id: "p14", name: "Adam Zampa", role: "Bowler", batting_avg: 8.6, batting_sr: 69.3, bowling_avg: 31.1, bowling_economy: 5.4, last_5_scores: [4, 11, 2, 9, 5] },
  { id: "p15", name: "Jos Buttler", role: "Wicketkeeper", batting_avg: 41.7, batting_sr: 119.6, bowling_avg: 0, bowling_economy: 0, last_5_scores: [73, 18, 92, 35, 61] },
  { id: "p16", name: "Kane Williamson", role: "Batter", batting_avg: 48.3, batting_sr: 82.4, bowling_avg: 0, bowling_economy: 0, last_5_scores: [66, 48, 12, 85, 39] },
  { id: "p17", name: "Shaheen Afridi", role: "Bowler", batting_avg: 10.1, batting_sr: 79.5, bowling_avg: 25.6, bowling_economy: 5.2, last_5_scores: [7, 14, 3, 18, 5] },
  { id: "p18", name: "Babar Azam", role: "Batter", batting_avg: 56.9, batting_sr: 89.3, bowling_avg: 0, bowling_economy: 0, last_5_scores: [91, 43, 74, 27, 58] },
  { id: "p19", name: "Marco Jansen", role: "All-rounder", batting_avg: 24.4, batting_sr: 95.9, bowling_avg: 29.7, bowling_economy: 5.5, last_5_scores: [33, 15, 42, 7, 28] },
  { id: "p20", name: "Heinrich Klaasen", role: "Wicketkeeper", batting_avg: 41.1, batting_sr: 116.8, bowling_avg: 0, bowling_economy: 0, last_5_scores: [78, 24, 55, 103, 46] }
];
