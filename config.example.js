// Copy this file to config.js. The local proxy reads secrets from environment.
window.OPENAI_API_KEY = "";
window.OPENAI_SERVER_PROXY = false;
const localRuntime=location.protocol==='file:'||location.hostname==='localhost'||location.hostname==='127.0.0.1';
const configEndpoint=localRuntime?'http://localhost:8787/config':'/api/config';
window.OPENAI_PROXY_BASE=localRuntime?'http://localhost:8787':'';
window.STORYPULSE_CONFIG_READY = fetch(configEndpoint)
  .then(response => response.ok ? response.json() : {})
  .then(config => { window.OPENAI_SERVER_PROXY = !!(config.openaiEnabled||config.openaiApiKey); return config; })
  .catch(() => ({}));
