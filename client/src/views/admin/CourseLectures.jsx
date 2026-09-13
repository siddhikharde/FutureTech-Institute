import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminNavbar from "../../components/adminComponenets/AdminNavbar";
import Button from "../../components/Button";
import { setPageTitle } from "../../Utils";

function CourseLectures() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageTitle({ title: "Course Lectures" });
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setLectures(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to load lectures");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load lectures");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lectureId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lecture?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("JwtToken");

      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/lectures/${lectureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Lecture deleted successfully");

        setLectures((prev) =>
          prev.filter((lecture) => lecture._id !== lectureId)
        );
      } else {
        toast.error(res.data.message || "Failed to delete lecture");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete lecture");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Course Lectures
            </h1>

            <p className="text-gray-500 mt-2">
              Manage lectures for this course
            </p>
          </div>

          <Button
            title="Add Lecture"
            type="button"
            size="lg"
            onClick={() =>
              navigate(`/admin/add-lecture?courseId=${courseId}`)
            }
          />
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">Loading lectures...</p>
          </div>
        ) : lectures.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No lectures found
            </h2>

            <p className="text-gray-500 mt-2">
              This course does not have any lectures yet.
            </p>

            <div className="mt-5 flex justify-center">
              <Button
                title="Add First Lecture"
                type="button"
                size="lg"
                onClick={() =>
                  navigate(`/admin/add-lecture?courseId=${courseId}`)
                }
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {lectures.map((lecture, index) => (
              <div
                key={lecture._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>

                      <h2 className="text-xl font-semibold text-gray-800">
                        {lecture.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 mt-4">
                      {lecture.description}
                    </p>

                    {lecture.videoUrl && (
                      <a
                        href={lecture.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 text-blue-600 hover:underline"
                      >
                        View Video
                      </a>
                    )}
                  </div>

                  <div className="flex gap-3 items-start">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/admin/edit-lecture/${lecture._id}`)
                      }
                      className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(lecture._id)}
                      className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
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

export default CourseLectures;
