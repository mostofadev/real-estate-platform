"use client";

export default function PageLoading({ size = "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-b-2",
    md: "h-8 w-8 border-b-2",
    lg: "h-12 w-12 border-b-4",
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-[var(--primary-color)] ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}
