import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import AdminNavbar from '../../components/adminComponenets/AdminNavbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import toast, { Toaster } from 'react-hot-toast';

function AddCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        duration: "",
    })

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem("JwtToken");
            const res = await axios.get("http://localhost:8080/courses", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setCourses(res.data.data);
            }
        } catch (e) {
            toast.error("Failed to load courses");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, price, duration } = form;
        try {
            const token = localStorage.getItem("JwtToken");
            const res = await axios.post("http://localhost:8080/courses", {
                title,
                description,
                price,
                duration,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) {
                toast.success("Course added");
                setForm({
                    title: "",
                    description: "",
                    duration: "",
                    price: ""
                })
                fetchCourses();
            }

        } catch (e) {
            toast.error("Course creation failed");
        }
    }

const deleteCourse=async(id)=>{
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try{
        const token=localStorage.getItem("JwtToken");
        const res=await axios.delete(`http://localhost:8080/courses/${id}`,
            {headers:{
                Authorization:`Bearer ${token}`,
            }}
        )
        if (res.data.success) {
      toast.success("Course deleted");
      fetchCourses();
    }else{
        toast.error(res.data.message)
    }
    }catch(e){
         toast.error("Delete failed");
    }
}
    useEffect(() => {
        fetchCourses();
    }, [])

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
            <AdminNavbar />
            <div className='max-w-7xl p-5 mx-auto space-y-5 md:p-10'>
                <h1 className='text-4xl font-bold text-center my-8  bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent'>
                    Manage Courses
                </h1>
                <motion.form
                    onSubmit={handleSubmit}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-4">

                    <Input type={"text"} placeholder={"Course Title"}
                        value={form.title}
                        onChange={(e) => {
                            setForm({ ...form, title: e.target.value })
                        }} />

                    <Input type={"number"} placeholder={"Price (₹)"}
                        value={form.price}
                        onChange={(e) => {
                            setForm({ ...form, price: e.target.value })
                        }} />

                    <Input type={"text"} placeholder={"Duration (eg. 3 Months)"}
                        value={form.duration}
                        onChange={(e) => {
                            setForm({ ...form, duration: e.target.value })
                        }} />

                    <Button title={"Add"} type='submit' />
                    <textarea
                        placeholder='Description (optional)'
                        className="md:col-span-4 border rounded-xl p-3 border border-gray-300 outline-0 focus:ring-1 focus:ring-blue-500"
                        value={form.description}
                        onChange={(e) => {
                            setForm({
                                ...form, description: e.target.value
                            })
                        }} />


                </motion.form>

                <div className="bg-white hidden md:block mt-10  rounded-2xl shadow-md overflow-x-auto">
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
                                courses.length == 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-6 text-center text-gray-500">
                                            No courses found
                                        </td>
                                    </tr>
                                ) : (
                                    courses.map((c) => {
                                        return (
                                            <tr key={c._id}
                                                className="border-t hover:bg-gray-50">
                                                <td className='p-4 font-medium'>{c.title} </td>
                                                <td className="p-4">{c.duration ? c.duration : "-"}</td>
                                                <td className="p-4">₹ {c.price}</td>
                                                <td className="p-4 text-center">
                                                    <Button
                                                        title={" Delete"} variant='danger' size='sm'
                                                        onClick={()=>{
                                                            deleteCourse(c._id)
                                                        }}
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

      <div className="md:hidden space-y-4">
  {courses.length === 0 ? (
    <p className="text-center text-gray-500">No courses found</p>
  ) : (
    courses.map((c) => (
      <div
        key={c._id}
        className="bg-white rounded-xl mt-10 shadow-md p-5 space-y-2"
      >
        <h3 className="text-lg font-semibold">{c.title}</h3>

        <p className="text-sm text-gray-600">
          Duration: <span className="font-medium">{c.duration || "-"}</span>
        </p>

        <p className="text-sm text-gray-600">
          Price: <span className="font-medium">₹{c.price}</span>
        </p>

        <div className="flex gap-2 pt-2">
          <Button title="Delete" size="sm" variant="danger" />
        </div>
      </div>
    ))
  )}
</div>


            </div>
<Toaster/>

        </div>
    )
}

export default AddCourses
