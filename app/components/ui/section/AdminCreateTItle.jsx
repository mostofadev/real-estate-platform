import React from "react";
import PrimaryButton from "../button/Primary";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

function AdminCreateTItle({
  Title,
  To,
  Text,
  Pending,
  Approved,
  Rejected,
  pTo,
  aTo,
  rTo,
}) {
  return (
    <div className="flex justify-between ">
      <div className="">
        <h2 className="text-3xl font-bold">{Title}</h2>
      </div>
      <div className="">
        {Text ? (
          <PrimaryButton
            Icon={<FaArrowRightLong className="text-white text-sm mx-2" />}
            to={To}
          >
            {Text}
          </PrimaryButton>
        ) : (
          ""
        )}
      </div>
      {Text ? (
        ""
      ) : (
        <div className="flex gap-2 justify-end items-center">
          <div className="">
            {Pending ? (
              <PrimaryButton
                to={pTo}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                {Pending}
              </PrimaryButton>
            ) : (
              ""
            )}
          </div>

          <div className="">
            {Approved ? (
              <PrimaryButton
                to={aTo}
                className="bg-green-500 hover:bg-green-600"
              >
                {Approved}
              </PrimaryButton>
            ) : (
              ""
            )}
          </div>

          <div className="">
            {Rejected ? (
              <PrimaryButton to={rTo} className="bg-red-500 hover:bg-red-600">
                {Rejected}
              </PrimaryButton>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCreateTItle;
