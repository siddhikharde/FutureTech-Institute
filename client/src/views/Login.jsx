import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle } from '../Utils'
import { motion } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate(); useEffect(() => {
    setPageTitle({ title: "Login" });
    window.scrollTo(0, 0);
  }, [])

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      toast.error("Please fill all fields", { id: "empty" });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, form);
      if (response.data.success) {
        toast.success(response.data.message || "Login Successful", { id: "loginsuccess", duration: 1000 });
        setForm({
          email: "",
          password: ""
        })

        const { jwt, data } = response.data;
        localStorage.setItem("JwtToken", jwt);
        localStorage.setItem("userData", JSON.stringify(data));

        setTimeout(() => {
          if (data.role === "admin") {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 1000);
      }
      else {
        toast.error(response.data.message || "Invalid email or password..",{id:"invalid"}) 
      }
    } catch (e) {
      toast.error(
        e.response?.data?.message || "Server error. Try again.", {id:"error"}
      );
    }

  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };


  return (
    <div className="bg-gradient-to-br from-[#0F172A] via-[#143A8A] to-[#0F172A] min-h-screen ">
      <Navbar />

      <motion.div
        className="flex items-center justify-center py-20 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6 text-center">
            Login to FutureTech
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
<div className="relative">
              <Input
                type={showPassword ? "text" : "password"} // 👈 toggle type
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                size="lg"
                title="Login"
                className="w-full"
              />
            </div>
          </form>
        </div>
        <Toaster />
      </motion.div>
      <Footer />
    </div>
  );
}

export default Login;
