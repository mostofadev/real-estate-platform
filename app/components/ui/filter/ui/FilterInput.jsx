import React from "react";

function FilterInput({ 
  type = "search", 
  name = "location", 
  id = "id", 
  placeholder = "Search...", 
  active, 
  setActive, 
  index 
}) {
  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        checked={active === index}
        onChange={() => setActive(index)}
        className="
          w-full
          px-4 py-3
          rounded-lg
          border border-gray-300
          bg-[var(--bg-one)]
          text-gray-700
          placeholder-gray-400
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#9d4edd]
          focus:border-transparent
          transition
          duration-200
        "
      />
    </div>
  );
}

export default FilterInput;
