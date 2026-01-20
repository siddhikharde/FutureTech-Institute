import React from 'react'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion'
import Input from '../../components/Input'
import { useState } from 'react'
import Button from '../../components/Button'

function AddStudent() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        totalFee: ""
    });
    return (
        <div className='bg-[#F9FAFB] min-h-screen'>
            <Navbar />

            <div className='flex items-center justify-center flex-col gap-4 p-5'>
                <h1 className='text-center p-2 mt-5 text-4xl font-bold text-[#0F172A]'>Add Students</h1>
                <form className='bg-white rounded-2xl shadow-lg p-10 w-full max-w-md'>
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
                                setForm({ ...form, fees: e.target.value })
                            }} />
                        </div>

                        <div  className='flex flex-col gap-2 w-full'>
                            <label className='text-md font-semibold'>Mobile Number:</label>
                            <Input type={"text"} placeholder={"Enter Mobile Number"} value={form.phone} onChange={(e) => {
                                setForm({ ...form, phone: e.target.value })
                            }} />
                        </div>

                        <Button type='submit' title={"Add Student"} variant='secondary' size='lg' />

                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddStudent
