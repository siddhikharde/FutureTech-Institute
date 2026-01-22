import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router'

function StudentDetail() {
    const id=useParams();
    const token=localStorage.getItem("JwtToken")
    const [courses, setCourses]=useState([]);
    const [amount, setAmount]=useState("");

    const fetchCourses=async()=>{

            const res=await axios.get("http://localhost:8080/courses", {
                headers:{Authorization:`Bearer ${token}`}
            });
            if(res.data.success){
                setCourses(res.data.data);
            }
    };
    const addPayment=async ()=>{
         if(!amount) return toast.error("Enter amount.")
            const res= await axios.post("http://localhost:8080/payment",
        {studentId: id, amount},
        {headers:{Authorization:`Bearer ${token}`}});
         toast.success("Payment added");
    setAmount("");
    fetchStudent();
    }

    const enrollCourse=async (courseId)=>{
        await axios.post("http://localhost:8080/enroll-course",
            { studentId: id, courseId },
             { headers: { Authorization: `Bearer ${token}` } }
        );
          toast.success("Course enrolled");
    fetchStudent();
    }
    useEffect(()=>{
      fetchCourses();
    },[])
  return (
    <div>
      
    </div>
  )
}

export default StudentDetail
