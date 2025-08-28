import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User Logged in successfully");

    
      setProfile(data.user);
      setIsAuthenticated(true);

      setEmail("");
      setPassword("");
      setRole("");

      navigateTo("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Invalid credentials or server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
            Cilli<span className="text-indigo-400">Blog</span>
          </h1>
          <p className="text-gray-400 font-medium">
            Welcome back! Please login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />

          <p className="text-center text-gray-400">
            New User?{" "}
            <Link
              to="/register"
              className="text-pink-400 font-semibold hover:underline"
            >
              Register Now
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-bold shadow-md transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
