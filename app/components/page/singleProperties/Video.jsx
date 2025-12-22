import React from "react";

function Video({ videoUrl }) {
  // Convert YouTube short/watch link to embed link
  const getEmbedUrl = (url) => {
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop().split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="w-full flex justify-center">
      <iframe
        width="100%"
        height="500"
        src={embedUrl}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-md"
      ></iframe>
    </div>
  );
}

export default Video;
