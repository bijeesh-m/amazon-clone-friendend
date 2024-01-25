import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div>
      <div className=" bg-red-50 w-full h-[100vh] flex flex-col justify-center items-center">
        <h1 className="bg-[white] p-3 rounded text-[36px] text-[red]">
          Payment Canceled
        </h1>
        <Link to={"/"}>
          <h1 className=" mt-3 underline">Return to Home</h1>
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
