import cors from 'cors';
import { auth, admin } from './middlewares/jwt.js';
import { getHealth, getHome } from './controllers/home.js';
import connectDb from './db.js';
import { postLogin } from './controllers/auth.js';
import { getSingleStudent, getStudent, getStudentDashboard, postStudent, putStudent } from './controllers/students.js';
import { deleteCourse, getCourse, getPublicCourses, postCourse, postEnrollCourse, putCourse, getSingleCourse, removeEnrolledCourse } from './controllers/courses.js';
import { getStatestic, getStudentGrowthGraph } from './controllers/dashbord.js';
import { postPayment } from './controllers/payment.js';
import { upload } from './config/multer.js';
import { getCourseLectures, putLecture,deleteLecture,postLecture} from './controllers/lectures.js';

import dns from 'dns';
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from 'express'
import dotenv from 'dotenv'

const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 5000;


//home
app.get("/", getHome);
app.get("/health", getHealth);

//auth
app.post("/login", postLogin)

//students
app.post("/students", auth, admin, postStudent)
app.get("/students", auth, admin, getStudent)
app.get("/student/:id", auth, admin, getSingleStudent);
app.put("/student/:id", auth, admin, putStudent)
app.get("/student-dashboard", auth, getStudentDashboard)

//courses
app.post("/courses" ,auth, admin, postCourse);
app.post("/enroll-course",auth, admin, postEnrollCourse);
app.get("/courses", auth, admin, getCourse);
app.delete("/courses/:id", auth, admin, deleteCourse);
app.delete("/remove-course", auth, admin, removeEnrolledCourse);
app.put("/edit-course-price/:id", auth, admin, putCourse);
app.get("/public/courses", getPublicCourses);
app.get("/course/:id", auth, admin, getSingleCourse); 

//lectures api
app.post("/lectures", auth, admin, postLecture);
app.get("lectures/:courseId", auth, getCourseLectures);
app.put("/lectures/:lectureId", auth, admin, putLecture);
app.delete("lectures/:lectureId", auth, admin, deleteLecture);

//payment
app.post("/payment", auth, admin, postPayment)

//dashboard
app.get("/dashboard-stats", auth, admin,getStatestic)

app.get("/students-growth", auth, admin, getStudentGrowthGraph)

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);

  res.json({
    success: true,
    imageUrl: req.file.path,
  });
});
app.listen(PORT,()=>{
    console.log(`Srever is running on a Port:${PORT}`);
    connectDb();
})