import React, { useContext } from "react";
import { myContext } from "../App";
import { Link } from "react-router-dom";

const Products = () => {
  const { products } = useContext(myContext);

  return (
    <div className="  flex flex-col items-center">
      <div className=" w-full flex h-[39px] justify-between items-center border shadow-sm">
        <p className="ms-2">1-16 of over 60,000 results for "jbl"</p>
        <select
          className=" focus:outline-none border rounded bg-[#F0F2F2] shadow-sm h-[20px] mx-2"
          name="sort"
        >
          <option value="low to high">Price:Low to high</option>
          <option value="low to high">Price:High to low</option>
        </select>
      </div>
      <div className="w-[80%] mt-4">
        <div className="mb-1">
          <h1 className=" text-[20px]">Results</h1>
          <p className=" text-[14px]">
            Check each product page for other buying options.
          </p>
        </div>
        {products.map((data) => {
          return (
            <div
              key={data._id}
              className=" h-[300px] w-full bg-[#F7F7F7] flex  mb-2 border rounded-1"
            >
              <div className=" w-[30%] flex justify-center p-3">
                <Link to={`/product/${data._id}`}>
                  <img className="  max-h-[100%]" src={data.image} alt="jbl" />
                </Link>
              </div>
              <div className=" flex flex-col justify-between bg-white p-2 border w-full  rounded-br rounded-tr">
                <h1 className="text-[18px] mt-2">
                  {data.title} |{data.description}
                </h1>
                <h3 className=" text-[28px]">₹{data.price}</h3>
                <p className=" text-[14px]">
                  Get it by{" "}
                  <span className=" font-semibold">Sunday, 17 December</span>{" "}
                  <br />
                  FREE Delivery by Amazon
                </p>
                <button className=" flex items-start mb-2">
                  <p className="text-[13px] p-2  bg-[#FFD814] rounded-2 h-[30px] w[90px]">
                    Add to Cart
                  </p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
