import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import Button from "../Button";
import logoImg from '../../assets/logo.png'

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("JwtToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Student", path: "/addStudents" },
    { name: "Add Fee", path: "/add-fee" },
    { name: "Courses", path: "/courses" },
  ];

  return (
    <div className="bg-white text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="font-bold text-2xl flex items-center  justify-center bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent">
        <img src={logoImg} alt="Futuretech" className="h-10" />
          FutureTech Admin
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-blue-700 text-lg text-[#0F172A] font-semibold transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button
          title={"Logout"}
            onClick={handleLogout}
           variant="danger"
           size="sm"
         />
            
         
        </div>
        <button
          className="md:hidden text-[#0F172A] cursor-pointer hover:scale-[1.1] transition-duration-1s"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex fixed right-0 left-0 flex-col gap-5 bg-[#0F172A]/95 py-7 px-5 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block text-white hover:text-blue-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
         <div>  <Button
          title={"Logout"}
            onClick={handleLogout}
           variant="danger"
           size="sm"
         /></div>
          
        </div>
      )}
    </div>
  );
}
