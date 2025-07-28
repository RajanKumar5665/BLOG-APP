import React from "react";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Creators from "./pages/Creators";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import { BACKEND_URL } from './utils.js'; // Keep this if you plan to use it

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt");

  console.log(blogs);
  console.log(isAuthenticated);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />

        {/* Blog Detail Page */}
        <Route exact path="/blog/:id" element={<Detail />} />

        {/* Update Blog Page */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
