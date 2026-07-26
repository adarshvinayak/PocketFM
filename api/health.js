module.exports=(req,res)=>res.status(200).json({ok:true,databricksConfigured:!!process.env.DBX_TOKEN,openaiConfigured:!!process.env.OPENAI_API_KEY});
