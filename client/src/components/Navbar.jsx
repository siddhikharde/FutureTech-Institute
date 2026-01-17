import { Link } from "react-router";
import Button from "./Button";

function Navbar(){
  return (
    <nav className="bg-[#0F172A] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="text-2xl font-bold text-[#38BDF8]"
          >
            FutureTech
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-200 hover:text-[#06B6D4]">
              Home
            </Link>
            <Link to="/courses" className="text-gray-200 hover:text-[#06B6D4]">
              Courses
            </Link>
            <Link to="/about" className="text-gray-200 hover:text-[#06B6D4]">
              About
            </Link>
            <Link to="/contact" className="text-gray-200 hover:text-[#06B6D4]">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm" title={"Login"}/>
            </Link>

            <Link to="/register">
              <Button variant="primary" size="sm" title={" Register"}/>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
