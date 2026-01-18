import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Input from "../components/Input";

function Register() {
const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
            Create Account
          </h2>

          <form className="gap-4 flex flex-col" >
            <Input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              
            />
             <  Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
             <Input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />

         <div className="flex items-center justify-center">
            <Button type="submit" size="lg" title="Register" className="w-full" />
         </div>
           
          </form>

          
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
