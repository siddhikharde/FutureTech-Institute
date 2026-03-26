import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle } from "../Utils";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../components/Footer";
import { Eye, EyeOff } from "lucide-react";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle({ title: "Login" });
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        form
      );

      if (response.data.success) {
        toast.success("Login Successful");

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
      } else {
        toast.error("Invalid email or password");
      }

    } catch (e) {
      toast.error(e.response?.data?.message || "Server error");
    }
  };

  // 🔥 SAME AS HOME
  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen overflow-hidden">

      <Navbar />

      {/* 🔥 Floating background */}
      <div className="relative">

        <motion.div
          className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 top-10 left-10"
          variants={floating}
          animate="animate"
        />

        <motion.div
          className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-10 right-10"
          variants={floating}
          animate="animate"
        />

        {/* 🔥 Login Card */}
        <motion.div
          className="flex items-center justify-center py-24 px-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md">

            <h2 className="text-3xl font-bold text-center mb-6">
              Login to <span className="text-blue-400">FutureTech</span>
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <Button
                type="submit"
                size="lg"
                title="Login"
                className="w-full"
              />
            </form>
          </div>
        </motion.div>

      </div>

      <Toaster />
      <Footer />
    </div>
  );
}

export default Login;