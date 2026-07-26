const https=require('https');
function json(res,status,body){res.status(status).json(body);}
module.exports=(req,res)=>{
  if(req.method!=='POST')return json(res,405,{error:'POST required'});
  if(!process.env.OPENAI_API_KEY)return json(res,503,{error:'OPENAI_API_KEY is not configured'});
  const path=req.query.path||'/v1/chat/completions',payload=JSON.stringify(req.body||{});
  const upstream=https.request({hostname:'api.openai.com',path,method:'POST',headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json','Content-Length':Buffer.byteLength(payload)}},r=>{res.status(r.statusCode||502);Object.entries(r.headers).forEach(([k,v])=>v&&res.setHeader(k,v));r.pipe(res);});
  upstream.on('error',e=>json(res,502,{error:e.message}));upstream.end(payload);
};
