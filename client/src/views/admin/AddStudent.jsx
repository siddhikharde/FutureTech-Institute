import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import AdminNavbar from "../../components/adminComponenets/AdminNavbar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

function AddStudent() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    enrolledCourses: [],
    paidFee: "",
  });

  const loadCourses = async () => {
    try {
      const token = localStorage.getItem("JwtToken");
      const res = await axios.get("http://localhost:8080/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

 
  const toggleCourse = (courseId) => {
    setForm((prev) => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.includes(courseId)
        ? prev.enrolledCourses.filter((id) => id !== courseId)
        : [...prev.enrolledCourses, courseId],
    }));
  };

  const selectedCourses = courses.filter((c) =>
    form.enrolledCourses.includes(c._id)
  );

  const totalFee = selectedCourses.reduce(
    (sum, c) => sum + (c.price || 0),
    0
  );

  const remainingFee =
    totalFee - Number(form.paidFee || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      phone,
      parentName,
      parentPhone,
      enrolledCourses,
      paidFee,
    } = form;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !parentName ||
      !parentPhone ||
      enrolledCourses.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("JwtToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "http://localhost:8080/students",
        {
          name,
          email,
          password,
          phone,
          parent: {
            name: parentName,
            phone: parentPhone,
          },
          enrolledCourses,
          paidFee: Number(paidFee),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Student added successfully");
        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
          parentName: "",
          parentPhone: "",
          enrolledCourses: [],
          paidFee: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Server error"
      );
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-8 bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent">
          Add Student
        </h1>

        <motion.form
          onSubmit={handleSubmit}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg"
        >

          <div className="space-y-4">
            <Input
              placeholder="Student Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <Input
              placeholder="Student Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <Input
              placeholder="Parent Name"
              value={form.parentName}
              onChange={(e) =>
                setForm({
                  ...form,
                  parentName: e.target.value,
                })
              }
            />

            <Input
              placeholder="Parent Phone"
              value={form.parentPhone}
              onChange={(e) =>
                setForm({
                  ...form,
                  parentPhone: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-4">

            <div>
              <p className="font-semibold mb-2">
                Enroll Courses
              </p>

              <div className="border rounded-xl p-3 max-h-48 overflow-y-auto space-y-2">
                {courses.map((c) => (
                  <label
                    key={c._id}
                    className="flex justify-between items-center text-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.enrolledCourses.includes(
                          c._id
                        )}
                        onChange={() =>
                          toggleCourse(c._id)
                        }
                      />
                      <span>{c.title}</span>
                    </div>
                    <span className="text-gray-500">
                      ₹{c.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Total Fee</span>
                <span>₹ {totalFee}</span>
              </div>

              <Input
                type="number"
                placeholder="Paid Fee"
                value={form.paidFee}
                onChange={(e) =>
                  setForm({
                    ...form,
                    paidFee: e.target.value,
                  })
                }
              />

              <div className="flex justify-between text-red-600 font-semibold">
                <span>Remaining Fee</span>
                <span>₹ {remainingFee}</span>
              </div>
            </div>

            <Button
              type="submit"
              title="Add Student"
              size="lg"
              className="w-full"
            />
          </div>
        </motion.form>
      </div>

      <Toaster />
    </div>
  );
}

export default AddStudent;
