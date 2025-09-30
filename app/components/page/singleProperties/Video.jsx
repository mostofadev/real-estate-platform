import React from "react";

function Video({ videoUrl }) {
  return (
    <div>
      <video controls width="full" className="rounded-lg shadow-md">
        <source
          src={videoUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Video;
