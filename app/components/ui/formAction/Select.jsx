import React from "react";

function Select({ 
  Name = "", 
  id = "id", 
  Label = "", 
  Options = [], 
  DefaultOption = "Select an option" 
}) {
  return (
    <div className="my-4">
      <div className="my-2">
        <label htmlFor={id} className="mx-2 text-[12px]">{Label}</label>
      </div>
      <select
        name={Name}
        id={id}
        className="py-4 px-5 outline-one border border-[0.5px] border-gray-200 rounded-full w-full"
      >
        {/* Default option */}
        <option value="">{DefaultOption}</option>
        
        {/* Dynamic options */}
        {Options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
