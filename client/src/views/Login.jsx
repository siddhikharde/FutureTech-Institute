import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import toast, { Toaster } from "react-hot-toast";
import {setPageTitle} from '../Utils'
import { motion } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate(); useEffect(()=>{
      setPageTitle({title:"Login"});
      window.scrollTo(0, 0);
    },[])

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      toast.error("Please fill all fields", { id: "empty" });
      return;
    }

    try{
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, form);
    if(response.data.success){
      toast.success(response.data.message || "Login Successful", {id:"loginsuccess"});
      setForm({
        email:"",
        password:""
      })

      const {jwt, data}=response.data;
      localStorage.setItem("JwtToken", jwt);
      localStorage.setItem("userData", JSON.stringify(data));

      if (data.role === "admin") {
    navigate("/dashboard", { replace: true });
  }else{
       setTimeout(() => navigate("/", { replace: true }), 1200);
   } }
    else{
      toast.error(response.data.message || "Invalid email or password..")
    }}catch(e){
       toast.error(
      e.response?.data?.message || "Server error. Try again."
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
        </div>
        <Toaster/>
      </motion.div>
      <Footer/>
    </div>
  );
}

export default Login;
