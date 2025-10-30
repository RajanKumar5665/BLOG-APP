import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api, { endpoints } from "../services/api";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    
    if (!title || !category || !about || !blogImage) {
      toast.error("Please fill all required fields");
      return;
    }

    if (about.length < 200) {
      toast.error("About section must be at least 200 characters");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${api.defaults.baseURL}${endpoints.createBlog}`,
        formData,
        {
          withCredentials: true,
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      toast.success(data.message || "Blog created successfully!");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.error("Create blog error:", error);
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto p-8 bg-white border rounded-2xl shadow-xl">
        <h3 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Create a New <span className="text-blue-600">Blog</span>
        </h3>
        <form onSubmit={handleCreateBlog} className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Blog Image
            </label>
            <div className="flex justify-center mb-4">
              <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Preview"
                className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              About
            </label>
            <textarea
              rows="5"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
          >
            {loading ? "Creating..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
