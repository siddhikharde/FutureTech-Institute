import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import Button from "../Button";
import logoImg from "../../assets/logo.png";

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("userData"));

  if (user?.role !== "admin") return null;

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/addStudents" },      
    { name: "Courses", path: "/add-courses" },      
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-xl text-[#0F172A]"
        >
          <img src={logoImg} alt="FutureTech" className="h-10" />
          Admin Panel
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-semibold transition-colors ${
                location.pathname === item.path
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-[#0F172A] hover:text-blue-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/"
            className="text-green-600 font-semibold hover:text-green-700"
          >
           View Website
          </Link>


          <div className="text-right flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-[#0F172A]">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          <Button
            title="Logout"
            variant="danger"
            size="sm"
            onClick={handleLogout}
          />
        </div>

        <button
          className="md:hidden text-[#0F172A] cursor-pointer hover:scale-[1.1] duration-150"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0F172A]/95 px-6 py-6 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block text-white font-semibold"
            >
              {item.name}
            </Link>
          ))}

          <Link to="/" className="block text-green-400 font-semibold">
             View Website
          </Link>

          <Button
            title="Logout"
            variant="danger"
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
}
