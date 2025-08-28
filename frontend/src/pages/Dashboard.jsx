import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="w-64">
        <Sidebar component={component} setComponent={setComponent} />
      </div>

    
      <div className="flex-1 p-4 sm:ml-64">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
