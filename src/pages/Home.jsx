import React, { useContext } from "react";
import HomeCarousel from "../components/Carousel";
import { myContext } from "../App";

const Home = () => {
  const { products } = useContext(myContext);
  console.log(products);
  const mobiles =
    products &&
    products.filter((item) => item.subcategory === "Smartphones").slice(0, 4);
  const fasion =
    products &&
    products.filter((item) => item.category === "Fashion").slice(0, 4);
  const shoping =
    products &&
    products
      .filter((item) => item.subcategory === "Men's Clothing")
      .slice(0, 4);
  const kitchen =
    products &&
    products
      .filter((item) => item.category === "Kitchen Appliances")
      .slice(0, 4);
  const deals =
    products &&
    products.filter((item) => item.subcategory === "Laptop").slice(0, 5);
  const electronics =
    products && products.filter((item) => item.category === "Electronics");

  const like =
    electronics && electronics.sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <>
      <div className=" bg-[#e3e6e6]">
        <HomeCarousel />
        <div className=" relative -top-[300px]  ">
          <div className="brodcast-div flex justify-center w-full">
            <div className="  flex  w-[95%]  justify-between">
              <div className="  w-[24%] bg-white">
                <h3 className=" my-3 ml-2 text-[21px]  text-start font-bold ">
                  Keep shoping
                </h3>
                <div className="grid grid-cols-2 gap-2 mx-2 justify-evenly   items-center">
                  {shoping.map((item) => {
                    return (
                      <div className="p-1 mb-2 bg-[#F7F7F7]  flex flex-col justify-evenly  items-center  h-[25vh] ">
                        <div className="  bg-yellow-200">
                          <img
                            className=" w-[75px] h-[95px]"
                            src={item.image}
                            alt="mobile"
                          />
                        </div>
                        <p className="text-[13px]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className=" w-[24%] bg-white">
                <h3 className=" my-3 ml-2  text-[21px] font-bold ">
                  Kitchen appliances
                </h3>
                <div className="grid grid-cols-2 gap-2 mx-2 justify-evenly   items-center">
                  {kitchen.map((item) => {
                    return (
                      <div className="p-1 mb-2 bg-[#F7F7F7]  flex flex-col justify-evenly  items-center  h-[25vh] ">
                        <div className="  bg-yellow-200">
                          <img
                            className=" w-[75px] h-[95px]"
                            src={item.image}
                            alt="mobile"
                          />
                        </div>
                        <p className="text-[13px]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className=" w-[24%] bg-white">
                <h3 className=" my-3 ml-2  text-[21px] font-bold ">
                  Smart Phones
                </h3>
                <div className="grid grid-cols-2 gap-2 mx-2 justify-evenly   items-center">
                  {mobiles.map((item) => {
                    return (
                      <div className="p-1 mb-2 bg-[#F7F7F7]  flex flex-col justify-evenly items-center  h-[25vh] ">
                        <img
                          className=" w-[70px] "
                          src={item.image}
                          alt="mobile"
                        />
                        <p className="text-[13px]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className=" w-[24%] bg-white">
                <h3 className=" my-3 ml-2  text-[21px] font-bold ">Fasion</h3>
                <div className="grid grid-cols-2 gap-2 mx-2 justify-evenly   items-center">
                  {fasion.map((item) => {
                    return (
                      <div className="p-1 mb-2 bg-[#F7F7F7]  flex flex-col justify-evenly  items-center  h-[25vh] ">
                        <div className="  bg-yellow-200">
                          <img
                            className=" w-[75px] h-[95px]"
                            src={item.image}
                            alt="mobile"
                          />
                        </div>
                        <p className="text-[13px]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[95%] h-[380px]  bg-white m-8 p-3">
            <div className="flex items-center mb-1">
              <p className=" text-xl mx-3 font-bold">Today' Deals</p>
              <p className=" text-s mt-1 text-[#317185]">See all details</p>
            </div>
            <div className="flex w-full  gap-2">
              {deals.map((item) => {
                return (
                  <div className="w-1/5  h-full rounded-md overflow-hidden shadow-lg">
                    <img
                      className="w-full h-[40vh]"
                      src={item.image}
                      alt="tDeals"
                    />
                    <p className="text-l  text-center">
                      Best Styles in Laptops
                    </p>
                    <p className="text-sm mb-2 text-center text-red-600">
                      Deal of the day
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[95%]   bg-white m-8 p-3">
            <div className="flex items-center">
              <p className=" text-xl mx-3 font-bold">
                Related to items you've viewed
              </p>
              <p className=" text-s mt-1 text-[#317185]">See more</p>
            </div>
            <div className="flex p-5 w-full justify-evenly">
              {like.map((item) => {
                return (
                  <div className="w-1/6  rounded-md overflow-hidden ">
                    <img className=" h-[30vh] " src={item.image} alt="tDeals" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
