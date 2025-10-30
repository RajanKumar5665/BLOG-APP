import React, { createContext, useContext, useEffect, useState } from "react";
import api, { endpoints } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await api.get(endpoints.myProfile);
        setProfile(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Profile fetch error:", error.response?.data?.message || error.message);
        setIsAuthenticated(false);
        setProfile(null);
        localStorage.removeItem("jwt");
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await api.get(endpoints.allBlogs);
        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Blogs fetch error:", error.response?.data?.message || error.message);
        setBlogs([]);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        setBlogs,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
