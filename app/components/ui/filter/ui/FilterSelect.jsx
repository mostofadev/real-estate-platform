import React from "react";

function FilterSelect({ 
  id = "select", 
  name = "select", 
  Label = "", 
  Options = [], 
  DefaultOption = "Select option", 
  active, 
  setActive, 
  index 
}) {
  return (
    <div className="w-full">
     
      <select
        id={id}
        name={name}
        className={`
          w-full
          px-4 py-3
          rounded-lg
          border border-gray-300
          bg-[var(--bg-one)]
          text-gray-700
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-[#9d4edd]
          focus:border-transparent
          transition duration-200
        `}
        value={active === index ? name : ""}
        onChange={() => setActive(index)}
      >
        <option value="" disabled hidden>
          {DefaultOption}
        </option>
        {Options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSelect;
