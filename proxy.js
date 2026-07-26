/* Run with: DBX_TOKEN=dapi... node proxy.js */
/* A tiny same-machine CORS bridge for the Writer Studio. No dependencies. */
const http = require('http');
const https = require('https');

const target = 'https://dbc-c5147863-b4e1.cloud.databricks.com/api/2.0/sql/statements';
const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'GET, POST, OPTIONS'};

function reply(res, status, body){ res.writeHead(status,{...cors,'Content-Type':'application/json'}); res.end(body); }
function forwardOpenAI(req,res,body){
  if(!process.env.OPENAI_API_KEY)return reply(res,503,JSON.stringify({error:'OPENAI_API_KEY is not configured'}));
  const path=new URL(req.url,'http://localhost').searchParams.get('path')||'/v1/chat/completions';
  const upstream=https.request({hostname:'api.openai.com',path,method:'POST',headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}},up=>{res.writeHead(up.statusCode||502,{...cors,...up.headers});up.pipe(res);});
  upstream.on('error',error=>reply(res,502,JSON.stringify({error:error.message})));up.end(body);
}
http.createServer((req,res)=>{
  if(req.method === 'OPTIONS') return reply(res,204,'');
  if(req.method === 'GET' && req.url === '/health') return reply(res,200,JSON.stringify({ok:true,databricksConfigured:!!process.env.DBX_TOKEN,openaiConfigured:!!process.env.OPENAI_API_KEY}));
  // Local development only: the existing browser-side TTS calls need a runtime key.
  // GitHub Secrets are injected only into a server/Action environment, never GitHub Pages.
  if(req.method === 'GET' && req.url === '/config') return reply(res,200,JSON.stringify({openaiEnabled:!!process.env.OPENAI_API_KEY}));
  if(req.method === 'POST' && req.url.startsWith('/api/openai')){let body='';req.on('data',chunk=>body+=chunk);req.on('end',()=>forwardOpenAI(req,res,body));return;}
  if(req.method !== 'POST' || req.url !== '/sql') return reply(res,404,JSON.stringify({error:'Not found'}));
  let body=''; req.on('data',chunk=>body+=chunk); req.on('end',()=>{
    if(!process.env.DBX_TOKEN) return reply(res,503,JSON.stringify({error:'DBX_TOKEN is not configured'}));
    const upstream=https.request(target,{method:'POST',headers:{'Authorization':'Bearer '+process.env.DBX_TOKEN,'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}},up=>{
      let response=''; up.on('data',chunk=>response+=chunk); up.on('end',()=>reply(res,up.statusCode||502,response));
    });
    upstream.on('error',error=>reply(res,502,JSON.stringify({error:error.message}))); upstream.write(body); upstream.end();
  });
}).listen(8787,()=>console.log('Writer Studio Databricks proxy on http://localhost:8787/sql'));
