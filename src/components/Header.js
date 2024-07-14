import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 flex items-center justify-between px-6 pt-2 pb-4">
      {/* Brand */}
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link to="/" className="text-white uppercase text-xl font-bold">
          Company Name
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow flex items-center justify-center sm:justify-end">
        <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/invoice-dashboard"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Invoice Dashboard
            </Link>
          </li>
          <li style={{ marginRight: "20px" }}> {/* Adding inline style for margin */}
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="text-gray-300 hover:text-white transition duration-300"
        >
          <FaSignOutAlt className="text-xl" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
