import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router'
import Button from '../../components/Button';
import Input from '../../components/Input';

function StudentDetail() {
    const {id}=useParams();
    const token=localStorage.getItem("JwtToken")
    const [courses, setCourses]=useState([]);
    const [amount, setAmount]=useState("");
    const [student, setStudent]=useState(null)

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
        if(res.data.success){
             toast.success("Payment added");
    setAmount("");
    fetchStudent();
        }
        else{
            toast.error("Fail")
        }
        
    }
const fetchStudent=async()=>{
    try{
        const res=await axios.get(`http://localhost:8080/student/${id}`,
            {headers:{Authorization:`Bearer ${token}`}}
        )
        if(res.data.success){
            setStudent(res.data.data)
        }
    }catch {
      toast.error("Failed to load student", {id:"succ"});
    }
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
      fetchStudent();
    },[])

    if (!student) return null;

    const pending=(student.fee.total || 0)- (student.fee.paid || 0);
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">{student.name}</h1>
            <div className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <p>Email:{student.email}</p>
        <p>Phone:{student.phone}</p>
        <p>Parent: {student.parent?.name}</p>
        <p>Parent Phone: {student.parent?.phone}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <p>Total Fee: ₹{student.fee.total}</p>
        <p>Paid: ₹{student.fee.paid}</p>
        <p className="text-red-600 font-bold">Pending: ₹{pending}</p>

        <div className="flex gap-3">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Add payment"
          />
          <Button title="Add Payment" size='sm' onClick={addPayment} />
        </div>
      </div>
      
    </div>
  )
}

export default StudentDetail
