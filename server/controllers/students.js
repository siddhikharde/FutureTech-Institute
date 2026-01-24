
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Course from '../models/Courses.js';


dotenv.config();

const postStudent=async (req, res)=>{
  const { name,
      email,
      password,
      phone,
      parent,
      enrolledCourses = [],
      paidFee = 0} = req.body;

      const courses = await Course.find({ _id: { $in: enrolledCourses } });
       const totalFee = courses.reduce((sum, c) => sum + (c.price || 0), 0);
        const remainingFee = totalFee - paidFee;
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
       if(!phone){
        return res.json({
          success:false,
          message:"Mobile Number required"
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
   const student = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "student",

      parent: {
        name: parent.name,
        phone: parent.phone,
      },

      enrolledCourses,

      fee: {
        total: totalFee,
        paid: paidFee,
        remaining: remainingFee
      }
    });
  try{
    const savedUser=await student.save()
    return  res.json({
    success:true,
    data:savedUser,
    message :"studenst info added successfully"
  })
  }catch(e){
    return res.json({
      success:false,
      message:`Error occure `,
      error:e.message
    })
  }
}

const getStudent= async(req, res)=>{
  try{
    const search = (req.query.search || "").trim();;

const searchFilter = search
  ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        
      ]
    }
  : {};

     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [students, total] = await Promise.all([
      User.find({ role: "student", ...searchFilter })
        .select("name email fee enrolledCourses")
        .populate("enrolledCourses", "title price")
        .skip(skip)
        .limit(limit)
        .lean(),

      User.countDocuments({ role: "student", ...searchFilter })
      
    ]);
   return res.json({
      success: true,
      data: students,
      pagination: {
        totalStudents: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      }
    });
  }catch(e){
    return res.json({
      success:false,
      message:"Error occure while fetching students data",
      error:e.message
    })
  }

}

const getSingleStudent=async(req, res)=>{
  const id=req.params.id;
  const student=await User.findById(id).populate("enrolledCourses", "title price");
  if(!student){
    return res.json({
      success:false,
      message:"Student not found"
    })
  }
  res.json({ success: true, data: student });
  
}

const putStudent=async (req, res)=>{
  const id=req.params.id;
  try{
    const {name, email, password , parent, phone}=req.body;
    const updateData = { name, email, parent, phone };
    if (password) {
  updateData.password = bcrypt.hashSync(password, 10);
}
  const student = await User.findByIdAndUpdate(id, updateData, { new: true });
res.json({
      success: true,
      message: "Student updated",
      data: student
    });
  }catch(e){
    res.json({
      success:false,
      message:"Update failed",
      error:e.message
    })
  }
}


const getStudentDashboard=async(req, res)=>{
  try{
  
    const student=await User.findById(req.existingUser.id).populate("enrolledCourses", "title price duration");
    res.json({
      success:true,
      data:student,
    })
  }catch(e){
    res.json({
      success:false,
      message:"Failed",
      error:e.message
    })
  }

}
export {postStudent, getStudent, getSingleStudent, putStudent, getStudentDashboard};