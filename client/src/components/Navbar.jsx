import { Link } from "react-router";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar(){
    const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#0F172A] shadow-md sticky top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="text-2xl font-bold text-[#38BDF8]"
          >
            FutureTech
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-200 text-[17px] font-bold hover:text-[#06B6D4]">
              Home
            </Link>
            <Link to="/courses" className="text-gray-200 text-[17px] font-bold hover:text-[#06B6D4]">
              Courses
            </Link>
            <Link to="/about" className="text-gray-200 font-bold text-[17px] hover:text-[#06B6D4]">
              About
            </Link>
            <Link to="/contact" className="text-gray-200 font-bold text-[17px] hover:text-[#06B6D4]">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="md" title={"Login"}/>
            </Link>

            <Link to="/register">
              <Button variant="primary" size="md" title={" Register"}/>
            </Link>
          </div>
           <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-200 cursor-pointer"
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
            <Link to="/login">
              <Button variant="outline" size="md" title={"Login"} className="w-full"/>
            </Link>
            <Link to="/register">
              <Button size="md" className="w-full" title={"Register"}/>
            </Link>
          </div>
        </div>
          )}
    </div>
  );
};

export default Navbar;
