import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  //  axios instance
  const api = axios.create({
    baseURL: "https://blog-app-8-ubur.onrender.com/api", 
    withCredentials: true,
  });

  
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/my-profile");
        console.log("Profile:", data.user);
        setProfile(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Profile fetch error:", error.response?.data || error);
        setIsAuthenticated(false);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/blogs/all-blogs");
        console.log("Blogs:", data);
        setBlogs(data.blogs || data); // agar backend { blogs: [...] } bhejta hai
      } catch (error) {
        console.log("Blogs fetch error:", error.response?.data || error);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
