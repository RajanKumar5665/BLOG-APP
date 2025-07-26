import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/users/admins",
          { withCredentials: true }
        );
        setAdmin(data.admins);
      } catch (error) {
        console.error("Failed to fetch creators:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">
        🌟 Popular <span className="text-blue-600">Creators</span>
      </h1>
      <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Meet some of our top creators who share inspiring stories and blogs.
      </p>

      {/* Grid */}
      {admin && admin.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {admin.slice(0, 4).map((element) => (
            <div
              key={element._id}
              className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative mb-4">
                <img
                  src={element.photo.url}
                  alt={element.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 group-hover:border-yellow-400 transition-colors duration-300"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-yellow-400 transition-all duration-300"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {element.name}
                </p>
                <p className="text-sm text-gray-500">{element.role}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg font-medium">No creators found.</p>
        </div>
      )}
    </div>
  );
}

export default Creator;
