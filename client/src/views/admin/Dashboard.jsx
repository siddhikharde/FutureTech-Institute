import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/adminComponenets/StatCard";
import toast from "react-hot-toast";
import StudentTable from "../../components/adminComponenets/StudentTable";
import AdminNavbar from "../../components/adminComponenets/AdminNavbar";
import {FeeGraph, StudentGraph} from "../../components/adminComponenets/FeeGraph";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "../../Utils";

export default function Dashboard() {
  const navigate=useNavigate();
  const [stats, setStats] = useState({
    students: 0,
    pendingFees: 0,
    totalPaid: 0,
  });
  const [studentGrowthData, setStudentGrowthData]=useState([]);

  const getStudentGrowth=async ()=>{
    try{
      const token=localStorage.getItem("JwtToken");
      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/students-growth`,{
        headers:{Authorization:`Bearer ${token}`}});
        if(res.data.success){
          setStudentGrowthData(res.data.data)
        }

    }catch (e) {
    toast.error("Failed to load student growth");
  }
  }
  const getStudentsData = async () => {
    try {
      const token = localStorage.getItem("JwtToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard-stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        const students = response.data.data;
        setStats({
          students: students.totalStudents,
          pendingFees: students.pendingFee,
          totalPaid: students.totalPaid,
        });

        toast.success("Students data loaded..", { id: "success" });
        console.log(response.data)
      } else {
        toast.error("Faild to load data..", { id: "failiour" });
      }
    }
    catch (e) {
      console.e(error);
      toast.error(
        error.response?.data?.message || "Server error")
    }
  }
  useEffect(() => {
    getStudentsData();
    getStudentGrowth();
    setPageTitle({title:"Admin Dashboard"})
  }, []);
  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#143A8A] to-[#0F172A] p-6">


        <div className="flex flex-col md:flex-row md:mx-10 md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-200">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2 md:mt-0">
            Manage students, courses & fees
          </p>
        </div>

        <div className="grid grid-cols-1 md:mx-5 my-2 sm:grid-cols-2 gap-6">
          <StatCard title="Total Students" value={stats.students} type="students" />
          <StatCard title="Pending Fees" value={`₹ ${stats.pendingFees}`} type="fees" valueColor={"text-red-400"} />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-5">
  <FeeGraph data={{ paid: stats.totalPaid, pending: stats.pendingFees }} />
  <StudentGraph data={studentGrowthData} />
</div>
      <div className="md:p-5 ">
        <StudentTable />
      </div>
      </div>
     
      
    </>

  );
}
