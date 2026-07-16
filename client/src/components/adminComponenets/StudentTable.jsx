import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import Button from "../Button";
import { useNavigate } from "react-router";

function StudentTable() {
  const navigate=useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const limit = 6;

  const token = localStorage.getItem("JwtToken");

  const loadStudents = async (pageNo = 1, searchText = search) => {
    try {
     const response = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/students`,
  {
    params: {
      page: pageNo,
      limit,
      search: searchText,
      courseId: selectedCourse,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
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
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) setCourses(response.data.data);
    } catch {
      toast.error("Failed to load courses");
    }
  };
 useEffect(() => {
    loadStudents();
    loadCourses(1);
  }, []);

  useEffect(() => {
  loadStudents(1);
}, [selectedCourse]);
  return (
    <div className="max-w-7xl mx-auto md:px-4 ">
      <div className="flex flex-col bg-white mx-0 rounded-2xl p-5 shadow-md py-7 md:flex-row md:items-center md:justify-around gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
          Students
        </h2>
       <div className="flex flex-col md:flex-row gap-3 w-full md:w-[75%]">
          <Input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              loadStudents(1, e.target.value);
            }}
          />
          <select
  value={selectedCourse}
  onChange={(e) => setSelectedCourse(e.target.value)}
  className="border rounded-lg px-4 py-3 bg-white border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-blue-500 outline-none md:w-64"
>
  <option value="">All Courses</option>

  {courses.map((course) => (
    <option key={course._id} value={course._id}>
      {course.title}
    </option>
  ))}
</select>
        </div>
      </div>

  
      <div className="hidden md:block my-10 bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-white  rounded-2xl shadow-md overflow-x-aut">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Courses</th>
                <th className="p-4">Total Fee</th>
                <th className="p-4">Remaining</th>
                <th className="p-4">Action</th>
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
                    <td className="p-3 text-red-400 font-semibold">₹{pending}</td>
                  <td className="p-3">
  <Button
    onClick={() => navigate(`/student-detail/${s._id}`)} title={"View"} size="sm"
/>
    

</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>


<div className="md:hidden space-y-4">
  {students.length === 0 ? (
    <p className="text-center text-gray-500">No students found</p>
  ) : (
    students.map((s) => {
      const pending = (s.fee?.total || 0) - (s.fee?.paid || 0);

      return (
        <div
          key={s._id}
          className="bg-white rounded-2xl shadow-md p-4 space-y-3 border border-gray-200"
        >
          <div className="flex justify-between mb-1 items-center">
            <div className="flex flex-col">
              <span className="text-md font-semibold text-gray-900">{s.name}</span>
              <span className="text-[12px] text-gray-500 truncate max-w-[200px]">{s.email}</span>
            </div>
            <Button
              onClick={() => navigate(`/student-detail/${s._id}`)}
              title="View"
              size="sm"
            />
          </div>

          <div className="mb-0">
            <span className="text-sm font-medium text-gray-600">Courses: </span>
            <span className="text-sm text-gray-800">
              {s.enrolledCourses?.length
                ? s.enrolledCourses.map((c) => c.title).join(", ")
                : "None"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-600">Total Fee: </span>
              <span className="text-sm text-gray-800">₹{s.fee?.total || 0}</span>
            </div>
            <div className="text-right">
              <span
                className={`text-sm font-semibold ${
                  pending === 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{pending}
              </span>
              <p className="text-xs text-gray-400">pending</p>
            </div>
          </div>
        </div>
      );
    })
  )}
</div>


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
