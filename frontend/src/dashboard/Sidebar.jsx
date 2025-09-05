import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => setComponent(value);
  const gotoHome = () => navigateTo("/");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://blog-app-8-ubur.onrender.com/api/users/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl text-gray-700" />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button for Mobile */}
        <div
          className="sm:hidden absolute top-4 right-4 cursor-pointer bg-gray-100 p-1 rounded-full hover:bg-gray-200 transition"
          onClick={() => setShow(false)}
        >
          <BiSolidLeftArrowAlt className="text-2xl text-gray-700" />
        </div>

        {/* Profile Section */}
        <div className="text-center mt-8 mb-10 px-4">
          <img
            className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg border-2 border-gray-300"
            src={
              profile?.photo?.url ||
              "https://via.placeholder.com/150?text=User"
            }
            alt="Profile"
          />
          <p className="text-lg font-bold text-gray-800 mt-4">
            {profile?.name || "User"}
          </p>
        </div>

        {/* Navigation Buttons */}
        <ul className="space-y-4 px-4">
          <li>
            <button
              onClick={() => {
                handleComponents("My Blogs");
                setShow(false);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-medium rounded-lg hover:from-green-500 hover:to-green-600 shadow-sm transition-all duration-200"
            >
              📖 My Blogs
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleComponents("Create Blog");
                setShow(false);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-600 shadow-sm transition-all duration-200"
            >
              ✍️ Create Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleComponents("My Profile");
                setShow(false);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-medium rounded-lg hover:from-pink-500 hover:to-pink-600 shadow-sm transition-all duration-200"
            >
              👤 My Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                gotoHome();
                setShow(false);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-400 to-red-500 text-white font-medium rounded-lg hover:from-red-500 hover:to-red-600 shadow-sm transition-all duration-200"
            >
              🏠 Home
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                handleLogout(e);
                setShow(false);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-600 shadow-sm transition-all duration-200"
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
