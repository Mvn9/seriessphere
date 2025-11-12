Great — here’s a **ready-to-paste, recruiter-friendly `README.md`** for **SeriesSphere**. It’s fully customized: removes template wording, highlights what *you* built, shows the live demo, lists concrete features, explains the AI recommendation piece, and includes clear run instructions and files to add (`env.example`, screenshots). Paste this directly into your repo’s `README.md` and follow the small TODOs I left (like dropping screenshots into `screenshots/`).

---

````markdown
# SeriesSphere

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://seriessphere.vercel.app)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)]

**SeriesSphere** — a community-driven web app to track TV shows & anime, get personalized recommendations, and join clubs.

---

## 🔎 Elevator pitch — what I built
SeriesSphere is a full-stack Next.js + TypeScript application for managing watchlists, logging episode progress, discovering new shows via an explainable AI recommendation flow (Genkit / Google AI), and participating in community clubs. The app focuses on clear UX, spoiler protection, and recommendations that include short explainability notes so users know *why* a show was suggested.

**Live demo:** https://seriessphere.vercel.app

---

## 🚀 Key features
- Watchlist management (add/remove shows, mark episodes watched)  
- Episode logging & progress tracking  
- AI-powered recommendations with explainability (shows reason + score)  
- Clubs: create & join discussions, post updates, and interact with members  
- Spoiler protection toggle for sensitive content  
- Admin moderation tools (content management)  
- Responsive UI and Vercel deployment

---

## 🛠 Tech stack
- **Frontend:** Next.js (App Router), React, TypeScript  
- **Styling:** Tailwind CSS  
- **AI:** Genkit / Google AI flows (recommendation & reranking)  
- **Hosting:** Vercel  
- **Dev tools:** npm, ESLint, Prettier

---

## ✅ What I personally implemented
- Designed and implemented the watchlist data model and episode progress tracking.  
- Built the Genkit AI recommendation flows and integrated them into the UI with an explainability panel.  
- Implemented spoiler protection logic and user-facing toggles.  
- Deployed the app to Vercel and wired environment variables for AI usage.

> See `docs/ai.md` for a short technical breakdown of the recommendation flow (inputs, logic, sample outputs).

---

## 📸 Screenshots

- `screenshots/watchlist.png` — Watchlist & progress view  
- `screenshots/recommendation.png` — Recommendation panel with explainability

```markdown
![Home](screenshots/home.png)
![Watchlist](screenshots/watchlist.png)
![Recommendation](screenshots/recommendation.png)
````

---

## 💻 Quick start (local development)

1. Clone the repo

```bash
git clone https://github.com/Mvn9/seriessphere.git
cd seriessphere
```

2. Install dependencies

```bash
npm install
```

3. Copy env example and fill required keys

```bash
cp env.example .env.local
# Edit .env.local and add real values (see env.example for required variables)
```

4. (If using Genkit locally) Start Genkit (if applicable):

```bash
npm run genkit:watch
```

5. Run the dev server

```bash
npm run dev
# or
npm run start
```

6. Open the app at `http://localhost:9002` (or the port printed in console).

---

## 🔑 env.example (add to repo as `env.example`)

```env
# SeriesSphere env.example
NEXT_PUBLIC_VERCEL_URL=https://seriessphere.vercel.app
GOOGLE_API_KEY=your_google_api_key_here
GENKIT_API_KEY=your_genkit_api_key_here
NEXTAUTH_URL=http://localhost:9002
# Add other keys your app expects, prefixed with NEXT_PUBLIC_ if used in client
```

> Please **never** commit actual API keys. Keep keys in `.env.local` and add `.env.local` to `.gitignore`.

---

## 📂 Project structure (high-level)

```
/src
  /app             # Next.js pages & App Router
  /components      # Reusable UI components
  /lib             # helper utilities and API clients
  /ai/flows        # Genkit/AI flows & configs
  /public          # static assets
  /styles          # global styles & tailwind config
```

---

## 🧠 Recommendation flow (short summary)

* Input: user watch history + selected show metadata (genres, tags, popularity).
* Flow: Genkit receives a prompt combining user history and candidate metadata → returns ranked suggestions.
* Post-processing: rerank by popularity and apply filters (e.g., language, age rating).
* Explainability: for each recommendation we compute a short reason string (e.g., `"Recommended because you watched X (genre similarity 0.81) and liked Y (shared tags)"`) and a score.

> For full details + example payloads, see `docs/ai.md`.

---

## 🧪 Tests & CI

* Add a basic GitHub Actions workflow to run `npm ci`, `npm run build`, and `npm run lint` on pushes to `main`.
* Add at least one unit test for the recommendation utility or a key component (Jest + React Testing Library).

---

## 🤝 Contributing

Contributions are welcome. Please:

1. Open an issue to discuss the change.
2. Fork the repo and create a branch for your feature/fix.
3. Run lint/tests before opening a PR.

Short checklist for PRs:

* [ ] Code builds and tests pass
* [ ] Follows existing code style (Prettier / ESLint)
* [ ] Add/modify README or docs if adding a feature

---

## 📜 License

This project is available under the **MIT License**. See `LICENSE` for details.

---

## 🧭 Future work / roadmap

* Add user feedback loop so recommendations improve over time.
* Add analytics dashboard for admin (track popular shows, club activity).
* Add automated tests and deploy-ready CI.
* Add OAuth sign-in and demo test account for instant demo access.

---

## 🔗 Links

* Live demo: [https://seriessphere.vercel.app](https://seriessphere.vercel.app)
* Repo: [https://github.com/Mvn9/seriessphere](https://github.com/Mvn9/seriessphere)

```

---


