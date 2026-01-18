import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function Contact() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerAnimation = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
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

      
    </div>
  );
}

export default Contact;
