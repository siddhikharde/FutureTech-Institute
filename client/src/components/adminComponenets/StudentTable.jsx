import axios from "axios";
import { setDragLock } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function StudentTable() {
    const [students, setStudesnts] = useState([]);
    const [course, setCourse] = useState([]);

    const token = localStorage.getItem("JwtToken");
    const loadStudents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/students", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                setStudesnts(response.data.data);
            }
        } catch (e) {
            toast.error("Failed to load courses");
        }
    }
  
    const enrollCourses=async ({studentId, courseId})=>{
        try{
             const response=await axios.post("http://localhost:8080/enroll-course", {studentId, courseId},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            
         )
         if(response.data.success){
                  toast.success("Course enrolled");
               loadStudents();
            }
        }catch(e){
toast.error("Enrollment failed");
        }
    }

    const loadCourses=async ()=>{
        try{
            const response=await axios.get("http://localhost:8080/courses",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.data.success){
                setCourse(response.data.data);
                toast.success("Courses loaded");

            }
        }catch(e){
               toast.error("Failed to load courses");
        }
    }

    useEffect(()=>{
   loadStudents();
   loadCourses();
    },[])

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Students</h2>

            <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Enrolled Courses</th>
                        <th className="p-3 border">Total Fee</th>
                        <th className="p-3 border">Remaining Fee</th>
                        <th className="p-3 border">Enroll</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((s) => {
                            const remaining = s.fee.total - s.fee.paid;
                            return(
                            <tr key={s._id} className="text-center">
                                <td className="p-2 border">{s.name}</td>
                                <td className="p-2 border">{s.email}</td>
                                <td className="p-2 border">{
                                s. enrolledCourses.length>0?
                                 ( s.enrolledCourses.map((c)=>c.title).join(", ")
                                ):"None"
                            }</td>

                            </tr>
                         ) })
                    }
                </tbody>


            </table>
        </div>
    );
}

export default StudentTable;
