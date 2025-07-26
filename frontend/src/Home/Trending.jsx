import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 text-center">
        🔥 Trending <span className="text-blue-600">Now</span>
      </h1>
      <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Discover the most popular blogs everyone’s talking about right now.
      </p>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        keyBoardControl
        containerClass="carousel-container"
        itemClass="px-3"
      >
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element) => (
            <div
              key={element._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <Link to={`/blog/${element._id}`}>
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={element.blogImage.url}
                    alt={element.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    {element.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3 truncate group-hover:text-blue-600 transition-colors">
                    {element.title}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={element.adminPhoto}
                      alt={element.adminName}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <p className="ml-3 text-sm text-gray-500">{element.adminName}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex h-40 items-center justify-center text-gray-500 font-medium">
            Loading...
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
