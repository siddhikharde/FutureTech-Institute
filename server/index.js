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
app.post("/students", auth, admin, async (req, res)=>{
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
})

app.post("/payment", auth, admin, async (req, res)=>{
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
    await user.save();
  const remainingFee=user.fee.total-user.fee.paid;

 
  return res.json({
    success: true,
      message: "Fee updated",
      data: {
        paid: user.fee.paid,
        remaining: remainingFee,
      },
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
    const search = req.query.search.trim();;

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

app.post("/courses" ,auth, admin, async (req, res)=>{
  const {title, description, price, duration}=req.body;
  const course = new Course({
    title,
    description,
    price,
    duration
  });
  try{
    const data=await course.save();
    return res.json({
    success:true,
    message:"Course Enrolled successfully..",
    data:data

  })}catch(e){
    return res.json({
      success:false,
      message:"Error occure while enrolling course..",
      error:e.message      
    })
  }
  
})

app.post("/enroll-course",auth, admin, async (req, res)=>{
 try{
   const {studentId, courseId}=req.body;
  if(!studentId || !courseId){
     return res.json({
      success:false,
      message:"Student ID and Course ID required"
     })
  }

  const course=await Course.findById(courseId);
  if(!course){
    return res.json({
       success: false,
        message: "Course not found",
    })
  }
  const student=await User.findByIdAndUpdate(studentId,
    {$addToSet:{enrolledCourses:courseId},
      $inc: { "fee.total": course.price || 0 },
  },
      
   {new: true}
  )
  return res.json({
    success:true,
    message:"Student enrolled successfully",
    data:student,
  })
 }catch(e){
  return res.json({
     success: false,
      message: "Enrollment failed",
      error: e.message,
  })
 }
})
app.get("/courses", auth, admin, async (req, res)=>{
  try{
     const courses=await Course.find().select("title price duration");
     return res.json({
      success:true,
      message:"Courses loaded successfully",
      data:courses
     })
  }catch(e){
      return res.json({ 
      success:false,
      message:"Error occure while feching courses",
      error:e.message
     })
  }
})

app.delete("/courses/:id", auth, admin, async(req, res)=>{
  try{
      const {id}=req.params;

     const assigned=await User.findOne({
        enrolledCourses:id,
      })
      if(assigned){
        return res.json({
          success:false,
           message: "Course is assigned to students. Cannot delete.",
        })
      }

      const course=await Course.findByIdAndDelete(id);
       if(!course){
      return res.json({
        success:false,
        message:"Course not Found",
        data:null
      })

    }
     res.json({
      success: true,
      message: "Course deleted successfully",
    });
  }catch(e){
    res.json({
       success: false,
      message: "Failed to delete course",
      error: error.message,
    })
  }
})


app.get("/dashboard-stats", auth, admin, async (req, res)=>{
  try{
     const students=await User.find({role:"student"}).select("fee").lean();
     let pendingFee=0;
     students.forEach(s=>{
     pendingFee+=(s.fee.total || 0)-(s.fee.paid || 0)
  });

  return res.json({
      success: true,
      data: {
        totalStudents: students.length,
        pendingFee
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
})

app.get("/student/:id", auth, admin, async(req, res)=>{
  const id=req.params.id;
  const student=await User.findById(id).populate("enrolledCourses", "title price");
  if(!student){
    return res.json({
      success:false,
      message:"Student not found"
    })
  }
  res.json({ success: true, data: student });
  
})
app.listen(PORT,()=>{
    console.log(`Srever is running on a Port:${PORT}`);
    connectDb();
})