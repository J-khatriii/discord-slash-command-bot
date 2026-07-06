<div align="center">

<h1> Discord Slash Command Bot </h1>

<p>
Discord fires a signed webhook → this app verifies it, acts on it, replies back,
mirrors it to a second channel, and logs every bit of it to a live admin console.
</p>

<div>
  <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=339933" alt="node.js" />
  <img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="express" />
  <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
  <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Discord_API-black?style=for-the-badge&logoColor=white&logo=discord&color=5865F2" alt="discord" />
  <img src="https://img.shields.io/badge/-JWT_Auth-black?style=for-the-badge&logoColor=white&logo=jsonwebtokens&color=000000" alt="jwt" />
</div>

</div>

<br />

## 🤖 What this actually does

An admin connects a Discord server to this app. From then on:

- `/status` → bot replies instantly, confirming it's alive.
- `/report <text>` → bot replies, saves the report, and **mirrors** a
  notification to a second channel (Slack or another Discord channel) —
  without ever blocking or delaying the reply to the user who ran it.
- Every single interaction — who ran it, what happened, whether the mirror
  succeeded or failed — shows up live in a login-protected dashboard.

No bot gateway, no always-on websocket. Discord talks to this app purely
over signed HTTP `POST` requests to one endpoint.


<br />

## 🛡️ Reliability — the part that actually matters

Anyone can make the happy path work. This is what was built to survive the
unhappy ones:

| Scenario | What happens |
|---|---|
| **Forged / unsigned request** | Rejected with `401` before any application logic runs — verified against Discord's Ed25519 public key on every single request. |
| **Discord retries the same interaction** | Deduped by interaction `id`. Same ack is returned, but the mirror notification and any other side effect **do not** fire twice. |
| **Mirror webhook is down or slow** | Fires *after* the Discord reply is already sent, with a timeout + one retry. Failure is recorded per-interaction (`mirror_status = failed`, with the error) — visible in the dashboard, never silently dropped. |
| **Discord's ~3s response window** | Commands respond immediately; anything slower is kept out of the request path. A deferred-ack helper (`editOriginalResponse`) is ready for future slow commands. |
| **Secrets** | Bot token, public key, JWT secret, mirror webhook URLs — env vars only. Never in the repo, never shipped to the client. |

<br />

## ⚙️ Tech stack

- **[Express](https://expressjs.com/)** — the `/interactions` endpoint, dashboard API, and JWT auth.
- **[discord-interactions](https://github.com/discord/discord-interactions-js)** — Ed25519 request verification and interaction type constants.
- **[PostgreSQL](https://www.postgresql.org/)** (via [Neon](https://neon.tech) / [Supabase](https://supabase.com) free tier) — interaction log, admin accounts.
- **[React](https://react.dev/) + [Vite](https://vite.dev/)** — the dashboard SPA.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — the console/ops-styled UI.
- **JWT + bcrypt** — dashboard authentication.

<br />

## 🤸 Quick start

**Prerequisites:** Node.js 18+, a Postgres database, a Discord application/bot ([free, Developer Portal](https://discord.com/developers/applications)), a Slack or Discord webhook for the mirror.

```bash
git clone <this-repo>
cd discord-slash-command-bot
```

### Backend

```bash
cd backend
npm install
cp .env.example .env        # fill in the values — see table below
node src/database/runSchema.js
node src/scripts/createAdmin.js <username> <password>   # your dashboard login
npm run dev                  # → http://localhost:3000
node src/scripts/registerCommands.js   # registers /status and /report with Discord
```

> Discord can't call `localhost`. For local testing, tunnel it first
> (`ngrok http 3000`) and use that HTTPS URL as your Interactions Endpoint.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:3000
npm run dev                  # → http://localhost:5173
```

<br />

## 🔐 Environment variables

<details>
<summary><b>backend/.env</b></summary>

| Variable | Description |
|---|---|
| `PORT` | API port (default `3000`) |
| `DISCORD_BOT_TOKEN` | From the Developer Portal → Bot |
| `DISCORD_APPLICATION_ID` | Developer Portal → General Information |
| `DISCORD_PUBLIC_KEY` | Used to verify every request's Ed25519 signature |
| `DISCORD_GUILD_ID` | Your test server's ID (for instant guild-scoped command registration) |
| `DATABASE_URL` | Postgres connection string |
| `JWT_SECRET` | Random secret for signing dashboard sessions — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `SLACK_WEBHOOK_URL` | Mirror destination — Slack (pick this **or** the one below) |
| `DISCORD_MIRROR_WEBHOOK_URL` | Mirror destination — a second Discord channel |
| `FRONTEND_URL` | Deployed frontend origin, for CORS |

</details>

<details>
<summary><b>frontend/.env</b></summary>

| Variable | Description |
|---|---|
| `VITE_API_URL` | URL of the deployed backend |

</details>

No secrets are committed anywhere — only `.env.example` templates.

<br />

## 📡 Setting up the mirror channel

`/report` mirrors to a second channel; `/status` intentionally doesn't
(nothing meaningful to forward). Pick **one**:

<details>
<summary><b>Option A — Discord webhook (fastest)</b></summary>

1. Pick a second channel → **Edit Channel → Integrations → Webhooks → New Webhook**
2. **Copy Webhook URL**
3. `DISCORD_MIRROR_WEBHOOK_URL=<paste it>`

</details>

<details>
<summary><b>Option B — Slack webhook</b></summary>

1. [api.slack.com/apps](https://api.slack.com/apps) → **Create New App → From scratch**
2. **Incoming Webhooks → Activate → Add New Webhook to Workspace**
3. `SLACK_WEBHOOK_URL=<paste it>`

</details>

<br />

## 🚀 Deployment

Runs entirely on free tiers — no card required, anywhere.

| Layer | Where | Notes |
|---|---|---|
| Database | [Neon](https://neon.tech) free Postgres | Copy the pooled connection string into `DATABASE_URL` |
| Backend | [Render](https://render.com) free Web Service | Root: `backend` · Build: `npm install` · Start: `npm start` |
| Frontend | [Vercel](https://vercel.com) | Root: `frontend` · Build: `npm run build` · Output: `dist` |
| Mirror | Discord webhook | See above |

After the backend is live: Developer Portal → your app → **General
Information → Interactions Endpoint URL** → `https://<your-backend>/interactions`.
Discord immediately sends a `PING` to verify it — the app answers it directly.

<br />

## 📁 Project structure

```
backend/
  src/
    commands/           → slash command definitions registered with Discord
    config/
      discord.js         → env-derived Discord credentials
      commandConfig.js    → in-memory enable/disable toggle per command
    constants/           → Discord interaction type/response type enums
    controllers/
      authController.js       → login
      dashboardController.js  → interaction log, stats, command config endpoints
      interactionController.js→ thin wrapper delegating to the handler
    handlers/            → per-command logic (status, report)
    middleware/          → Ed25519 signature verification, JWT auth
    repositories/        → raw DB queries (interactions, admins)
    services/            → dedup logic, mirror delivery, Discord API calls
    database/
      schema.sql          → table definitions
      runSchema.js         → applies schema.sql
      testConnection.js    → quick DB connectivity check
    routes/               → auth, dashboard, interactions
    scripts/              → createAdmin.js, registerCommands.js
frontend/
  src/
    pages/                → Login, Dashboard
    components/
      CommandSettings.jsx  → dashboard toggle for enabling/disabling commands
      DashboardHeader.jsx, InteractionTable.jsx, StatsCard.jsx,
      SearchBar.jsx, Pagination.jsx, StatusBadge.jsx
    services/              → API client + auth/config/interaction/stats calls
```

<br />

## 🔑 Try it right now

- **Live app:** https://discord-slash-command-bot-six.vercel.app
- **Backend Live URL:** https://discord-slash-command-bot-bi24.onrender.com
- **Test Discord server invite:** https://discord.gg/XGBBMKbzE
- **Dashboard login (throwaway account, created solely for review):**
  - Username: `admin`
  - Password: `adminpassword123`

Try `/status` and `/report <text>` in the test server, then check the
dashboard to see the interaction logged along with its mirror delivery
status.

<br />

## ⚠️ Known limitations

- Command behavior lives in code, not configurable from the dashboard UI yet.
- Slash commands only — no buttons/modals.
- No AI triage step on `/report`.
- Single-server only, no per-guild isolated config.

See [`AI_NOTES.md`](./AI_NOTES.md) for how this was built and debugged with AI.