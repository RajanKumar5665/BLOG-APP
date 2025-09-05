import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://blog-app-8-ubur.onrender.com/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");
        setBlogImagePreview(data?.blogImage?.url || "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load blog data");
      }
    };
    fetchBlog();
  }, [id]);

  // Change photo handler
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

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !category || !about) {
      toast.error("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage) formData.append("blogImage", blogImage);

    try {
      setLoading(true);
      const { data } = await axios.put(
        `https://blog-app-vym8.onrender.com/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/"); // redirect to home or your blogs page
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to update blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ✏️ Update Blog
        </h3>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-3 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-3 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 font-semibold">Blog Image</label>
            {blogImagePreview && (
              <img
                src={blogImagePreview}
                alt="Preview"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
            )}
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* About */}
          <div>
            <label className="block mb-2 font-semibold">About</label>
            <textarea
              rows="6"
              className="w-full p-3 border rounded-md"
              placeholder="Something about your blog (at least 200 characters!)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white font-semibold rounded-md transition-colors duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
