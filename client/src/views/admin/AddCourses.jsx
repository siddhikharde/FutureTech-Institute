import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import AdminNavbar from '../../components/adminComponenets/AdminNavbar';
import Input from '../../components/Input';
import Button from '../../components/Button';

function AddCourses() {
    const navigate=useNavigate();
    const [courses, setCourses]=useState([]);
    const [form, setForm]=useState({
        title:"",
        description:"",
        price:"",
        duration:"",
    })

 

  return (
    <div className='min-h-screen bg-gray-50'>
        <AdminNavbar/>
        <div className='max-w-7xl mx-auto p-4'>
         <h1 className='text-4xl font-bold text-center my-8  bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent'>
              Manage Courses
         </h1>
         <motion.from 
         variants={fadeInUp}
         initial="hidden"
         animate="visible"
         className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-4">

            <Input type={"text"} placeholder={"Course Title"}
            value={form.title}
            onChange={(e)=>{
                setForm({...from, title:e.target.value})
            }}/>

            <Input type={"number"} placeholder={"Price (₹)"}
            value={form.price}
            onChange={(e)=>{
                setForm({...from, price:e.target.value})
            }}/>

            <Input type={"text"} placeholder={"Duration (eg. 3 Months)"}
            value={form.duration}
            onChange={(e)=>{
                setForm({...from, title:e.target.value})
            }}/>

            <Button title={"Add"} type='submit'/>
            <textarea
            placeholder='Description (optional)'
            className="md:col-span-4 border rounded-xl p-3 border border-gray-300 outline-0 focus:ring-1 focus:ring-[#38BDF8]"
            value={form.description}
            onChange={(e)=>{
                setForm({
                    ...form, description:e.target.value
                })
            }}/>


         </motion.from>

        </div>

      
    </div>
  )
}

export default AddCourses
