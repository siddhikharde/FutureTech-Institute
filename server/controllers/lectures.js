import Course from "../models/Courses.js";
import Lectures from "../models/Lectures.js";
import User from "../models/User.js";

const postLecture = async (req, res) => {
    try {
        const { title, description, courseId, videoUrl } = req.body;

        if (!title || !courseId || !videoUrl) {
            return res.json({
                success: false,
                message: "Title, Video URL and Course are required"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.json({
                success: false,
                message: "Course not found"
            });
        }

        const lecture = await Lectures.create({
            title,
            description,
            videoUrl,
            course: courseId
        });

        res.json({
            success: true,
            message: "Lecture created successfully",
            data: lecture
        });

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
                message: "Course not found"
            });
        }

        // Check student enrollment
        if (req.existingUser.role === "student") {
            const student = await User.findById(req.existingUser.id);

            if (!student) {
                return res.json({
                    success: false,
                    message: "Student not found"
                });
            }

            const isEnrolled = student.enrolledCourses.some(
                (course) => course.toString() === courseId
            );

            if (!isEnrolled) {
                return res.status(403).json({
                    success: false,
                    message: "You are not enrolled in this course"
                });
            }
        }

        const lectures = await Lectures
            .find({ course: courseId })
            .sort({ createdAt: 1 });

        res.json({
            success: true,
            message: "Lectures fetched successfully",
            data: lectures
        });

    } catch (err) {
        res.json({
            success: false,
            message: "Failed to fetch lectures",
            error: err.message
        });
    }
};
const putLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lectures.findByIdAndUpdate(
            lectureId,
            req.body,
            { new: true }
        );

        if (!lecture) {
            return res.json({
                success: false,
                message: "Lecture not found"
            });
        }

        res.json({
            success: true,
            message: "Lecture updated successfully",
            data: lecture
        });

    } catch (err) {
        res.json({
            success: false,
            message: "Failed to update lecture",
            error: err.message
        });
    }
};

const deleteLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lectures.findByIdAndDelete(lectureId);

        if (!lecture) {
            return res.json({
                success: false,
                message: "Lecture not found"
            });
        }

        res.json({
            success: true,
            message: "Lecture deleted successfully"
        });

    } catch (err) {
        res.json({
            success: false,
            message: "Failed to delete lecture",
            error: err.message
        });
    }
};

const getSingleLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lectures.findById(lectureId);

        if (!lecture) {
            return res.json({
                success: false,
                message: "Lecture not found"
            });
        }

        if (req.existingUser.role === "student") {
            const student = await User.findById(req.existingUser.id);

            if (!student) {
                return res.json({
                    success: false,
                    message: "Student not found"
                });
            }

            const isEnrolled = student.enrolledCourses.some(
                (courseId) =>
                    courseId.toString() === lecture.course.toString()
            );

            if (!isEnrolled) {
                return res.status(403).json({
                    success: false,
                    message: "You are not enrolled in this course"
                });
            }
        }

        res.json({
            success: true,
            message: "Lecture fetched successfully",
            data: lecture
        });

    } catch (err) {
        res.json({
            success: false,
            message: "Failed to fetch lecture",
            error: err.message
        });
    }
};
export {
    postLecture,
    getCourseLectures,
    putLecture,
    deleteLecture,
    getSingleLecture
};