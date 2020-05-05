const jwt=require('jsonwebtoken')

module.exports=function (req,res,next){
    const token=req.header('authToken');
    if(!token) return res.status(402).send('Access denide')

    try{
        const vToken=jwt.verify(token,process.env.TOKEN_PASS)
        console.log(vToken)
        res.userID=vToken;
        console.log(res.userID)
        next();
    }catch(err){
        res.status(400).sent("Invalid token");
    }
}
