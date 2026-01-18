import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { BookOpen, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

function Courses() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description:
        "HTML, CSS, JavaScript, React, Node.js, MongoDB with real projects.",
      duration: "6 Months",
      students: "250+",
    },
    {
      id: 2,
      title: "Data Science",
      description:
        "Python, Pandas, NumPy, Machine Learning with industry datasets.",
      duration: "5 Months",
      students: "180+",
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description:
        "Deep Learning, NLP, Computer Vision with real-world use cases.",
      duration: "6 Months",
      students: "120+",
    },
    {
      id: 4,
      title: "Java & Spring Boot",
      description:
        "Core Java, Hibernate, Spring Boot, REST APIs, Microservices.",
      duration: "4 Months",
      students: "200+",
    },
    {
      id: 5,
      title: "UI / UX Design",
      description:
        "Figma, Wireframing, Prototyping, Design Systems.",
      duration: "3 Months",
      students: "150+",
    },
    {
      id: 6,
      title: "Python Programming",
      description:
        "Python from basics to advanced with automation & projects.",
      duration: "3 Months",
      students: "300+",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#1E40AF] to-[#020617]" />
        <motion.div
          className="relative max-w-7xl mx-auto px-4 py-24 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#38BDF8]">Courses</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Industry-focused programs designed to build real skills and careers.
          </p>
        </motion.div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0px 20px 30px rgba(0,0,0,0.12)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#E0F2FE] p-3 rounded-xl">
                  <BookOpen className="text-[#0EA5E9]" />
                </div>
                <h3 className="text-xl font-semibold text-[#020617]">
                  {course.title}
                </h3>
              </div>

              <p className="text-[#475569] mb-6 flex-grow">
                {course.description}
              </p>

              <div className="flex justify-between text-sm text-[#475569] mb-6">
                <div className="flex items-center gap-1">
                  <Clock size={16} /> {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} /> {course.students}
                </div>
              </div>

              <Button
                size="sm"
                title="Enroll Now"
                onClick={() => navigate("/register")}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Courses;
