import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      toast.error("Please fill all fields", { id: "empty" });
      return;
    }

    const storedUser = localStorage.getItem("UserData");

    if (!storedUser) {
      toast.error("No account found, please Register", { id: "nouser" });
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (
      parsedUser.email !== email ||
      parsedUser.password !== password
    ) {
      toast.error("Invalid email or password", { id: "invalid" });
      return;
    }

    toast.success("Login successful.", { id: "success" });

    setForm({ email: "", password: "" });

    setTimeout(() => navigate("/"), 1200);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };


  return (
    <div className="bg-[#F8FAFC] min-h-screen">
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

            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                size="lg"
                title="Login"
                className="w-full"
              />
            </div>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <span
              className="text-[#38BDF8] cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
