import React, { useEffect } from "react";
import { Cpu, Users, Award, BookOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import { StatCard, InfoCard, ValueCard } from "../components/AboutCards";
import { statData, visionMession, values } from "../configs/About";
import { motion } from "framer-motion";
import { setPageTitle } from "../Utils";
import Footer from "../components/Footer";

function About() {

  useEffect(() => {
    setPageTitle({ title: "About" });
    window.scrollTo(0, 0);
  }, []);

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity }
    }
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
            className="text-5xl md:text-7xl font-extrabold"
            variants={slideLeft}
          >
            About
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              FutureTech
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
            variants={slideRight}
          >
            Shaping future-ready professionals through practical,
            industry-focused technology education.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-5 py-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {statData.map((item, index) => (
          <motion.div key={index} variants={slideLeft}>
            <StatCard {...item} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={slideLeft}>
          <h2 className="text-3xl font-bold mb-4">
            Who We Are
          </h2>
          <p className="text-gray-300 mb-4">
            <strong>FutureTech</strong> is a modern technology institute
            dedicated to bridging the gap between academic learning and
            real-world industry needs.
          </p>
          <p className="text-gray-400">
            We focus on hands-on training, real projects, and mentorship
            that helps students build confidence and careers.
          </p>
        </motion.div>

        <motion.div
          variants={slideRight}
          className="bg-[#0F172A] rounded-2xl shadow-xl p-8 border border-gray-700"
        >
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <BookOpen className="text-blue-400" />
              Practical Learning Approach
            </li>
            <li className="flex items-center gap-3">
              <Cpu className="text-blue-400" />
              Latest Technologies
            </li>
            <li className="flex items-center gap-3">
              <Award className="text-blue-400" />
              Industry Certifications
            </li>
            <li className="flex items-center gap-3">
              <Users className="text-blue-400" />
              Expert Mentors
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* VISION & MISSION */}
      <motion.div
        className="bg-[#0F172A]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-8">
          {visionMession.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={slideLeft}>
                <InfoCard
                  title={item.title}
                  text={item.text}
                  icon={<Icon size={32} />}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* VALUES */}
      <motion.div
        className="max-w-7xl mx-auto px-5 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={slideRight}
        >
          Our Core Values
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={slideLeft} whileHover={{ y: -6 }}>
                <ValueCard
                  title={item.title}
                  text={item.text}
                  icon={<Icon size={28} />}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default About;