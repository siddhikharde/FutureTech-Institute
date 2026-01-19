import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import {motion} from 'framer-motion'
import courses from '../configs/Courses'
import { useNavigate } from 'react-router'
import { setPageTitle } from '../Utils'
import CourseCard from '../components/CourseCard'
import Footer from '../components/Footer'
function Courses() {
  useEffect(()=>{
   setPageTitle({title:"Courses"});
   window.scrollTo(0, 0);
  },[])
 const navigate=useNavigate();
  const fadeInUp={
    hidden:{opacity:0, y:20 },
    visible:{opacity:1, y:0, transition:{duration:0.6}}
  }
  return (
    <div>
   <Navbar/>
      <div className="relative overflow-hidden">
        <div className='absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A]'/>
          <motion.div  className='relative max-w-full text-center mx-auto px-4 py-24'
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
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-6 py-10'>
            {
              courses.map((item, index)=>{
                const {id, title, img, duration,  description}=item;
                return(
                <CourseCard title={title} description={description} duration={duration}uration img={img} buttonTitle={"Enroll Now"} onClick={()=>navigate("/contact")} key={index}/>
                )
              })
            }
          </div>
     <Footer/>
    </div>
  )
}

export default Courses
