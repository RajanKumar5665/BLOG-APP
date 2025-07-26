import axios from "axios";
import React, { useEffect, useState } from "react";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/users/admins",
          {
            withCredentials: true,
          }
        );
        setCreators(data.admins || []);
      } catch (error) {
        console.error("Error fetching creators:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-700">Loading creators...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Popular Creators</h1>
      {creators.length > 0 ? (
        <div className="flex flex-wrap justify-center items-stretch">
          {creators.map((creator) => (
            <div
              key={creator._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-4 transform hover:scale-105 transition duration-300"
            >
              {/* Cover Image */}
              <div className="relative">
                <img
                  src={creator?.photo?.url || "/default-cover.jpg"}
                  alt={`${creator?.name || "Creator"} cover`}
                  className="w-full h-32 object-cover"
                />
                {/* Profile Avatar */}
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                  <img
                    src={creator?.photo?.url || "/default-avatar.jpg"}
                    alt={`${creator?.name || "Creator"} avatar`}
                    className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="px-4 py-6 mt-6">
                <h2 className="text-center text-xl font-semibold text-gray-800">
                  {creator?.name}
                </h2>
                <p className="text-center text-gray-600 mt-2">
                  {creator?.email}
                </p>
                <p className="text-center text-gray-600 mt-1">
                  {creator?.phone}
                </p>
                <p className="text-center text-gray-600 mt-1">
                  {creator?.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No creators found at the moment.
        </p>
      )}
    </div>
  );
}

export default Creators;
