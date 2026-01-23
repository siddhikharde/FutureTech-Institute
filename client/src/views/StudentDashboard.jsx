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
     const total = student.fee?.total || 0;
  const paid = student.fee?.paid || 0;
  const pending = total - paid;

     function InfoCard({ title, value, accent, danger }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow bg-white ${
        accent && "border-l-4 border-blue-600"
      } ${danger && "border-l-4 border-red-500"}`}
    >
      <p className="text-gray-500">{title}</p>
      <p
        className={`text-2xl font-bold ${
          danger ? "text-red-500" : "text-[#0F172A]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
  return (
    <>
     <Navbar/>
     
     <div className='p-5'>
            <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold md:text-4xl text-center font-boldtext-center my-8 bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent">
          Welcome, {student.name || "User"} 
        </h1>
        <p className="text-center bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent mt-2">
          Your learning progress at FutureTech
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        <InfoCard title="Total Fee" value={`₹ ${total}`} />
        <InfoCard title="Paid Fee" value={`₹ ${paid}`} accent />
        <InfoCard title="Pending Fee" value={`₹ ${pending}`} danger />

      </div>
         <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-4 text-[#0F172A]">
            Enrolled Courses
          </h2>

          {student.enrolledCourses.length === 0 ? (
            <p className="text-gray-500">No courses enrolled yet</p>
          ) : (
            <div className="space-y-3">
              {student.enrolledCourses.map((c) => (
                <div
                  key={c._id}
                  className="flex justify-between items-center bg-blue-50 p-4 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-[#0F172A]">
                      {c.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration: {c.duration}
                    </p>
                  </div>
                  <span className="font-bold text-[#143A8A]">
                    ₹{c.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        </div>    </>
  )
}

export default StudentDashboard
