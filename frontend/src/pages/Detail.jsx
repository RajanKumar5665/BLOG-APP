import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Detail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://blog-app-8-ubur.onrender.com/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

       
        setBlog(data.blog || data); 
      } catch (error) {
        console.error(error);
        toast.error("Failed to load blog details");
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading blog...
      </div>
    );
  }

  return (
    <div>
      <section className="container mx-auto p-4">
        <div className="text-blue-500 uppercase text-xs font-bold mb-4">
          {blog.category}
        </div>
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

        
        <div className="flex items-center mb-6">
          {blog.adminPhoto && (
            <img
              src={blog.adminPhoto}
              alt="author_avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <p className="text-lg font-semibold">{blog.adminName}</p>
        </div>

       
        <div className="flex flex-col md:flex-row">
          {blog.blogImage?.url && (
            <img
              src={blog.blogImage.url}
              alt="main_blog"
              className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
            />
          )}
          <div className="md:w-1/2 w-full md:pl-6">
            <p className="text-lg mb-6">{blog.about}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Detail;
