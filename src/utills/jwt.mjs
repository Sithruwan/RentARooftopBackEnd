import  jwt  from "jsonwebtoken";

const getToken =(payload)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
    return token;
}

const getRefreshToken=(payload)=>{
    const token = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
    return token;
}

const decodeToken=(token)=>{
    const payload = jwt.decode(token);
    return payload;
}

const verifyToken=(token)=>{
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
        
    }
   
}
const verifyRefreshToken=(token)=>{
    try {
        const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
        
    }
   
}

export  {getToken,decodeToken,verifyToken,getRefreshToken,verifyRefreshToken};