import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  console.log(blogs);

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        ✨ Latest <span className="text-blue-600">Highlights</span>
      </h2>

      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.slice(0, 4).map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Blog Image */}
              <div className="relative">
                <img
                  src={element.blogImage.url}
                  alt={element.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition duration-300"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-semibold group-hover:text-yellow-400 transition-colors">
                  {element.title.length > 35
                    ? element.title.slice(0, 35) + "..."
                    : element.title}
                </h1>
              </div>

              {/* Author Info */}
              <div className="p-5 flex items-center">
                <img
                  src={element.adminPhoto}
                  alt={element.adminName}
                  className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
                />
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-800">
                    {element.adminName}
                  </p>
                  <p className="text-sm text-gray-400">New</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-lg font-medium text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Hero;
