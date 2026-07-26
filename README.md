# StoryPulse — Interactive Audio Drama

StoryPulse is a cinematic, browser-based audio-drama experience. It pairs an immersive episode player with a companion investigation portal, so listeners can follow the story, explore characters and clues, and step into the world between episodes.

## **[▶ OPEN THE LIVE STORYPULSE APP](https://pocketfm-six.vercel.app/)**

## What’s inside

- **Episode player** — cinematic scenes, narration, character moments, and episode progression in [`storypulse.html`](./storypulse.html).
- **Investigation Portal** — story world, clues, characters, and community-facing exploration in [`pocket-portal.html`](./pocket-portal.html).
- **Writer Studio** — a creator dashboard with world-generation support and live Databricks health status.
- **AI-powered story tools** — OpenAI requests flow through server-side proxies, keeping browser clients free of API keys.
- **Databricks integration** — secure SQL proxy for Writer Studio data and health checks.

## Project structure

```text
storypulse.html       Main interactive episode player
pocket-portal.html    Companion portal and Writer Studio
world_data.js         Story world and writer-dashboard demo data
proxy.js              Local secure API proxy (port 8787)
api/                  Vercel serverless API routes
config.example.js     Safe client runtime configuration template
vercel.json           Vercel routing configuration
```

## Run locally

1. Create a local `config.js` from `config.example.js` if you need to adjust client runtime behavior.
2. Set your secrets in the current terminal or as user environment variables:

```powershell
$env:OPENAI_API_KEY="your_openai_key"
$env:DBX_TOKEN="your_databricks_token"
```

3. Start the local secure proxy:

```powershell
node proxy.js
```

4. Open [`storypulse.html`](./storypulse.html) in a browser. The portal is available directly at [`pocket-portal.html`](./pocket-portal.html).

The local proxy runs on `http://localhost:8787` and handles OpenAI and Databricks calls without exposing credentials to the browser.

## Deploy to Vercel

Set these encrypted environment variables in Vercel for **Production**, **Preview**, and **Development**:

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Enables server-side OpenAI story generation |
| `DBX_TOKEN` | Enables server-side Databricks SQL access |

Then deploy from the project directory:

```powershell
vercel --prod
```

Vercel serves the episode player from `/`; the routes in [`api/`](./api) securely proxy OpenAI and Databricks requests.

## Security

- API keys are never sent to the browser.
- `config.js`, `.vercel/`, and local chat material are intentionally excluded from Git.
- Use [`config.example.js`](./config.example.js) as the safe configuration template.

## Tech

HTML, CSS, JavaScript, React (via browser build), OpenAI API, Databricks SQL, and Vercel Serverless Functions.
