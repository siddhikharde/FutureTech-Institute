import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

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
  return (
    <div>
      
    </div>
  )
}

export default StudentDashboard
