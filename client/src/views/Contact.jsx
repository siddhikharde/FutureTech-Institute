import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { setPageTitle } from "../Utils";
import Footer from "../components/Footer";

function Contact() {

  useEffect(() => {
    setPageTitle({ title: "Contact Us" });
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    const phoneNumber = "917774912734";

    const whatsappMessage = `
New Contact Message – FutureTech Institute

Name: ${form.name}
Email: ${form.email}
Message: ${form.message}
    `;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");
    toast.success("Redirecting to WhatsApp...");

    setForm({ name: "", email: "", message: "" });
  };

  // 🔥 SAME ANIMATIONS AS HOME
  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity }
    }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="bg-[#020617] text-white overflow-hidden">

      <Navbar />

      {/* 🔥 HERO (MATCHES HOME) */}
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

        <motion.div
          className="text-center py-16 px-5 relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold"
            variants={slideLeft}
          >
            Contact
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              FutureTech
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
            variants={slideRight}
          >
            We’d love to hear from you. Let’s build your future together.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >

        {/* LEFT */}
        <motion.div variants={slideLeft}>
          <div className="bg-[#0F172A] rounded-2xl shadow-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

            <div className="flex items-center gap-3 mb-4 text-gray-300">
              <Mail className="text-blue-400" />
              <span>info@futuret.in</span>
            </div>

            <div className="flex items-center gap-3 mb-4 text-gray-300">
              <Phone className="text-blue-400" />
              <span>+91 77749 12734</span>
            </div>

            <div className="flex items-start gap-3 text-gray-300">
              <MapPin className="text-blue-400 mt-1" />
              <p>
                Anantaa City Center, Office No.13,<br />
                Shrirampur–Newasa Road
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT (FORM) */}
        <motion.div variants={slideRight}>
          <div className="bg-[#0F172A] rounded-2xl shadow-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                className="bg-[#020617] border border-gray-600 rounded-lg p-3 h-32 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Button type="submit" size="lg" title="Send Message" />
            </form>
          </div>
        </motion.div>

      </motion.div>

      <Footer />
    </div>
  );
}

export default Contact;