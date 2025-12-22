import React from "react";
import UserBox from "../../UserBox";
import AdminCreateTItle from "@/app/components/ui/section/AdminCreateTItle";
import SellPropertiesTable from "./SellPropertiesTable";

function SellPropertiesIndex() {
  return (
    <div>
      <UserBox>
       <AdminCreateTItle
       Title={"Your Properties"}
       To={"sell-properties/create"}
       Text={"Create"}
       />

       <div className="my-3">
        <SellPropertiesTable />
       </div>
      </UserBox>
    </div>
  );
}

export default SellPropertiesIndex;
