import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import AdminNavbar from '../../components/adminComponenets/AdminNavbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import toast, { Toaster } from 'react-hot-toast';
import { setPageTitle } from '../../Utils';

function AddCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setloading] = useState(false);
    const [imgFile, setImgFile] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        duration: "",
        imageUrl: " "
    });
    const [editingPriceId, setEditingPriceId] = useState(null);
    const [newPrice, setNewPrice] = useState("");

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem("JwtToken");
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/courses`, {
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
        const { title, description, price, duration, imageUrl } = form;

        if (!title || !duration || price === "" || price < 0 || !imageUrl) {
            toast.error("Please fill all required fields with valid values");
            return;
        }

        try {
            setloading(true);
            
            const token = localStorage.getItem("JwtToken");
             const imgForm = new FormData();
        imgForm.append("image",imgFile);

        const uploadRes  = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, imgForm, {
                headers: { Authorization: `Bearer ${token}` }
            });

             if (!uploadRes.data.success) {
      toast.error("Image upload failed");
      setloading(false);
      return;
    }
     const imageUrl = uploadRes.data.imageUrl;
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/courses`, {
                title,
                description,
                price: Number(price),
                duration,
                imageUrl,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                toast.success("Course added");
                setForm({ title: "", description: "", price: "", duration: "", imageUrl: "" });
                fetchCourses();
            }

        } catch (e) {
            console.error(e);
            toast.error("Course creation failed");
        } finally {
    setloading(false);
  }
    }

    const deleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            const token = localStorage.getItem("JwtToken");
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                toast.success("Course deleted");
                fetchCourses();
            } else {
                toast.error(res.data.message || "Delete failed");
            }
        } catch (e) {
            console.error(e);
            toast.error("Delete failed");
        }
    }

    const editPrice = (id, price) => {
        setEditingPriceId(id);
        setNewPrice(price.toString());
    }
    const savePrice = async (id) => {
        const priceNumber = Number(newPrice);
        if (isNaN(priceNumber) || priceNumber < 0) {
            toast.error("Invalid price");
            return;
        }

        try {
            const token = localStorage.getItem("JwtToken");
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/edit-course-price/${id}`, {
                price: priceNumber
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                toast.success("Price updated");
                setEditingPriceId(null);
                fetchCourses();
            } else {
                toast.error(res.data.message || "Failed to update price");
            }
        } catch (e) {
            console.error("Price update error:", e.response?.data || e.message);
            toast.error("Failed to update price");
        }
    }

    useEffect(() => {
        fetchCourses();
        setPageTitle({ title: "Admin Courses" });
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <AdminNavbar />
            <div className='max-w-7xl p-5 mx-auto space-y-5 md:p-10'>
                <h1 className='text-4xl font-bold text-center my-8 bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent'>
                    Manage Courses
                </h1>

                <motion.form
                    onSubmit={handleSubmit}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-4">

                    <Input
                        type="text"
                        placeholder="Course Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    <Input
                        type="text"
                        placeholder="Price (₹)"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />

                    <Input
                        type="text"
                        placeholder="Duration (eg. 3 Months)"
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    />
                    <div className='flex gap-1'>

                        <Input
                            type="file"
                            onChange={(e) => setImgFile(e.target.files[0])}
                            placeholder="Upload Image"
                        />
                        {loading ? (
                            <p className="text-gray-500">Uploading...</p>
                        ) : form.imageUrl ? (

                            <div className="flex items-center gap-2">

                                {imgFile && (
                                    <img
                                        src={URL.createObjectURL(imgFile)}
                                        alt="Preview"
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                )}
                            </div>
                        ) : (
                            " "
                        )}
                    </div>
                    <div className='md:col-span-4 flex md:flex-row flex-col gap-4 '>
                        <textarea
                            placeholder="Description (optional)"
                            className="w-full border rounded-xl p-3 border-gray-300 outline-0 focus:ring-1 focus:ring-blue-500"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <Button title="Add" type='submit' /></div>
                </motion.form>

                <div className="bg-white hidden md:block mt-10 rounded-2xl shadow-md overflow-x-auto">
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
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-6 text-center text-gray-500">No courses found</td>
                                </tr>
                            ) : courses.map((c) => (
                                <tr key={c._id} className="border-t hover:bg-gray-50">
                                    <td className='p-4 font-medium'>{c.title}</td>
                                    <td className="p-4">{c.duration || "-"}</td>
                                    <td className="p-4">
                                        {editingPriceId === c._id ? (
                                            <input
                                                type="text"
                                                value={newPrice}
                                                onChange={(e) => setNewPrice(e.target.value)}
                                                className="border rounded px-2 py-1 w-20"
                                            />
                                        ) : (
                                            `₹ ${c.price}`
                                        )}
                                    </td>
                                    <td className="p-4 text-center flex justify-center gap-2">
                                        {editingPriceId === c._id ? (
                                            <Button title="Save" size="sm" onClick={() => savePrice(c._id)} />
                                        ) : (
                                            <Button title="Edit Price" size="sm" onClick={() => editPrice(c._id, c.price)} />
                                        )}
                                        <Button title="Delete" variant='danger' size='sm' onClick={() => deleteCourse(c._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden space-y-4">
                    {courses.length === 0 ? (
                        <p className="text-center text-gray-500">No courses found</p>
                    ) : courses.map((c) => (
                        <div key={c._id} className="bg-white rounded-xl mt-10 shadow-md p-5 space-y-2">
                            <h3 className="text-lg font-semibold">{c.title}</h3>
                            <p className="text-sm text-gray-600">
                                Duration: <span className="font-medium">{c.duration || "-"}</span>
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                Price:{
                                    editingPriceId === c._id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={newPrice}
                                                onChange={(e) => setNewPrice(e.target.value)}
                                                className="border rounded px-2 py-1 w-20"
                                            />
                                            <Button
                                                title="Save"
                                                size="sm"
                                                onClick={() => savePrice(c._id)}
                                            />
                                            <Button
                                                title="Cancel"
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => setEditingPriceId(null)}
                                            />
                                        </>
                                    )
                                        : (<><span className="font-medium">₹{c.price}</span>
                                            <Button
                                                title="Edit Price"
                                                size="sm"
                                                onClick={() => editPrice(c._id, c.price)}
                                            /></>)
                                }
                            </p>
                            <div className="flex gap-2 pt-2">
                                <Button title="Delete" size="sm" variant="danger" onClick={() => deleteCourse(c._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default AddCourses;
