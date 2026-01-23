import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Navbar from '../components/Navbar';

function StudentDashboard() {
    const [student, setStudent]=useState(null);
    const token=localStorage.getItem("JwtToken");
    useEffect(()=>{
       axios.get("http://localhost:8080/student-dashboard",{
        headers:{Authorization:`Bearer ${token}`}
       }).then(res=>{
        if(res.data.success) setStudent(res.data.data)
       })
    },[])
    if(!student) return null;
     const pending = student.fee.total - student.fee.paid;

  return (
    <>
     <Navbar/>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
       
      <h1 className="text-3xl font-bold">Welcome, {student.name}</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Total Fee: ₹{student.fee.total}</p>
        <p>Paid: ₹{student.fee.paid}</p>
        <p className="text-red-600">Pending: ₹{pending}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">My Courses</h3>
        <ul className="list-disc pl-6">
          {student.enrolledCourses.map(c => (
            <li key={c._id}>{c.title} – ₹{c.price}</li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default StudentDashboard
