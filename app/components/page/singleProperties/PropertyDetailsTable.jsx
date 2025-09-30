import React from "react";

function PropertyDetailsTable({ details }) {
  // details array of objects
  // Example:
  // const details = [
  //   { label: "Property ID", value: "663" },
  //   { label: "Price", value: "$1 M" },
  //   { label: "Property Type", value: "Restaurant" },
  //   { label: "Property Status", value: "For Rent" },
  //   { label: "Bedrooms", value: "4" },
  //   { label: "Bathrooms", value: "3" },
  //   { label: "Year Built", value: "2010" },
  //   { label: "Size", value: "200 SqFt" },
  //   { label: "Land Area", value: "500 SqFt" },
  //   { label: "Garages", value: "1" },
  //   { label: "Garage Size", value: "40 SqFt" },
  // ];

  return (
    <div className="overflow-x-auto ">
      <table className="w-full border-collapse">
        <tbody>
          {details.map((item, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 font-medium text-gray-700 w-1/3">
                {item.label}
              </td>
              <td className="px-6 py-4 text-gray-800">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyDetailsTable;
