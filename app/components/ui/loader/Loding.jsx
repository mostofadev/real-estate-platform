// HomeSpringLoader.jsx
import React from "react";

const HomeSpringLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <svg
        className="w-24 h-24 home-spring"
        fill="none"
        stroke="#9d4edd"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-9z"
        />
      </svg>


      <style>
        {`
          @keyframes springStroke {
            0% { stroke: #9d4edd; }
            25% { stroke: #7c3aed; }
            50% { stroke: #6d28d9; }
            75% { stroke: #7c3aed; }
            100% { stroke: #9d4edd; }
          }
          .home-spring path {
            animation: springStroke 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HomeSpringLoader;
