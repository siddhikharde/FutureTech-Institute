import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/adminComponenets/StatCard";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    pendingFees: 0,
  });

 
  return (
    <>
      <div className="p-8 flex items-center flex-col md:flex-row justify-center gap-5 gap-6">
        <StatCard title="Total Students" value={stats.students} />
        <StatCard title="Pending Fees" value={`₹ ${stats.pendingFees}`} />
       
      </div>

      
    </>
  );
}
