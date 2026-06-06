create table if not exists public.matches (
  id text primary key,
  title text not null,
  team1 text not null,
  team2 text not null,
  overs integer not null,
  current_score integer not null,
  current_wickets integer not null,
  current_overs integer not null,
  win_probability jsonb not null default '[]'::jsonb,
  momentum_per_over jsonb not null default '[]'::jsonb,
  runs_per_over jsonb not null default '{"team1":[],"team2":[]}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.players (
  id text primary key,
  name text not null,
  role text not null check (role in ('Batter', 'Bowler', 'All-rounder', 'Wicketkeeper')),
  batting_avg numeric not null default 0,
  batting_sr numeric not null default 0,
  bowling_avg numeric not null default 0,
  bowling_economy numeric not null default 0,
  last_5_scores jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.fantasy_teams (
  id uuid primary key default gen_random_uuid(),
  match_id text not null references public.matches(id) on delete cascade,
  player_ids text[] not null,
  user_session text not null,
  created_at timestamptz not null default now()
);

alter table public.matches enable row level security;
alter table public.players enable row level security;
alter table public.fantasy_teams enable row level security;

drop policy if exists "matches are readable" on public.matches;
create policy "matches are readable" on public.matches for select using (true);

drop policy if exists "players are readable" on public.players;
create policy "players are readable" on public.players for select using (true);

drop policy if exists "fantasy teams can be inserted" on public.fantasy_teams;
create policy "fantasy teams can be inserted" on public.fantasy_teams for insert with check (true);
