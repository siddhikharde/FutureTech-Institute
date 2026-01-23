import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router'
import Button from '../../components/Button';
import Input from '../../components/Input';
import AdminNavbar from '../../components/adminComponenets/AdminNavbar';

function StudentDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("JwtToken")
  const [courses, setCourses] = useState([]);
  const [amount, setAmount] = useState("");
  const [student, setStudent] = useState(null)
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: ""
  })

  const fetchCourses = async () => {

    const res = await axios.get("http://localhost:8080/courses", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.data.success) {
      setCourses(res.data.data);
    }
  };
  const addPayment = async () => {
    if (!amount) return toast.error("Enter amount.")
    const res = await axios.post("http://localhost:8080/payment",
      { studentId: id, amount },
      { headers: { Authorization: `Bearer ${token}` } });
    if (res.data.success) {
      toast.success("Payment added");
      setAmount("");
      fetchStudent();
    }
    else {
      toast.error("Fail")
    }

  }
  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/student/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        setStudent(res.data.data);
        const student = res.data.data;
        setEditForm({
          name: student.name,
          email: student.email,
          phone: student.phone,
          parentName: student.parent?.name || "",
          parentPhone: student.parent?.phone || "",

        })
      }
    } catch {
      toast.error("Failed to load student", { id: "succ" });
    }
  }
  const enrollCourse = async (courseId) => {
    await axios.post("http://localhost:8080/enroll-course",
      { studentId: id, courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Course enrolled");
    fetchStudent();
  }

  const removeCourse = async (studentId, courseId) => {
    if (!window.confirm("Are you sure you want to remove this course?")) return;
    try {

      const res = await axios.delete("http://localhost:8080/remove-course",
        {
          headers: { Authorization: `Bearer ${token}` }
          ,
          data: { studentId, courseId }
        }
      );
      if (res.data.success) {
        toast.success("Course removed");
        fetchStudent();
      }
    } catch {
      toast.error("Failed to remove course");
    }
  }
  const updateStudent = async () => {
  try {
    const res = await axios.put(
      `http://localhost:8080/student/${id}`,
      {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        parent: {
          name: editForm.parentName,
          phone: editForm.parentPhone,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      toast.success("Student updated");
      setEditMode(false);
      fetchStudent();
    }
  } catch (e) {
    toast.error("Update failed");
  }
};


  useEffect(() => {
    fetchCourses();
    fetchStudent();
  }, [])

  if (!student) return null;

  const pending = (student.fee.total || 0) - (student.fee.paid || 0);
  return (
    <>
      <AdminNavbar />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{student.name}</h1>
          <Button
            title={editMode ? "Cancel" : "Edit"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
          />
        </div>
        {editMode && (
  <div className="bg-white p-6 rounded-xl shadow space-y-4">
    <h3 className="font-semibold text-lg">Edit Student</h3>

    <Input
      placeholder="Name"
      value={editForm.name}
      onChange={(e) =>
        setEditForm({ ...editForm, name: e.target.value })
      }
    />

    <Input
      placeholder="Email"
      value={editForm.email}
      onChange={(e) =>
        setEditForm({ ...editForm, email: e.target.value })
      }
    />

    <Input
      placeholder="Phone"
      value={editForm.phone}
      onChange={(e) =>
        setEditForm({ ...editForm, phone: e.target.value })
      }
    />

    <Input
      placeholder="Parent Name"
      value={editForm.parentName}
      onChange={(e) =>
        setEditForm({ ...editForm, parentName: e.target.value })
      }
    />

    <Input
      placeholder="Parent Phone"
      value={editForm.parentPhone}
      onChange={(e) =>
        setEditForm({ ...editForm, parentPhone: e.target.value })
      }
    />

    <Button title="Save Changes" onClick={updateStudent} />
  </div>
)}

        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <p>Total Fee: ₹{student.fee.total}</p>
          <p>Paid: ₹{student.fee.paid}</p>
          <p className="text-red-600 font-bold">Pending: ₹{pending}</p>

          <div className="flex gap-3">
            <Input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < 0) return;
                if (pending < value) {
                  toast.error(`Max allowed: ₹${pending}`, { id: "ss" })
                }
                setAmount(value)
              }}
              placeholder="Add payment"
            />
            <Button title="Add Payment" size='sm' onClick={addPayment} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Enrolled Courses</h3>
          <div className="flex flex-wrap gap-2">
            {student.enrolledCourses.map((c) => (
              <div key={c._id}
                className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                <span

                  className=" text-sm"
                >
                  {c.title}
                </span>
                <button
                  onClick={() => removeCourse(student._id, c._id)}
                  className="text-red-400 hover:text-red-600 text-sm cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

            ))}
          </div>
          <select
            className="mt-4 border p-2 rounded w-full focus:ring-1 ring-blue-500 outline-0"
            defaultValue=""
            onChange={(e) => enrollCourse(e.target.value)}
          >
            <option disabled value="">Enroll new course</option>
            {courses.map((c) => {
              const isEnrolled = student.enrolledCourses.some(
                (ec) => ec._id === c._id
              );

              return (
                <option
                  key={c._id}
                  value={c._id}
                  disabled={isEnrolled}
                >
                  {c.title} - ₹{c.price}
                  {isEnrolled ? " (Already Enrolled)" : ""}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  )
}

export default StudentDetail
