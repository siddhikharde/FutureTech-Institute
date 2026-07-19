import Course from "../models/Courses.js";
import Lectures from "../models/Lectures.js";

const postLecture = async (req, res) => {
    try {
        const { title, description, courseId, vedioUrl } = req.body;
        if (!title || !courseId || !vedioUrl) {
            return res.json({
                success: false,
                message: "Title, Video URL and Course are required",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({
                success: false,
                message: "Course not found",
            });
        }

        const lecture = await Lectures.create({
            title,
            description,
            vedioUrl,
            course: courseId,
        });

        res.json({
            success: true,
            message: "Lecture created successfully",
            data: lecture,
        })

    } catch (err) {
        res.json({
            success: false,
            message: "Failed to create lecture",
            error: err.message
        });
    }
};

const getCourseLectures = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({
                success: false,
                message: "Course not found",
            });
        }

        const lectures = await Lectures.find({ course: courseId }).sort({ createdAt: 1 });
        res.json({
            success: true,
            message: "Lectures fetched successfully",
            data: lectures,
        });

    } catch (err) {
        res.json({
            success: false,
            message: "Failed to fetch lectures",
            error: err.message
        });
    }
}

const putLecture = async (req, res) => {
   try{
     const { lectureId } = req.params;
    const lecture = await Lectures.findByIdAndUpdate(
        lectureId,
        req.body,
        { new: true }
    );
    if (!lecture) {
        return res.json({
            success: false,
            message: "lecture not found",

        });
       
    }
     res.json({
            success: true,
            message: "Lecture updated successfully",
            data: lecture,
        });
}catch (err) {
    res.json({
        success: false,
        message: "Failed to update lecture",
        error: err.message
    });
}}

const deleteLecture = async (req, res)=>{
    try{
        const {lectureId}=req.params;
        const lecture=await Lectures.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.json({
                success:false,
                message:"Lecture not found"
            })
        }
        res.json({
            success:true,
            message:"Lecture deleted successfully"
        })
    }catch(err){
        res.json({
            success:false,
            message:"Failed to delete Lecture",
            error:err.message
        })
    }
}
export { postLecture, getCourseLectures, putLecture, deleteLecture };