import React from 'react'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion'
import Input from '../../components/Input'
import { useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast'

function AddStudent() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        totalFee: ""
    });

    const handleSubmit=async (e)=>{
      e.preventDefault();
    const {name, email, password, phone, totalFee}=form;
    if(!name || !email || !password || !phone || !totalFee){
       toast.error("Please fill all fields", { id: "error" })
       return
    }
    try{
     const token=localStorage.getItem("JwtToken");
     if(!token){
        navigate("/login");
     }
     
    const response=await axios.post("http://localhost:8080/students",form,{
        headers:{
             Authorization:`Bearer ${token}`}
    });
   
    if(response.data.success){
        toast.success(response.data.message || "Student created successfuly");
        setForm({
            name:"",email:"", password:"",phone:"", totalFee:""
        })
    }else{
        toast.error(response.data.message)
    }}
    catch(e){
         toast.error(
      error.response?.data?.message || "Server error. Try again."
    );
    }
    }
    return (
        <div className='bg-[#F9FAFB] min-h-screen'>
            <Navbar />

            <div className='flex items-center justify-center flex-col gap-4 p-5'>
                <h1 className='text-center p-2 mt-5 text-4xl font-bold text-[#0F172A]'>Add Students</h1>
                <form onSubmit={handleSubmit} 
                className='bg-white rounded-2xl shadow-lg p-10 w-full max-w-md'>
                    <div className='flex justify-center flex-col items-start gap-4'>
                        <div className='flex flex-col gap-2 w-full'>  <label className='text-md font-semibold'>Name of the Student:</label>
                            <Input type={"text"} placeholder={"Enter name"} value={form.name} onChange={(e) => {
                                setForm({ ...form, name: e.target.value })
                            }} /></div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-md font-semibold'>Email of the Student:</label>
                            <Input type={"email"} placeholder={"Enter email"} value={form.email} onChange={(e) => {
                                setForm({ ...form, email: e.target.value })
                            }} />

                        </div>
                        <div  className='flex flex-col gap-2 w-full'>
                            <label className='text-md font-semibold'>Password:</label>
                            <Input type={"password"} placeholder={"Enter Password"} value={form.password} onChange={(e) => {
                                setForm({ ...form, password: e.target.value })
                            }} />
                        </div>

                        <div  className='flex flex-col gap-2 w-full'>
                            <label className='text-md font-semibold'>Total Fees:</label>
                            <Input type={"text"} placeholder={"Enter Total Fees"} value={form.fees} onChange={(e) => {
                                setForm({ ...form, totalFee: e.target.value })
                            }} />
                        </div>

                        <div  className='flex flex-col gap-2 w-full'>
                            <label className='text-md font-semibold'>Mobile Number:</label>
                            <Input type={"text"} placeholder={"Enter Mobile Number"} value={form.phone} onChange={(e) => {
                                setForm({ ...form, phone: e.target.value })
                            }} />
                        </div>
                       <div className='flex items-center justify-center w-full mt-2'>
                         <Button type='submit' title={"Add Student"}  size='lg' />

                    </div>

                       </div>
                </form>
            </div>
            <Toaster/>
        </div>
    )
}

export default AddStudent
