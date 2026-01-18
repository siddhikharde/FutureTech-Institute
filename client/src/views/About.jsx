import React from "react";
import { Cpu, Users, Award, BookOpen, Target, } from "lucide-react";
import Navbar from "../components/Navbar";
import { StatCard, InfoCard, ValueCard } from "../components/AboutCards";
import { statData, visionMession, values } from '../configs/About'
import { motion } from "framer-motion";
import {setPageTitle} from '../Utils'
import { useEffect } from "react";
import Footer from "../components/Footer";


function About() {
   useEffect(()=>{
      setPageTitle({title:"About"});
      window.scrollTo(0, 0);
    },[])
   const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerAnimation = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />
      <motion.div className="relative overflow-hidden"
      variants={containerAnimation}
      initial="hidden"
      animate="visible">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A]" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}>
            About <span className="text-[#0EA5E9]">FutureTech</span>
          </motion.h1>
          <motion.p className="text-gray-400 max-w-3xl mx-auto text-lg 
          "initial="hidden"
          animate="visible"
          variants={fadeInUp}>
            Shaping future-ready professionals through practical,
            industry-focused technology education.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {
            statData.map((item, index) => {
              return (
                <StatCard title={item.title} subtitle={item.subtitle} />
              )
            })
          }
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#111827] mb-4">
              Who We Are
            </h2>
            <p className="text-[#4B5563] mb-4">
              <strong>FutureTech</strong> is a modern technology institute
              dedicated to bridging the gap between academic learning and
              real-world industry needs.
            </p>
            <p className="text-[#4B5563]">
              We focus on hands-on training, real projects, and mentorship
              that helps students build confidence and careers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ul className="space-y-4 text-[#111827]">
              <li className="flex items-center gap-3">
                <BookOpen className="text-[#0EA5E9]" />
                Practical Learning Approach
              </li>
              <li className="flex items-center gap-3">
                <Cpu className="text-[#0EA5E9]" />
                Latest Technologies
              </li>
              <li className="flex items-center gap-3">
                <Award className="text-[#0EA5E9]" />
                Industry Certifications
              </li>
              <li className="flex items-center gap-3">
                <Users className="text-[#0EA5E9]" />
                Expert Faculty & Mentors
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8">
          {
            visionMession.map((item, index) => {
              const Icon = item.icon;
              return (
                <InfoCard title={item.title} text={item.text} icon={<Icon size={32} />}
                  key={index} />
              )
            })
          }
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-[#111827] mb-12">
          Our Core Values
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            values.map((item, index) => {
              const Icon = item.icon;
              return (
                <ValueCard title={item.title} text={item.text} key={index} icon={<Icon size={28} />} />
              )
            })
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;
