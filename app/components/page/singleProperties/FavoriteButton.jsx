import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function FavoriteButton() {
  const [liked, setLiked] = useState(false);

  const toggleFavorite = () => {
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
        liked ? "bg-red-100 text-red-500 shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
      title={liked ? "Remove from Favorites" : "Add to Favorites"}
    >
      {liked ? (
        <AiFillHeart className="text-2xl" />
      ) : (
        <AiOutlineHeart className="text-2xl" />
      )}
    </button>
  );
}

export default FavoriteButton;
