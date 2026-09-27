import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function StudentLecture() {
    const { lectureId } = useParams();
    const navigate = useNavigate();

    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLecture();
    }, [lectureId]);

    const loadLecture = async () => {
        try {
            const token = localStorage.getItem("JwtToken");

            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/lecture/${lectureId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.success) {
                setLecture(res.data.data);
            } else {
                toast.error(
                    res.data.message || "Failed to load lecture"
                );
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to load lecture");
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

                    <h1 className="text-3xl font-bold mb-3">
                        {lecture.title}
                    </h1>

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

                </div>

            </div>

            <Toaster />

        </div>
    );
}

export default StudentLecture;