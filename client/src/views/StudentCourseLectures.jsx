import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

function StudentCourseLectures() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLectures();
    }, [courseId]);

    const loadLectures = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("JwtToken");

            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/lectures/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.success) {
                setLectures(res.data.data);
            } else {
                toast.error(
                    res.data.message || "Failed to load lectures"
                );
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load lectures");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white">

            <Navbar />

            <div className="max-w-5xl mx-auto px-5 py-10">

                <button
                    type="button"
                    onClick={() => navigate("/student-dashboard")}
                    className="mb-6 text-blue-400 hover:text-blue-300"
                >
                    ← Back to Dashboard
                </button>

                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Course Lectures
                </h1>

                <p className="text-gray-400 mb-8">
                    Select a lecture to watch the video.
                </p>

                {loading ? (
                    <div className="bg-[#0F172A] border border-gray-700 rounded-2xl p-8 text-center">
                        <p className="text-gray-400">
                            Loading lectures...
                        </p>
                    </div>
                ) : lectures.length === 0 ? (
                    <div className="bg-[#0F172A] border border-gray-700 rounded-2xl p-8 text-center">
                        <h2 className="text-xl font-semibold">
                            No lectures available
                        </h2>

                        <p className="text-gray-400 mt-2">
                            Lectures for this course have not been added yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">

                        {lectures.map((lecture, index) => (
                            <div
                                key={lecture._id}
                                className="bg-[#0F172A] border border-gray-700 rounded-2xl p-5"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    <div className="flex items-start gap-4">

                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {lecture.title}
                                            </h2>

                                            {lecture.description && (
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {lecture.description}
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/student/lecture/${lecture._id}`
                                            )
                                        }
                                        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
                                    >
                                        Watch Lecture
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>

            <Toaster />

        </div>
    );
}

export default StudentCourseLectures;