import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "https://blog-app-8-ubur.onrender.com/api/blogs/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://blog-app-8-ubur.onrender.com/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          📚 My <span className="text-blue-600">Blogs</span>
        </h1>

        {myBlogs && myBlogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {myBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Blog Image */}
                {blog?.blogImage && (
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {blog.category}
                  </span>
                  <h4 className="text-xl font-semibold mt-2 mb-4 text-gray-800 line-clamp-2">
                    {blog.title}
                  </h4>

                  <div className="mt-auto flex justify-between space-x-3">
                    <Link
                      to={`/blog/update/${blog._id}`}
                      className="flex-1 text-center py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      ✏️ Update
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-20">
            You haven’t posted any blogs yet. ✨
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
