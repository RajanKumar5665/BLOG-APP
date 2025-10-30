import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  
  const defaultAvatar = "https://via.placeholder.com/150/4A5568/FFFFFF?text=" + (profile?.name?.charAt(0) || "U");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative">
          <img
            src={profile?.photo?.url || "https://via.placeholder.com/600x300/E2E8F0/64748B?text=Cover+Photo"}
            alt="cover"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-x-0 -bottom-12 flex justify-center">
            <img
              src={profile?.photo?.url || defaultAvatar}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
        </div>

        <div className="px-6 pt-16 pb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {profile?.name || "User Name"}
          </h2>
          <p className="text-gray-500 text-sm mb-1">
            {profile?.email || "No email"}
          </p>
          <p className="text-gray-500 text-sm mb-1">
            {profile?.phone || "No phone number"}
          </p>
          <p className="mt-2 inline-block px-4 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 shadow-sm">
            {profile?.role || "User"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
