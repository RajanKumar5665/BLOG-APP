import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Products</h2>
            <ul className="space-y-2">
              {["Flutter", "React", "Android", "iOS"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Design to Code</h2>
            <ul className="space-y-2">
              {["Figma plugin", "Templates"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Comparison</h2>
            <ul className="space-y-2">
              {[
                "DhiWise vs Anima",
                "DhiWise vs Appsmith",
                "DhiWise vs FlutterFlow",
                "DhiWise vs Monday Hero",
                "DhiWise vs Retool",
                "DhiWise vs Bubble",
                "DhiWise vs Figma Dev Mode",
              ].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Company</h2>
            <ul className="space-y-2">
              {["About Us", "Contact Us", "Career", "Terms of Service", "Privacy Policy"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 md:mb-0">
              Cilli<span className="text-blue-500">Blog</span>
            </div>
            <p className="text-sm text-gray-400">
              &copy; 2024 DhiWise PVT. LTD. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                <FaGithub size={22} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <BsYoutube size={22} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
