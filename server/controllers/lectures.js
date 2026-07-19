import Course from "../models/Courses";
import Lectures from "../models/Lectures";

const postLectures=async (req, res)=>{
    try{
        const {title, description, courseId, vedioUrl}=req.body;
        if(!title || !courseId || !vedioUrl){
            return res.json({
                success:false,
                message:"Title, Video URL and Course are required",
            });
        }

        const course =await Course.findById(courseId);
        if(!course){
            return res.json({
                success:false,
                message:"Course not found",
            });
        }

        const lecture=await Lectures.create({
            title,
            description,
            vedioUrl,
            course:courseId,
        });

        res.json({
            success:true,
            message:"Lecture created successfully",
            data:lecture,
        })

    }catch(err){
        res.json({
            success:false,
            message:"Failed to create lecture",
            error:err.message
        });
    }
};

const getCourseLectures=async (req,res)=>{
    try{
        const {courseId}=req.params;
        const course=await Course.findById(courseId);
        if(!course){
            return res.json({
                success:false,
                message:"Course not found",
            });
        }

        const lectures=await Lectures.find({course:courseId}).sort({createdAt:1});
        res.json({
            success:true,
            message:"Lectures fetched successfully",
            data:lectures,
        });

    }catch(err){
        res.json({
            success:false,
            message:"Failed to fetch lectures",
            error:err.message
        });
    }
}
export {postLectures, getCourseLectures};