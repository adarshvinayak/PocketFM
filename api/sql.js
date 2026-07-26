const https=require('https');
module.exports=(req,res)=>{
  if(req.method!=='POST')return res.status(405).json({error:'POST required'});
  if(!process.env.DBX_TOKEN)return res.status(503).json({error:'DBX_TOKEN is not configured'});
  const body=JSON.stringify(req.body||{}),up=https.request({hostname:'dbc-c5147863-b4e1.cloud.databricks.com',path:'/api/2.0/sql/statements',method:'POST',headers:{Authorization:'Bearer '+process.env.DBX_TOKEN,'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}},r=>{res.status(r.statusCode||502);r.pipe(res);});
  up.on('error',e=>res.status(502).json({error:e.message}));up.end(body);
};
