import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/adminComponenets/StatCard";
import toast from "react-hot-toast";
import StudentTable from "../../components/adminComponenets/StudentTable";
import AdminNavbar from "../../components/adminComponenets/AdminNavbar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    pendingFees: 0,
  });

   const getStudentsData=async ()=>{
   try{
        const token=localStorage.getItem("JwtToken");
        if(!token){
        navigate("/login");
        return;
     }
     
       const response=await axios.get("http://localhost:8080/dashboard-stats", {
        headers:{
           Authorization:`Bearer ${token}`
        }
    })
    if(response.data.success){
       const students=response.data.data;
        setStats({
        students: students.totalStudents,
        pendingFees: students.pendingFee,
      });
      
       toast.success("Students data loaded..", {id:"success"});
       console.log(response.data)
    }else{
        toast.error("Faild to load data..", {id:"failiour"});
    }
}
    catch(e){
console.error(error);
      toast.error(
        error.response?.data?.message || "Server error")
     }
  }
  useEffect(() => {
  getStudentsData();
     
}, []); 
  return (
    <>
     <AdminNavbar/>
  
 <div className="max-w-7xl mx-auto px-6 py-8 bg-gray-50">
   
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent">
      Admin Dashboard
    </h1>
    <p className="text-gray-500 mt-2 md:mt-0">
      Manage students, courses & fees
    </p>
  </div>

  <div className="grid grid-cols-1 my-2 sm:grid-cols-2 gap-6">
   <StatCard title="Total Students" value={stats.students} type="students" />
<StatCard title="Pending Fees" value={stats.pendingFees} type="fees"  valueColor={"text-red-400"}/>
  </div>
</div>
 <StudentTable/>
</>

  );
}
