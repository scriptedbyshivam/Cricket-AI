# 🏏 CricketIQ

<div align="center">

### AI-Powered Cricket Intelligence Platform  
Real-time match analytics • Fantasy optimization • Player insights • Predictive intelligence  

Built with **Next.js 14 + Supabase + OpenAI**

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8)

</div>

---

## 🚀 Overview

**CricketIQ** is a modern cricket intelligence platform that converts live cricket data into **actionable insights** for fans, analysts, and fantasy players.

It focuses on:
- ⚡ Real-time match intelligence  
- 📊 Predictive analytics  
- 🧠 Deterministic + explainable logic  
- 🎯 Fantasy team optimization  

Unlike traditional dashboards, CricketIQ doesn’t just show data — it explains what it means and what will happen next.

---

## ✨ Features

### 📡 Live Match Dashboard
- Real-time score updates
- Win probability tracking
- Momentum shift detection
- Over-by-over insights
- Match progression analytics

---

### 🏆 Player Intelligence System
- Advanced player performance profiles
- Form tracking (last 5/10 matches)
- Venue-wise performance analysis
- Opposition-based insights
- Clutch performance rating

---

### ⚔️ Player Comparison Engine
- Side-by-side player metrics
- Radar chart visualizations
- Batting & bowling breakdown
- Phase-wise performance (PP / Middle / Death)
- AI-powered comparison explanation

---

### 🎯 Fantasy Team Builder
- Smart XI recommendations
- Budget-aware optimization
- Role-balanced team selection
- Expected fantasy points projection
- Captain & Vice-Captain optimization
- Differential pick suggestions

---

### 📊 Predictive Analytics Engine
- Match outcome probability
- Target score projection
- Required run rate pressure analysis
- Win probability curve
- Upset probability detection

---

### 🤖 Lightweight AI Integration
AI is used only for explanations, not core calculations:

| Feature | Purpose |
|--------|--------|
| Match Summary | Short contextual updates |
| Fantasy Insight | One-line reasoning |
| Player Explanation | Why a pick works |
| Momentum Updates | Human-readable insights |

---

## 🧠 Architecture Philosophy

> **Deterministic First. AI Second.**

CricketIQ separates logic into two layers:

### 🧮 Core Engine (No AI)
- Win probability
- Fantasy scoring
- Player ratings
- Match simulation
- Momentum calculations

### 🤖 AI Layer (Enhancement Only)
- Summaries
- Explanations
- Insights

This ensures:
- ✅ Fast performance  
- ✅ Predictable outputs  
- ✅ Lower AI cost  
- ✅ Transparent analytics  

---

## 🏗️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Recharts
- Radix UI

### Backend
- Supabase (PostgreSQL + Realtime)
- Next.js API Routes

### AI
- OpenAI GPT-4o Mini

---

## 📂 Project Structure
```
app/
├── page.tsx
├── live/
├── compare/
├── fantasy/
├── players/
├── simulator/
└── api/
├── match/
├── fantasy/
├── players/
└── llm/

components/
├── charts/
├── match/
├── fantasy/
├── player/
└── ui/

lib/
├── engine/
├── analytics/
├── supabase/
└── utils/
```

---

## 🔧 Installation

### 1. Clone Repository
```bash
git clone <repo-url>
cd cricketiq
```

### 2. Install Dependencies
```
npm install
```
### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```
### 4. Run Database Migration
```
-- supabase/migrations/001_initial_schema.sql
```

5. Seed Demo Data
```
npm run seed
```
6. Start Development Server

```npm run dev```

----
## 🌐 Open Application
```
http://localhost:3000
```

---
## 🛣️ Routes
| Route        | Description              |
| ------------ | ------------------------ |
| `/`          | Live Dashboard           |
| `/live`      | Live Match Tracking      |
| `/compare`   | Player Comparison        |
| `/fantasy`   | Fantasy Team Builder     |
| `/players`   | Player Intelligence Hub  |
| `/simulator` | Match Scenario Simulator |

---

## 🛡️ Fallback System
If backend services are unavailable:

- Demo data loads automatically
- Fantasy teams stored in localStorage
- Core analytics remain functional
- UI works without API dependency

---
## 👨‍💻 Use Cases
- Fantasy cricket optimization
- Live match analytics
- Sports intelligence dashboards
- AI-powered SaaS products
- Hackathon & startup demos

---
## ❤️ Built With

Next.js • Supabase • OpenAI • Tailwind CSS
---
