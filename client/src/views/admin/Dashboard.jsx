import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/adminComponenets/StatCard";
import toast from "react-hot-toast";
import StudentTable from "../../components/adminComponenets/StudentTable";

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
    <div className="min-h-screen ">
      <div className="p-8 flex items-center flex-col md:flex-row justify-center gap-5 gap-6">
        <StatCard title="Total Students" value={stats.students} />
        <StatCard title="Pending Fees" value={`₹ ${stats.pendingFees}`} valueColor={"red-400"}/>
      </div>
     <div>
        <StudentTable/>
     </div>
      
    </div>
  );
}
