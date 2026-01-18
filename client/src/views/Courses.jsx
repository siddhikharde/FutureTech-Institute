import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import {motion} from 'framer-motion'
import courses from '../configs/courses'
import { Clock } from 'lucide-react'
import Button from '../components/Button'
import { useNavigate } from 'react-router'
import { setPageTitle } from '../Utils'
function Courses() {
  useEffect(()=>{
   setPageTitle({title:"Courses"})
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
                <div className='flex flex-col shadow-[2px_2px_10px_#666666] rounded-2xl ' key={index}>
                  <div className='overflow-hidden cursor-pointer relative top-0 right-0 w-full object-contain  rounded-t-2xl h-[200px]'>
                    <img src={img} alt={title} className='w-full h-full  transition-all duration-500 ease-in-out
    hover:scale-125 hover:brightness-70' />
                  </div>
                  <div className='flex flex-col justify-center gap-3 p-5'>
                    <h2 className='text-[22px] font-bold'>{title}</h2>
                    <p className='text-gray-700 text-[15px]'>{description}</p>
                    <p className='flex items-center gap-2 text-[15px] text-gray-500'><Clock size={17}/>{duration}</p>
                    <div className='flex items-center'>
                      <Button title={"Enroll Now"} size='lg' onClick={()=>navigate("/contact")}/>
                    </div>
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
