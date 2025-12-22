import Image from "next/image";
import React from "react";

function BlogCard({ blog }) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  const truncateWords = (text, limit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <div className="p-2 border rounded-lg border-gray-200 shadow-md h-full flex flex-col">
      <div className="w-full h-[230px] relative overflow-hidden rounded-lg">
        <Image
          src={`${STORAGE_URL}${blog.featured_image}`}
          alt="Blog Image"
          fill
          className="object-cover"
          unoptimized={true}
        />
      </div>

      <div className="p-4 flex-1">
        <div className="flex justify-start my-3">
          <span className="text-[12px] text-[var(--primary-color)] font-bold border-r border-gray-200 pr-4">
            {new Date(blog.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="text-[12px] font-bold pl-4">
            {blog.author ?? "Admin"}
          </span>
        </div>

        <h2 className="text-lg font-semibold">{blog.title}</h2>

        <p className="text-sm text-gray-600 mt-2">
          {truncateWords(blog.content, 15)}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
