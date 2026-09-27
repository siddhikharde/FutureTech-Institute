import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function StudentLecture() {
    const { lectureId } = useParams();
    const navigate = useNavigate();

    const [lecture, setLecture] = useState(null);
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLecture();
    }, [lectureId]);

    const loadLecture = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("JwtToken");

            const lectureRes = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/lecture/${lectureId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!lectureRes.data.success) {
                toast.error(
                    lectureRes.data.message || "Failed to load lecture"
                );
                return;
            }

            const currentLecture = lectureRes.data.data;

            setLecture(currentLecture);

            const courseId = currentLecture.course;

            const lecturesRes = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/lectures/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (lecturesRes.data.success) {
                setLectures(lecturesRes.data.data);
            } else {
                toast.error(
                    lecturesRes.data.message ||
                    "Failed to load course lectures"
                );
            }

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load lecture"
            );
        } finally {
            setLoading(false);
        }
    };

    const getYoutubeEmbedUrl = (url) => {
        try {
            const videoUrl = new URL(url);

            if (videoUrl.hostname.includes("youtu.be")) {
                const videoId = videoUrl.pathname.substring(1);

                return `https://www.youtube.com/embed/${videoId}`;
            }

            if (videoUrl.hostname.includes("youtube.com")) {
                const videoId = videoUrl.searchParams.get("v");

                if (videoId) {
                    return `https://www.youtube.com/embed/${videoId}`;
                }
            }

            return url;

        } catch (error) {
            return url;
        }
    };

    const currentIndex = lectures.findIndex(
        (item) => item._id === lectureId
    );

    const previousLecture =
        currentIndex > 0
            ? lectures[currentIndex - 1]
            : null;

    const nextLecture =
        currentIndex >= 0 && currentIndex < lectures.length - 1
            ? lectures[currentIndex + 1]
            : null;

    const handlePrevious = () => {
        if (previousLecture) {
            navigate(`/student/lecture/${previousLecture._id}`);
        }
    };

    const handleNext = () => {
        if (nextLecture) {
            navigate(`/student/lecture/${nextLecture._id}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] text-white">
                <Navbar />

                <div className="p-10 text-center">
                    <p className="text-gray-400">
                        Loading lecture...
                    </p>
                </div>
            </div>
        );
    }

    if (!lecture) {
        return (
            <div className="min-h-screen bg-[#020617] text-white">
                <Navbar />

                <div className="p-10 text-center">
                    <p className="text-gray-400">
                        Lecture not found
                    </p>
                </div>

                <Toaster />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white">

            <Navbar />

            <div className="max-w-5xl mx-auto px-5 py-10">

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-400 hover:text-blue-300"
                >
                    ← Back to Lectures
                </button>

                <div className="bg-[#0F172A] border border-gray-700 rounded-2xl p-6">

                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-gray-400">
                                Lecture{" "}
                                {currentIndex >= 0
                                    ? currentIndex + 1
                                    : ""}
                                {lectures.length > 0
                                    ? ` of ${lectures.length}`
                                    : ""}
                            </p>

                            <h1 className="text-3xl font-bold mt-1">
                                {lecture.title}
                            </h1>
                        </div>
                    </div>

                    {lecture.description && (
                        <p className="text-gray-400 mb-8">
                            {lecture.description}
                        </p>
                    )}

                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">

                        <iframe
                            src={getYoutubeEmbedUrl(lecture.videoUrl)}
                            title={lecture.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                    </div>

                    <div className="flex justify-between items-center gap-4 mt-8">

                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={!previousLecture}
                            className={`px-5 py-3 rounded-lg font-semibold ${
                                previousLecture
                                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            ← Previous Lecture
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!nextLecture}
                            className={`px-5 py-3 rounded-lg font-semibold ${
                                nextLecture
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Next Lecture →
                        </button>

                    </div>

                </div>

            </div>

            <Toaster />

        </div>
    );
}

export default StudentLecture;
