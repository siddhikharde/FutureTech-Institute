import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../../components/Input";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 6;

  const token = localStorage.getItem("JwtToken");

  const loadStudents = async (pageNo = 1, searchText = search) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/students?page=${pageNo}&limit=${limit}&search=${searchText}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setStudents(response.data.data);
        setPage(response.data.pagination.currentPage);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (e) {
      toast.error("Failed to load students");
    }
  };

  const loadCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) setCourses(response.data.data);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const enrollCourse = async ({ studentId, courseId }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/enroll-course",
        { studentId, courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Course enrolled successfully");
        loadStudents(page);
      }
    } catch {
      toast.error("Enrollment failed");
    }
  };

  useEffect(() => {
    loadStudents(page);
    loadCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-around gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
          Students
        </h2>
        <div className="w-full md:w-[75%]">
          <Input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              loadStudents(1, e.target.value);
            }}
          />
        </div>
      </div>

  
      <div className="hidden md:block mt-10 bg-white shadow-md rounded-2xl overflow-hidden">
        <div className="bg-white  rounded-2xl shadow-md overflow-x-aut">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Courses</th>
                <th className="p-4">Total Fee</th>
                <th className="p-4">Remaining</th>
                <th className="p-4">Enroll</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const pending = (s.fee?.total || 0) - (s.fee?.paid || 0);
                return (
                  <tr
                    key={s._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">
                      {s.enrolledCourses?.length
                        ? s.enrolledCourses.map((c) => c.title).join(", ")
                        : "None"}
                    </td>
                    <td className="p-3">₹{s.fee?.total || 0}</td>
                    <td className="p-3 text-red-600 font-semibold">₹{pending}</td>
                    <td className="p-3">
                      <select
                        className="border border-gray-300 rounded-lg p-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue=""
                        onChange={(e) =>
                          enrollCourse({
                            studentId: s._id,
                            courseId: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select Course
                        </option>
                        {courses.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>


<div className="md:hidden max-w-7xl mx-auto p-4 space-y-4">
  {students.map((s) => {
    const pending = (s.fee?.total || 0) - (s.fee?.paid || 0);
    return (
      <div
        key={s._id}
        className="bg-gradient-to-r from-[#0F172A]/5 via-[#143a8a]/5 to-[#0F172A]/5 shadow-lg rounded-3xl p-5 border border-gray-200 flex flex-col gap-3"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-bold text-[#0F172A]">{s.name}</h3>
          <p className="text-gray-500 text-sm md:text-base">{s.email}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-semibold text-gray-700">Courses:</span>
            {s.enrolledCourses?.length ? (
              <div className="flex flex-wrap gap-1 items-center overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
                {s.enrolledCourses.map((c) => (
                  <span
                    key={c._id}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs whitespace-nowrap"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400">None</span>
            )}
          </div>

          <div className="flex justify-between text-sm md:text-base">
            <p>Total Fee: <span className="font-semibold">₹{s.fee?.total || 0}</span></p>
            <p className="text-red-600 font-semibold">Remaining: ₹{pending}</p>
          </div>
        </div>

        <div>
          <select
            className="w-full border border-gray-300 rounded-xl p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            defaultValue=""
            onChange={(e) =>
              enrollCourse({ studentId: s._id, courseId: e.target.value })
            }
          >
            <option value="" disabled>
              Enroll in Course
            </option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title} - ₹{c.price || 0}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  })}
</div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap mb-10">
        <button
          disabled={page === 1}
          onClick={() => loadStudents(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => loadStudents(i + 1)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              page === i + 1
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => loadStudents(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentTable;
