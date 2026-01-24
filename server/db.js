import mongoose from "mongoose";
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

export default  connectDb;