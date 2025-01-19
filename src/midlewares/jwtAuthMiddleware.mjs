import { verifyToken } from "../utills/jwt.mjs";

const jwtAuthverifyMiddleware = async(req,res,next)=>{
    const auth = req.headers.authorization;
    if(auth !== undefined && auth !==""){
        if(auth.split(" ")[0] !== "Bearer"){
            return res.status(400).json({
               msg:"Invalid token type",
               data:null
            });
        }
       const token = auth.split(" ")[1];
       const decoded = await verifyToken(token);
       console.log(decoded);
       
       if(decoded !== null){
         req.user = decoded;
         next();
         return;
       }
    }
    return res.status(401).json({
       msg:"Invalid token",
       data:null
    });
 }

 export  {jwtAuthverifyMiddleware};