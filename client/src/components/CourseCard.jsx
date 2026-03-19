import React from 'react'
import Button from './Button'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'

function CourseCard({title, description, duration, img, buttonTitle, onClick}) {
  return (
      <motion.div
      className='flex flex-col rounded-2xl overflow-hidden bg-[#0F172A] text-white shadow-xl border border-gray-800'
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >

      {/* Image */}
      <div className='relative overflow-hidden h-[200px]'>
        <motion.img
          src={img}
          alt={title}
          className='w-full h-full object-cover'
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition duration-500'/>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-3 p-5'>
        <h2 className='text-[20px] font-bold leading-snug'>
          {title}
        </h2>

        <p className='text-gray-400 text-[14px] line-clamp-3'>
          {description}
        </p>

        <p className='flex items-center gap-2 text-[14px] text-gray-400'>
          <Clock size={16}/> {duration}
        </p>

        {/* Button with animation */}
        <motion.div whileTap={{ scale: 0.95 }} className='mt-2'>
          <Button
            title={buttonTitle}
            size='md'
            onClick={onClick}
          />
        </motion.div>
      </div>
    </motion.div>
    )
}

export default CourseCard
