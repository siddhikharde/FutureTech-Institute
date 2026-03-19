import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl flex items-center font-bold text-white mb-3">
          <img src={logo} alt="FutureTech Logo" className="h-9" />  Future<span className="text-[#38BDF8]">Tech</span>
          </h2>
          <p className="text-sm text-gray-400">
            Empowering students with future-ready skills through
            practical, industry-focused training.
          </p>
        </motion.div>

        <motion.div className="hidden md:block "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-1">
            {["Home", "About", "Courses", "Contact", "Login"].map(
              (item, i) => (
                <li key={i}>
                  <Link
                    to={item=="Home"?`/`:`/${item.toLowerCase()}`}
                    className="hover:text-[#38BDF8] transition"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </motion.div>

        <motion.div className="hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg  font-semibold text-white mb-4">
            Popular Courses
          </h3>
          <ul className="space-y-1">
            {[
              "Web Development",
              "Python",
              "Java",
            ].map((course, i) => (
              <li key={i} className="hover:text-[#38BDF8] transition">
                {course}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>

          <div className="text-sm space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="text-[#38BDF8]" size={18} />
              <a href="mailto:info@futuret.in" className="hover:underline">
                info@futuret.in
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-[#38BDF8]" size={18} />
              <a href="tel:7774912734" className="hover:underline">
                +91 77749 12734
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-[#38BDF8]" size={18} />
              <p>
                Anantaa City Center,<br />
                Office No.13, 2nd Floor,<br />
                Shrirampur
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-gray-500 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FutureTech Pvt. Ltd.
      </div>
    </footer>
  );
}

export default Footer;
