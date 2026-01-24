import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import JWT_EXPIRATION from '../config.js';
import jwt from 'jsonwebtoken'

dotenv.config();

const postLogin=async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
      return res.json({
        success:false,
        message:"Email and Password are required"
      })
    }

    const existingUser=await User.findOne({email});
    if(!existingUser){
      return res.json({
        success:false,
        message:"User does not exist from this email."
      })
    }

    const isPassCorrect=bcrypt.compareSync(password, existingUser.password);
    existingUser.password=undefined;
    if(isPassCorrect){
      const jwtToken=jwt.sign({
        id:existingUser.id,
        role: existingUser.role,
        email:existingUser.email,
      },process.env.JWT_SECRET,
    {
      expiresIn:JWT_EXPIRATION
    })

    return res.json({
      success:true,
      message:"Login Successful",
      data:existingUser,
      jwt:jwtToken
    })
    }else{
      return res.json({
      success:false,
      message:"Invalid email or password"
      })
     
    }
}

export {postLogin};