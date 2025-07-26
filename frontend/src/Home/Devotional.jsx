import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();

  const devotionalBlogs = blogs?.filter(
    (blog) => blog?.category?.toLowerCase() === "devotion"
  );

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-gray-800">
        🌸 Devotional <span className="text-blue-600">Blogs</span>
      </h1>
      <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        The concept of gods varies widely across different cultures,
        religions, and belief systems. Explore our devotional collection and
        find inspiration in every post.
      </p>

      {/* Blogs Grid */}
      {devotionalBlogs && devotionalBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {devotionalBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={blog?.blogImage?.url || "/placeholder.jpg"}
                alt={blog?.title}
                className="w-full h-48 object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition duration-300"></div>
              {/* Text */}
              <div className="absolute bottom-4 left-4">
                <h2 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors">
                  {blog?.title?.length > 40
                    ? blog.title.slice(0, 40) + "..."
                    : blog.title}
                </h2>
                <p className="text-sm text-gray-200">{blog?.category}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg font-medium">
            No devotional blogs found. Please check again later.
          </p>
        </div>
      )}
    </div>
  );
}

export default Devotional;
