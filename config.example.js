// Copy this file to config.js. The local proxy reads secrets from environment.
window.OPENAI_API_KEY = "";
window.STORYPULSE_CONFIG_READY = fetch('http://localhost:8787/config')
  .then(response => response.ok ? response.json() : {})
  .then(config => { window.OPENAI_API_KEY = config.openaiApiKey || ""; return config; })
  .catch(() => ({}));
