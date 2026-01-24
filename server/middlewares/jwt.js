import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const admin=(req, res, next)=>{
  if(req.existingUser.role !== "admin"){
    return res.json({
      success:false,
      message:"Admin access only!"
    })
  }
  next();
}

const auth=(req, res, next)=>{
  const token= req.headers.authorization?.split(" ")[1];
  if(!token){
    return res.json({
      success:false,
      message:"Invalid or missing JWT Token"
    })
  }
try {
  req.existingUser = jwt.verify(token, process.env.JWT_SECRET);
  next();
} catch {
  return res.status(401).json({
    success:false,
    message:"Invalid or expired token"
  });
}
}

export {auth, admin};

