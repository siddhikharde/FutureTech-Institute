import React from 'react'
import Navbar from '../components/Navbar'
import {motion} from 'framer-motion'
import courses from '../configs/courses'
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
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10'>
            {
              courses.map((item, index)=>{
                const {id, title, img, duration,  description}=item;
                return(
                <div className='flex flex-col ' key={index}>
                  <div className='overflow-hidden relative top-0 right-0 h-85 w-full object-contain rounded-2xl h-[300px] bg-gray-900  filtre:bg-blend-multuply'>
                    <img src={img} alt={title} className='w-full h-full  transition-all duration-500 ease-in-out
    hover:scale-125 hover:brightness-70' />
                  </div>

                  </div>
                )
              })
            }
          </div>

  
    </div>
  )
}

export default Courses
