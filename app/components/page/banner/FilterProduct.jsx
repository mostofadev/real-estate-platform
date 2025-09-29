import React from "react";
import FilterMenu from "../../ui/filter/FilterMenu";

function FilterProduct() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 lg:py-6 py-6 ">

      <p className="lg:text-[14px] text-[11px] text-white border border-[0.5px] border-gray-300 inline-block p-3 rounded-lg">LET US GUIDE YOUR HOME</p>
      <h2 className="lg:text-6xl text-2xl text-white font-bold">Find Your <span className="text-[#9d4edd]">Dream</span> Home.</h2>
      <p className="lg:text-[14px] text-[12px] text-white">From as low as $10 per day with limited time offer discounts</p>
      <FilterMenu />
      {/* <div className="bg-[var(--bg-one)]  p-6  shadow-lg rounded-lg overflow-hidden">
        <FilterMenuItem />
      </div> */}
    </div>
  );
}

export default FilterProduct;
