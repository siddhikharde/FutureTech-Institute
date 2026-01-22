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

    const fetchCourses=async ()=>{
        try{
   const token=localStorage.getItem("JwtToken");
          const res=await axios.get("http://localhost:8080/courses", {
            headers:{Authorization:`Bearer ${token}`}
          });
          if(res.data.success){
            setCourses(res.data.data);
          }
        }catch(e){
            toast.error("Failed to load courses");
        }
    }
    
    useEffect(()=>{
        fetchCourses();
    },[])

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };


  return (
    <div className='min-h-screen bg-gray-50'>
        <AdminNavbar/>
        <div className='max-w-7xl mx-auto p-4 space-y-5'>
         <h1 className='text-4xl font-bold text-center my-8  bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent'>
              Manage Courses
         </h1>
         <motion.form 
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
            className="md:col-span-4 border rounded-xl p-3 border border-gray-300 outline-0 focus:ring-1 focus:ring-blue-500"
            value={form.description}
            onChange={(e)=>{
                setForm({
                    ...form, description:e.target.value
                })
            }}/>


         </motion.form>

         <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className='w-full text-sm'>
                <thead className="bg-gray-100 text-left">
                    <tr>
                          <th className="p-4">Title</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.length==0 ?(
                            <tr>
                                <td colSpan="4" className="p-6 text-center text-gray-500">
                                                       No courses found
                                </td>
                            </tr>
                        ):(
                            courses.map((c)=>{
                                return(
                                   <tr  key={c._id}
                    className="border-t hover:bg-gray-50">
                                     <td className='p-4 font-medium'>{c.title} </td>
                                    <td className="p-4">{c.duration?c.duration:"-" }</td>
                    <td className="p-4">₹ {c.price}</td>
                    <td className="p-4 text-center">
                        <Button 
                        title={" Delete"} variant='danger' size='sm'
                        />

                    </td>
                                   </tr>
                                )
                            })
                        )
                    }
                </tbody>

            </table>

         </div>

        </div>

      
    </div>
  )
}

export default AddCourses
