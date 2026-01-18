import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import featuresConfig from "../configs/HomePageFeatures";
import FeatureCard from "../components/HomeFeatureCard";
import studReviews from "../configs/Reviews";
import {setPageTitle} from '../Utils'
import { motion } from "framer-motion";
import { useEffect } from "react";

function Home (){
  useEffect(()=>{
    setPageTitle({title:""})
  })
  const navigate=useNavigate();
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerAnimation = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  return (
    <div className="bg-[#F8FAFC]">

      <Navbar/>
      <motion.div 
       className="bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] filter: bg-blend-multiply  text-white"
       initial="hidden"
       animate="visible"
       variants={containerAnimation}>
        <div className="max-w-7xl mx-auto px-5 py-24 text-center">
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}>
            Learn Skills for the Future with <span className="text-[#38BDF8]">FutureTech</span>
          </motion.h1>
          <motion.p className="text-xl text-gray-300 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}>
            Industry-ready courses, expert trainers, and recorded lectures.
          </motion.p>
          <motion.div className="flex justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}>
            <Button size="lg"title={"Explore Courses"} onClick={()=>{
                navigate("/courses")
            }} />
            <Button variant="secondary" size="lg" title={"Contact Us"}
            onClick={()=>navigate("/contact")}/>

          </motion.div>
        </div>
      </motion.div>
  <div className="flex flex-col items-center justify-center px-5 p-10">
      <h2 className="md:text-4xl text-3xl font-bold text-center text-[#020617] mb-12">
            Why Choose FutureTech?
          </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        
          {featuresConfig.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
  </div>

        <div className="bg-[#EFF6FF] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="md:text-4xl text-3xl font-bold text-center text-[#020617] mb-12">
            Popular Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {["Web Development", "Data Science", "AI & ML"].map((course, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl border  border-[#E2E8F0] p-6 cursor-pointer hover:border-[#2563EB] transition"
                whileHover={{ y: -5,    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",}}
                 transition={{ ease: "easeOut" , duration: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{course}</h3>
                <p className="text-[#475569] mb-4">
                  Learn {course} from scratch with practical projects.
                </p>
                <Button size="sm" title={"Enroll Now"} onClick={()=>navigate("/courses")}/>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
        <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#020617] mb-10">
            Student Reviews
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
           {
              studReviews.map((item, index)=>{
                return(
                 <div className="bg-white p-6 rounded-xl shadow" key={index}>
              <p className="text-[#475569] mb-4">
               {item.message}
              </p>
              <h4 className="font-semibold">- {item.name}</h4>
            </div>
                )
              })

           } 


          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
