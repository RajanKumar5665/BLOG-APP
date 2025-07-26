import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Cilli<span className="text-blue-600">Blog</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((item, idx) => (
            <Link
              key={idx}
              to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
              className="relative group"
            >
              <span className="hover:text-blue-600 transition-colors">{item}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-md transition"
            >
              Login
            </Link>
          ) : (
            <>
              {/* ✅ Logout button (सभी logged-in users के लिए) */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-md transition"
              >
                Logout
              </button>

              {/* ✅ Dashboard button (सिर्फ admin के लिए) */}
              {profile?.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-md transition"
                >
                  Dashboard
                </Link>
              )}

              {/* ✅ Profile image */}
              {profile?.avatar && (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border"
                />
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-gray-700 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          {show ? <IoCloseSharp size={28} /> : <AiOutlineMenu size={28} />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {show && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col items-center space-y-6 py-6 text-lg font-medium">
            {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((item, idx) => (
              <Link
                key={idx}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setShow(false)}
                className="hover:text-blue-600"
              >
                {item}
              </Link>
            ))}

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-md transition"
              >
                Login
              </Link>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setShow(false);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-md transition"
                >
                  Logout
                </button>

                {profile?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setShow(false)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-md transition"
                  >
                    Dashboard
                  </Link>
                )}

                {profile?.avatar && (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
