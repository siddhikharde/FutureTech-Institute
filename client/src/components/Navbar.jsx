import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const token = localStorage.getItem("JwtToken");

  const fetchDashboard = async () => {
    const res = await axios.get("http://localhost:8080/student-dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      setStudent(res.data.data);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!student) return null;

  const total = student.fee?.total || 0;
  const paid = student.fee?.paid || 0;
  const pending = total - paid;

  const graphData = [
    { name: "Paid", amount: paid },
    { name: "Pending", amount: pending },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#143A8A] to-[#0F172A] p-6">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Welcome, {student.name} 👋
        </h1>
        <p className="text-blue-200 mt-2">
          Your learning progress at FutureTech
        </p>
      </div>

      {/* INFO CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        <InfoCard title="Total Fee" value={`₹ ${total}`} />
        <InfoCard title="Paid Fee" value={`₹ ${paid}`} accent />
        <InfoCard title="Pending Fee" value={`₹ ${pending}`} danger />

      </div>

      {/* GRAPH + COURSES */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GRAPH */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-4 text-[#0F172A]">
            Fee Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* COURSES */}
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

      </div>
    </div>
  );
}

/* SMALL COMPONENT */
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
