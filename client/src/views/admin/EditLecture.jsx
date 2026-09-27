import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminNavbar from "../../components/adminComponenets/AdminNavbar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { setPageTitle } from "../../Utils";

function EditLecture() {
    const { lectureId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        videoUrl: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setPageTitle({ title: "Edit Lecture" });
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
                const lecture = res.data.data;

                setForm({
                    title: lecture.title || "",
                    description: lecture.description || "",
                    videoUrl: lecture.videoUrl || ""
                });
            } else {
                toast.error(res.data.message || "Failed to load lecture");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load lecture");
        } finally {
            setLoading(false);
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

        if (!form.title.trim()) {
            toast.error("Please enter lecture title");
            return;
        }

        if (!form.videoUrl.trim()) {
            toast.error("Please enter video URL");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("JwtToken");

            const res = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/lectures/${lectureId}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.success) {
                toast.success("Lecture updated successfully");

                setTimeout(() => {
                    navigate(-1);
                }, 800);
            } else {
                toast.error(res.data.message || "Failed to update lecture");
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update lecture"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <AdminNavbar />

                <div className="p-10 text-center">
                    <p className="text-gray-500 text-lg">
                        Loading lecture...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />

            <div className="max-w-3xl mx-auto px-4 py-10">

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Edit Lecture
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-md p-8 space-y-5"
                >

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

                    <div className="flex gap-4">

                        <Button
                            title={saving ? "Updating..." : "Update Lecture"}
                            type="submit"
                            size="lg"
                            disabled={saving}
                        />

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>

            <Toaster />
        </div>
    );
}

export default EditLecture;