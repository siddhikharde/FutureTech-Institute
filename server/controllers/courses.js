import dotenv from 'dotenv'
import User from '../models/User.js';
import Course from '../models/Courses.js';

dotenv.config();

const postCourse=async (req, res)=>{
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
  
}

const postEnrollCourse= async (req, res)=>{
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
}

const getCourse=async (req, res)=>{
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
}

const deleteCourse=async(req, res)=>{
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
}

const removeEnrolledCourse=async (req, res)=>{
       try{
         const {studentId, courseId}=req.body;
        if(!studentId || !courseId){
          return res.json({
            success:false,
            message:"Student ID and Course ID required"
          })
        }
        const course= await Course.findById(courseId);
        if(!course){
          return res.json({
            success:false,
            message: "Course not found",
          })
        }

        const student=await User.findById(studentId);
        if(!student){
          return res.json({
            success:false,
            message:"Student not found",
          })
        }
        student.enrolledCourses=student.enrolledCourses.filter((c)=>courseId!=c.toString());
        student.fee.total = Math.max(
      0,
      (student.fee.total || 0) - (course.price || 0)
    );
        await student.save();
        res.json({
          success:true,
          message:"Course removed successfully",
          
        })
       } catch (e) {
    res.json({
      success: false,
      message: "Failed to remove course",
      error: e.message,
    });
  }
}
export {postCourse, postEnrollCourse, getCourse, deleteCourse, removeEnrolledCourse}