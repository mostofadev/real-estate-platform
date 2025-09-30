"use client";
import React from "react";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            About Our Real Estate Company
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            We help you find your dream home, investment properties, and more
            with trust and transparency.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://source.unsplash.com/600x400/?real-estate,building"
          alt="Real Estate"
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our real estate company specializes in residential and commercial
            properties. We are committed to providing exceptional service to
            our clients and helping them make informed property decisions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With years of experience, our team of agents and advisors ensures
            that every property transaction is smooth and transparent.
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "CEO" },
              { name: "Jane Smith", role: "Lead Agent" },
              { name: "Mike Johnson", role: "Property Advisor" },
            ].map((member, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <img
                  src={`https://source.unsplash.com/200x200/?face,${index}`}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-indigo-600">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Integrity",
              desc: "We operate with honesty and transparency in every transaction.",
            },
            {
              title: "Client Focus",
              desc: "Our clients' satisfaction is our top priority.",
            },
            {
              title: "Excellence",
              desc: "We strive to deliver the highest quality service.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Find Your Dream Property?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg">
          Contact us today and let our expert team guide you to the perfect property.
        </p>
        <a
          href="/contact"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
