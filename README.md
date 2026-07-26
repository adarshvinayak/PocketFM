# StoryPulse

Interactive audio drama with two connected surfaces: the episode player in `storypulse.html` and the investigation world in `pocket-portal.html`.

## Run locally

Set the required secrets in your user environment, then start the local proxy:

```powershell
$env:OPENAI_API_KEY="..."
$env:DBX_TOKEN="..."
node proxy.js
```

Open `storypulse.html` or `pocket-portal.html`. The client uses the proxy on port 8787; credentials remain server-side.

## Deploy to Vercel

Set these Vercel environment variables for Production, Preview, and Development:

- `OPENAI_API_KEY`
- `DBX_TOKEN`

Vercel API routes in `api/` proxy OpenAI and Databricks calls, while `vercel.json` serves `storypulse.html` from `/`.

Never commit `config.js`; use `config.example.js` as the safe template.
