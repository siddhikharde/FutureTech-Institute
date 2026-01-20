import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import bcrypt from 'bcrypt'
import User from './models/User.js';
import JWT_EXPIRATION from './config.js';
import Course from './models/Courses.js';
import jwt from 'jsonwebtoken'
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 5000;
const connectDb=async ()=>{
    try{
      const con=await mongoose.connect(process.env.MONGO_URI);
      if(con){
        console.log("Database Connected Successfully..");
      }
    }catch(e){
      console.log("Error in connecting to database ", e);
    }
}

app.get("/",(req, res)=>{
  res.json({
    success:true,
    message:"Welcome to the FutureTech",
  })
})

app.get("/health",(req, res)=>{
  res.json({
    success:true,
    message:"Server is Healthy"
  })
})

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
  req.existingUser=jwt.verify(token,process.env.JWT_SECRET);
  next();
}
app.post("/students", auth, admin, async (req, res)=>{
  const {name, email, password, totalFee} = req.body;

   if(!name){
        return res.json({
            success:false,
            message:"Name is required"
        })
       }
       if(!email || !email.includes('@')){
        return res.json({
            success:false,
            message:"Email is required"
        })
       }
       if(!password){
        return res.json({
            success:false,
            message:"password is required"
        })
       }

 const exists=await User.findOne({email});
  if(exists){
    return res.json({
      success:false,
      message:"Student already exists"
    })
  }
   const salt = bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(password,salt)
  const student=new User({
    name,
    email,
    password:hashedPassword,
    role:"student",
    fee:{total:totalFee}
  })
  try{
    const savedUser=await student.save()
    return  res.json({
    success:true,
    data:savedUser,
    message :"studenst info added successfully"
  })
  }catch(e){
    return res.json({
      success:flase,
      message:`Error occure `,
      error:e.message
    })
  }
})

app.post("/payment", auth, admin, async (req, res)=>{
  const {email, amount} = req.body;
 try{
  const totalFee= await User.findOneAndUpdate({email},
    {$inc:{"fee.paid":amount}}
  )
  const user= await User.findOne({email});
  const remainingFee=user.fee.total-user.fee.paid;

 
  return res.json({
    success:true,
    message:"Fee updated",
    data:remainingFee
  })
 }catch(e){
  return res.json({
    success:false,
    message:"Error occure while updating Fees",
    error:e.message
  })
 }
})

app.get("/students", auth, admin, async(req, res)=>{
  try{
    const students=await User.find({role:"student"}).select("name email fee");
    return res.json({
      success:true,
      message:"Students data fetched Successfully",
      data:students
    })
  }catch(e){
    return res.json({
      success:false,
      message:"Error occure while fetching students data",
      error:e.message
    })
  }

})

app.post("/login", async (req, res)=>{
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
})


app.listen(PORT,()=>{
    console.log(`Srever is running on a Port:${PORT}`);
    connectDb();
})