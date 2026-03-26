import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const token = localStorage.getItem("JwtToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/student-dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) setStudent(res.data.data);
      });
  }, []);

  if (!student) return null;

  const firstName = student?.name?.split(" ")[0] || "Student";
  const total = student.fee?.total || 0;
  const paid = student.fee?.paid || 0;
  const pending = total - paid;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  function InfoCard({ title, value, accent, danger }) {
    return (
      <motion.div
        variants={slideUp}
        whileHover={{ y: -8, scale: 1.03 }}
        className={`bg-[#0F172A] border border-gray-700 rounded-2xl p-6 shadow-xl`}
      >
        <p className="text-gray-400">{title}</p>
        <p
          className={`text-2xl font-bold ${
            danger ? "text-red-400" : "text-blue-400"
          }`}
        >
          {value}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen">

      <Navbar />

      <motion.div
        className="max-w-7xl mx-auto px-5 py-12"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >

        <motion.div variants={slideUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Hello, <span className="text-blue-400">{firstName}</span> !
          </h1>

          <p className="text-gray-400 mt-3">
            Welcome to your FutureTech dashboard
          </p>

          <p className="text-gray-500 mt-1 text-sm">
            Enrolled on:{" "}
            <span className="text-blue-400 font-semibold">
              {new Date(student.enrolledAt).toLocaleDateString()}
            </span>
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={stagger}
        >
          <InfoCard title="Total Fee" value={`₹ ${total}`} />
          <InfoCard title="Paid Fee" value={`₹ ${paid}`} accent />
          <InfoCard title="Pending Fee" value={`₹ ${pending}`} danger />
        </motion.div>

        <motion.div
          variants={slideUp}
          className="bg-[#0F172A] border border-gray-700 rounded-2xl p-6 shadow-xl"
        >
          <h2 className="font-semibold text-xl mb-6">
            Enrolled Courses
          </h2>

          {student.enrolledCourses.length === 0 ? (
            <p className="text-gray-400">No courses enrolled yet</p>
          ) : (
            <div className="space-y-4">
              {student.enrolledCourses.map((c) => (
                <motion.div
                  key={c._id}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center bg-[#020617] border border-gray-700 p-4 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {c.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      Duration: {c.duration}
                    </p>
                  </div>

                  <span className="font-bold text-blue-400">
                    ₹{c.price}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
}

export default StudentDashboard;