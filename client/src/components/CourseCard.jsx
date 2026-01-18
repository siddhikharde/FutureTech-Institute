import React from 'react'
import Button from './Button'
import { Clock } from 'lucide-react'

function CourseCard({title, description, duration, img}) {
  return (
   <div className='flex flex-col shadow-[2px_2px_10px_#666666] rounded-2xl ' >
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
}

export default CourseCard
