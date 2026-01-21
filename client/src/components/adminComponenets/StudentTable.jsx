import axios from "axios";
import { setDragLock } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from '../../components/Input'
import StudentsCrad from "./StudentsCrad";

function StudentTable() {
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
     const limit = 10;

    const token = localStorage.getItem("JwtToken");
    const loadStudents = async (pageNo=1, searchText=search) => {
        try {
            const response = await axios.get(`http://localhost:8080/students?page=${pageNo}&limit=${limit}&search=${searchText}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                setStudents(response.data.data);
      setPage(response.data.pagination.currentPage);
      setTotalPages(response.data.pagination.totalPages);
            }
        } catch (e) {
            toast.error("Failed to load courses", { id: "failiour" });
        }
    }

    const enrollCourse = async ({ studentId, courseId }) => {
        try {
            const response = await axios.post("http://localhost:8080/enroll-course", { studentId, courseId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )
            if (response.data.success) {
                toast.success("Course enrolled");
                loadStudents();
            }
        } catch (e) {
            toast.error("Enrollment failed");
        }
    }

    const loadCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/courses", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                setCourse(response.data.data);
                toast.success("Courses loaded", { id: "coursesuccess" });

            }
        } catch (e) {
            toast.error("Failed to load courses");
        }
    }

    useEffect(() => {
        loadStudents(page);
        loadCourses();
    }, [])

    return (
        <>
         <div className="px-5 mt-8 flex flex-col gap-5">
             <Input type={"text"} placeholder={"Search by name or email..."} value={search}
             onChange={(e)=>{
                setSearch(e.target.value);
                loadStudents(1, e.target.value)
             }}/>
                <h2 className="text-2xl text-blue-950 text-center font-bold mb-4">Students List</h2>


            </div>
        <div className="md:block hidden h-[400px] overflow-y-auto scroll-auto overflow-x-auto bg-white rounded-xl shadow-md p-6">
           
            <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Enrolled Courses</th>
                        <th className="p-3 border">Total Fee</th>
                        <th className="p-3 border">Remaining Fee</th>
                        <th className="p-3 border">Enroll</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((s) => {
                            const pendingFee = (s.fee?.total ||0) - (s.fee?.paid || 0);
                            return (
                                <tr key={s._id} className="text-center">
                                    <td className="p-2 border">{s.name}</td>
                                    <td className="p-2 border">{s.email}</td>
                                    <td className="p-2 border">{
                                        s.enrolledCourses.length > 0 ?
                                            (s.enrolledCourses.map((c) => c.title).join(", ")
                                            ) : "None"
                                    }</td>
                                    <td className="p-2 border">{s.fee.total}</td>
                                    <td className="p-2 border">{pendingFee}</td>

                                    <td className="p-2 border">
                                        <select className="border p-1 rounded"
                                            onChange={(e) => {
                                                enrollCourse({
                                                    studentId: s._id,
                                                    courseId: e.target.value
                                                })
                                            }}
                                            defaultValue="">
                                            <option value="" disabled>
                                                Select Course
                                            </option>
                                            {
                                                course.map((c) => (
                                                    <option key={c._id} value={c._id}>{c.title}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>


            </table>
          
        </div>

        <div className="">
            <div className="md:hidden space-y-4 h-[500px] p-5 overflow-y-auto scroll-auto">
  {students.map((s) => {
    const pendingFee = (s.fee?.total || 0) - (s.fee?.paid || 0);

    return (
      <div key={s._id} className="bg-white rounded-xl shadow-2xl p-4">
        <h3 className="font-semibold text-lg">{s.name}</h3>
        <p className="text-sm text-gray-500">{s.email}</p>

        <div className="mt-2 text-sm space-y-2">
          <p>Courses: {s.enrolledCourses.length ? s.enrolledCourses.map(c => c.title).join(", ") : "None"}</p>
          <p>Total Fee: ₹{s.fee?.total}</p>
          <p className="text-red-500">Remaining: ₹{pendingFee}</p>
        </div>

        <select
          className="w-full border p-2 rounded mt-3"
          defaultValue=""
          onChange={(e) =>
            enrollCourse({
              studentId: s._id,
              courseId: e.target.value
            })
          }
        >
          <option value="" disabled>Select Course</option>
          {course.map((c) => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </select>
      </div>
    );
  })}
</div>
        </div>
     <div className="flex justify-center gap-2 mt-6 flex-wrap mb-10">
  <button
    disabled={page === 1}
    onClick={() => loadStudents(page - 1)}
    className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => loadStudents(i + 1)}
      className={`px-3 py-1 rounded cursor-pointer ${
        page === i + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={page === totalPages}
    onClick={() => loadStudents(page + 1)}
    className="px-3 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

</>
    );
}

export default StudentTable;
