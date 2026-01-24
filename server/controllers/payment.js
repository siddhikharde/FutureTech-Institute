
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Course from '../models/Courses.js';


dotenv.config();

const postPayment=async (req, res)=>{
  const {studentId, amount} = req.body;
 try{
   if (!studentId || !amount) {
      return res.json({
        success: false,
        message: "Student ID and amount are required",
      });
    }
    const user = await User.findById(studentId);
    if (!user) {
      return res.json({
        success: false,
        message: "Student not found",
      });
    }
     if (!user.fee) {
      user.fee = { total: 0, paid: 0 };
    }
     user.fee.paid += Number(amount);
     user.paymentHistory.push({
    amount: Number(amount)
  });
    await user.save();
  const remainingFee=user.fee.total-user.fee.paid;

  return res.json({
    success: true,
      message: "Fee updated",
      data: {
        paid: user.fee.paid,
        remaining: remainingFee,
        data: user.paymentHistory
      },
  })
 }catch(e){
  return res.json({
    success:false,
    message:"Error occure while updating Fees",
    error:e.message
  })
 }
}

export {postPayment};