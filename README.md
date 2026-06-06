# CricketIQ

CricketIQ is a Next.js 14 cricket analytics app with live match dashboards, player comparison, and fantasy team picking.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS 4
- Shadcn-style Radix UI primitives
- Framer Motion
- Recharts
- Supabase
- OpenAI `gpt-4o-mini`

## AI Usage

LLM calls are intentionally limited to two tiny tasks:

- `/api/llm/summary`: 5-8 words, called once per over change.
- `/api/llm/fantasy-justify`: one sentence, called only when the user clicks `Why?`.

Both routes use an in-memory 5-minute cache. Win probability, momentum, fantasy points, and radar values are pure JavaScript functions.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
```

3. Run the SQL migration in Supabase:

```sql
-- supabase/migrations/001_initial_schema.sql
```

4. Seed sample data:

```bash
npm run seed
```

5. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` Dashboard
- `/compare` Player comparison
- `/fantasy` Fantasy team picker
- `/ingest` Hidden direct-access ingest form

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

If Supabase is not configured, the UI reads from bundled realistic sample data and fantasy saves fall back to `localStorage`.
