import React from 'react'
import Navbar from '../components/Navbar'
import {motion} from 'framer-motion'
function Courses() {
  const containerAnimation={
    hidden:{},
    visible:{transition:{containerAnimation:0.2}}
  }
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
  
    </div>
  )
}

export default Courses
