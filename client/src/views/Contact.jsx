import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {setPageTitle} from '../Utils'
import { useEffect } from "react";
import Footer from "../components/Footer";

function Contact() {
   useEffect(()=>{
      setPageTitle({title:"Contact Us"})
       window.scrollTo(0, 0);
    },[])
   const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

   const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields", { id: "contact-error" });
      return;
    }

    toast.success("Message sent successfully..", { id: "contact-success" });
    setForm({ name: "", email: "", message: "" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerAnimation = {
    hidden: {},
    visible: { transition: { containerAnimation: 0.2 } },
  };
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />

    
      <motion.div
        className="relative overflow-hidden"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A]" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-200 mb-4"
            variants={fadeInUp}
          >
            Contact <span className="text-[#0EA5E9]">Us</span>
          </motion.h1>

          <motion.p
            className="text-gray-400 max-w-3xl mx-auto text-lg"
            variants={fadeInUp}
          >
            We’d love to hear from you. Let’s build your future together.
          </motion.p>
        </div>
      </motion.div>
<motion.div
        className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
      
        <motion.div variants={fadeInUp} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-4">
              Get in Touch
            </h2>

            <div className="flex items-center gap-3 text-[#4B5563] mb-3">
              <Mail className="text-[#0EA5E9]" />
              <a href="mailto:Info@futuret.in" className="hover:underline">
                Info@futuret.in
              </a>
            </div>

            <div className="flex items-center gap-3 text-[#4B5563] mb-3">
              <Phone className="text-[#0EA5E9]" />
              <a href="tel:7774912734" className="hover:underline">
                +91 77749 12734
              </a>
            </div>

            <div className="flex items-start gap-3 text-[#4B5563]">
              <MapPin className="text-[#0EA5E9] mt-1" />
              <p>
                Anantaa City Center, Office No.13,<br />
                Shrirampur–Newasa Road, Shrirampur
              </p>
            </div>
          </div>
        </motion.div>
         <motion.div variants={fadeInUp}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">
              Send a Message
            </h2>

            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />

              <div className="flex items-center justify-center">
                <Button
                type="submit"
                size="lg"
                title="Send Message"
                className="w-full"
              />
              </div>
            </form>
          </div>
        </motion.div>
        </motion.div>
      <Footer/>
    </div>
  );
}

export default Contact;
