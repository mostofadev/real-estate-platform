"use client";
import React from "react";

const ScaleLoader = ({ size = 16, color = "bg-blue-500", className = "" }) => {
  return (
    <div className={`flex space-x-2 justify-center items-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`${color} inline-block w-${size} h-${size} rounded-full animate-scaleLoader`}
        ></span>
      ))}
    </div>
  );
};

export default ScaleLoader;
