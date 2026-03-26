import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import courses from '../configs/Courses'
import { useNavigate } from 'react-router'
import { setPageTitle } from '../Utils'
import CourseCard from '../components/CourseCard'
import Footer from '../components/Footer'
import Button from '../components/Button'

function Courses() {

  useEffect(() => {
    setPageTitle({ title: "Courses" });
    window.scrollTo(0, 0);
  }, [])

  const navigate = useNavigate();

  // 🔥 SAME ANIMATIONS AS HOME (COPY PASTE)
  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity }
    }
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.7 } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[#020617] text-white overflow-hidden">

      <Navbar />

      <div className="relative">

        <motion.div
          className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 top-10 left-10"
          variants={floating}
          animate="animate"
        />
        <motion.div
          className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-10 right-10"
          variants={floating}
          animate="animate"
        />

        <motion.div
          className="text-center py-20 px-5 relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight"
            variants={slideLeft}
          >
            Explore Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Courses
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
            variants={slideRight}
          >
            Choose from industry-ready programs designed to boost your career.
          </motion.p>

        
        </motion.div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {courses.map((item, index) => (
          <motion.div
            key={index}
            variants={cardAnimation}
            whileHover={{ scale: 1.05, y: -12 }}
          >
            <CourseCard
              {...item}
              buttonTitle="Enroll Now"
              onClick={() => navigate("/contact")}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}

export default Courses;