import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminNavbar from "../../components/adminComponenets/AdminNavbar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { setPageTitle } from "../../Utils";

function AddLecture() {
    const [courses, setCourses] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        videoUrl: "",
        courseId: ""
    });

    useEffect(() => {
        setPageTitle({ title: "Add Lecture" });
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const token = localStorage.getItem("JwtToken");

            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/courses`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.success) {
                setCourses(res.data.data);
            } else {
                toast.error(res.data.message || "Failed to load courses");
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to load courses");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.courseId) {
            toast.error("Please select a course");
            return;
        }

        if (!form.title.trim()) {
            toast.error("Please enter lecture title");
            return;
        }

        if (!form.videoUrl.trim()) {
            toast.error("Please enter video URL");
            return;
        }

        try {
            const token = localStorage.getItem("JwtToken");

            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/lectures`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.success) {
                toast.success("Lecture added successfully");

                setForm({
                    title: "",
                    description: "",
                    videoUrl: "",
                    courseId: ""
                });
            } else {
                toast.error(res.data.message || "Failed to add lecture");
            }

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to add lecture"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />

            <div className="max-w-3xl mx-auto px-4 py-10">

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Add Lecture
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-md p-8 space-y-5"
                >

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Course
                        </label>

                        <select
                            name="courseId"
                            value={form.courseId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                Select Course
                            </option>

                            {courses.map((course) => (
                                <option
                                    key={course._id}
                                    value={course._id}
                                >
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input
                        type="text"
                        name="title"
                        placeholder="Lecture Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Enter lecture description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Input
                        type="url"
                        name="videoUrl"
                        placeholder="Paste YouTube Video URL"
                        value={form.videoUrl}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        title="Add Lecture"
                        type="submit"
                        size="lg"
                    />

                </form>
            </div>

            <Toaster />
        </div>
    );
}

export default AddLecture;