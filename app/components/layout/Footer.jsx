"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">About Us</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We provide premium real estate solutions with modern features,
            trusted services, and 100% customer satisfaction. Find your dream
            property easily with our platform. Our team ensures a seamless
            experience from search to purchase.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
          <p className="text-gray-400 text-sm mb-2">
            123 Real Estate Street, Dhaka, Bangladesh
          </p>
          <p className="text-gray-400 text-sm mb-2">Phone: +880 1234 567 890</p>
          <p className="text-gray-400 text-sm mb-2">
            Email: info@realestate.com
          </p>
          <p className="text-gray-400 text-sm mb-2">Social: @RealEstateBD</p>
        </div>

        {/* Featured Listings */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Featured Listings
          </h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <span className="text-white font-semibold">
                Paradisos Sea View
              </span>{" "}
              - Vilimale, Male - $23/night
            </li>
            <li>
              <span className="text-white font-semibold">
                Modern Boutique House
              </span>{" "}
              - Thilafushi, Male - $159/night
            </li>
            <li>
              <span className="text-white font-semibold">
                Ocean Breeze Apartment
              </span>{" "}
              - Male City - $45/night
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Follow Us</h2>
          <div className="flex space-x-4 mb-6 text-2xl">
            <a
              href="#"
              className="text-gray-400 hover:text-[var(--primary-color)] transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[var(--primary-color)] transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[var(--primary-color)] transition-all duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[var(--primary-color)] transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Real Estate BD. All rights reserved.
      </div>
    </footer>
  );
}
