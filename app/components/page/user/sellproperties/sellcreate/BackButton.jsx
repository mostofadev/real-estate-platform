"use client";
import React from "react";

export default function BackButton({ onClick, disabled = false, className = "", children = "Back" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gray-400 hover:brightness-110 text-white font-medium py-2 px-6 rounded-full transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}
