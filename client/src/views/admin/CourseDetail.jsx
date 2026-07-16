import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import AdminNavbar from "../../components/adminComponenets/AdminNavbar";
import { setPageTitle } from "../../Utils";

function CourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);

  const loadCourse = async () => {
    try {
      const token = localStorage.getItem("JwtToken");

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/course/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setCourse(res.data.data.course);
        setStudents(res.data.data.students);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      toast.error("Failed to load course");
    }
  };

  useEffect(() => {
    loadCourse();
    setPageTitle({ title: "Course Detail" });
  }, []);

  if (!course) {
    return (
      <>
        <AdminNavbar />
        <div className="p-10 text-center text-2xl">
          Loading...
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto p-6">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-[350px] object-cover"
          />

          <div className="p-8">

            <h1 className="text-4xl font-bold">
              {course.title}
            </h1>

            <p className="text-gray-600 mt-5">
              {course.description}
            </p>

            <div className="grid md:grid-cols-3 gap-5 mt-8">

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-gray-500">
                  Price
                </p>

                <h2 className="text-2xl font-bold text-blue-700">
                  ₹{course.price}
                </h2>
              </div>

              <div className="bg-green-50 rounded-xl p-5">
                <p className="text-gray-500">
                  Duration
                </p>

                <h2 className="text-2xl font-bold text-green-700">
                  {course.duration}
                </h2>
              </div>

              <div className="bg-purple-50 rounded-xl p-5">
                <p className="text-gray-500">
                  Students
                </p>

                <h2 className="text-2xl font-bold text-purple-700">
                  {students.length}
                </h2>
              </div>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Enrolled Students
          </h2>

          {
            students.length === 0 ? (
              <p>No students enrolled.</p>
            ) : (
              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="p-3 text-left">
                      Name
                    </th>

                    <th className="p-3 text-left">
                      Email
                    </th>

                    <th className="p-3 text-left">
                      Phone
                    </th>

                  </tr>
                </thead>
                <tbody>

                  {
                    students.map((student) => (

                      <tr
                        key={student._id}
                        className="border-b"
                      >

                        <td className="p-3">
                          {student.name}
                        </td>

                        <td className="p-3">
                          {student.email}
                        </td>

                        <td className="p-3">
                          {student.phone}
                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>
            )
          }

        </div>

      </div>
    </div>
  );
}

export default CourseDetail;