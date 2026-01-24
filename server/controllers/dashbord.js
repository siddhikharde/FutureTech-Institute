import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Course from '../models/Courses.js'

dotenv.config();

const getStatestic= async (req, res)=>{
  try{
     const students=await User.find({role:"student"}).select("fee").lean();
     let pendingFee=0;
     let totalPaid=0
     students.forEach(s=>{
       totalPaid += s.fee?.paid || 0;
     pendingFee+=(s.fee.total || 0)-(s.fee.paid || 0);
  });

  return res.json({
      success: true,
      data: {
        totalStudents: students.length,
        pendingFee,
        totalPaid
      },          
      message:"Students fetched successfully.."

    })
  }catch(e){
     return res.json({
       success: false,
      message: "Failed to load dashboard stats",
      error: e.message
     })
  }
}

const getStudentGrowthGraph=async (req, res)=>{
  try{
    const startOfYear=new Date(new Date().getFullYear(),0,1);
    const data=await User.aggregate([
      {
        $match:{
          createdAt:{$gte:startOfYear}
        }
      },
      {
        $group:{
          _id:{$month:"$createdAt"},
          students:{$sum:1}
        }
      },
      {
        $sort:{_id:1}
      }
    ]);
    const monthMap = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedData=data.map(item=>(
      {
        month:monthMap[item._id - 1],
        students:item.students
      }
    ));

    return res.json({
      success: true,
      data: formattedData
    });
  }catch(e){
    return res.json({
      success:false,
      message:"Failed to load student growth data",
      error:e.message,

    })
  }
}
export {getStatestic, getStudentGrowthGraph};
