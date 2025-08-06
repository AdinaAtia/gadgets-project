const jwt=require("jsonwebtoken")
//MIDDLEWARE הוא מין מסננת של איזה דברים יכולים להכנס לשרת
const verifyJWT=(req,res,next)=>{
const authHeader=req.headers.Authorization||req.headers.authorization
console.log(authHeader);
if(!authHeader?.startsWith("Bearer ")){
    
    return res.status(401).json({message:"Unauhorized"})
}
const token=authHeader.split(" ")[1]
jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err,decode)=>{
     if(err)  return res.status(401).json({message:"Forbidden"})
     req.user=decode
    next()//אם אין NEXT המשתמש לא יכול להמשיך הלאה

    }
)
}
module.exports=verifyJWT