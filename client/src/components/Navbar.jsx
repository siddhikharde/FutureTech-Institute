import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from '../assets/logo.png'

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("JwtToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleLogout = () => {
    localStorage.removeItem("JwtToken");
    localStorage.removeItem("userData");
    setTimeout(() => {
      navigate("/login");
    }, 1000)
  }
  return (
    <div className="bg-white shadow-md z-1000 sticky top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-[#0F172A] via-[#143a8a] to-[#0F172A] bg-clip-text text-transparent flex items-center justify-center"
          >
            <img src={logo} alt="FutureTech Logo" className="h-9" />
            FutureTech
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-[#0F172A] text-[17px] font-bold hover:text-blue-700">
              Home
            </Link>
            <Link to="/courses" className="text-[#0F172A]  text-[17px] font-bold hover:text-blue-700">
              Courses
            </Link>
            <Link to="/about" className="text-[#0F172A]  font-bold text-[17px] hover:text-blue-700">
              About
            </Link>
            <Link to="/contact" className="text-[#0F172A]  font-bold text-[17px] hover:text-blue-700">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {
              token && userData ? (
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white font-bold">
        <Link to={"/student-dashboard"}>{userData.name ? userData.name.charAt(0).toUpperCase() : "S"}</Link>
      </div>
                <Button variant="danger" size="md" title={"Logout"} onClick={handleLogout} />
              </div>  )
            
                : (<Link to="/login">
                  <Button variant="outline" size="md" title={"Login"} className="w-full" />
                </Link>)}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#0F172A] cursor-pointer"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>
      {open && (
        <div className="md:hidden flex flex-col gap-6 justify-center items-start bg-[#020617] px-4 py-4 fixed right-0 left-0">
          <Link onClick={() => setOpen(false)} to="/" className="block text-gray-200 text-[17px] font-bold">Home</Link>
          <Link onClick={() => setOpen(false)} to="/courses" className="block text-gray-200 text-[17px] font-bold">Courses</Link>
          <Link onClick={() => setOpen(false)} to="/about" className="block text-gray-200 text-[17px] font-bold">About</Link>
          <Link onClick={() => setOpen(false)} to="/contact" className="block text-gray-200 text-[17px] font-bold">Contact</Link>


          <div className=" flex gap-3 py-2 w-full items-start justify-start pt-3 border-t border-gray-700">
            {token && userData && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                <Link to={"/student-dashboard"}>{userData.name ? userData.name.charAt(0).toUpperCase() : "U"}</Link>
              </div>
            )}
            {
              token ? (
                <Button variant="danger" size="md" title={"Logout"} onClick={handleLogout} />
              )
                : (<Link to="/login">
                  <Button variant="outline" size="md" title={"Login"} className="w-full" />
                </Link>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
