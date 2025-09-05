import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !role || !education) {
      toast.error("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    if (photo) formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "https://blog-app-8-ubur.onrender.com/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User registered successfully");
      setProfile(data.user);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-800">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Cilli<span className="text-indigo-400">Blog</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Create an account to get started
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select Your Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
          </select>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-600 ring-2 ring-pink-400 shrink-0">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                  No Photo
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={changePhotoHandler}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <p className="text-center text-gray-400 text-sm">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-pink-400 font-semibold hover:underline"
            >
              Login Now
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded font-bold text-white transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
