import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import User from './models/User.js';
import Course from './models/Courses.js';
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
app.listen(PORT,()=>{
    console.log(`Srever is running on a Port:${PORT}`);
    connectDb();
})