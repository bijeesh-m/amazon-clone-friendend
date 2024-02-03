import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Allproducts");
  const [fData, setFdata] = useState([]);

  useEffect(() => {
    axios
      .get("https://amazon-clone-votv.onrender.com/admin/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setFdata(products.filter((prod) => prod.category === selectedCategory));
  };
  const handleSelectSubCategory = (selectedSubCategory) => {
    axios
      .get(
        `https://amazon-clone-votv.onrender.com/admin/products/${selectedSubCategory}`
      )
      .then((res) => {
        setFdata(res.data);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div className=" w-full bg-gray-150 h-10 border shadow-sm">
        <ul className=" w-full h-full flex items-center ml-4 space-x-8">
          <li
            className=" hover:font-bold cursor-pointer"
            onClick={() => handleSelectCategory("Allproducts")}
          >
            All
          </li>
          <li
            className=" hover:font-bold group relative cursor-pointer h-full flex items-center"
            onClick={() => handleSelectCategory("Electronics")}
          >
            Electronics
            <div className=" hidden arrow-box   absolute  top-10  bg-white border shadow-md p-2 group-hover:inline">
              <div className=" text-[12px] font-thin space-y-3  w-[100%] p-3 ">
                <li onClick={() => handleSelectSubCategory("Smartphones")}>
                  Smartphones
                </li>
                <li onClick={() => handleSelectSubCategory("Laptop")}>
                  Laptop
                </li>
              </div>
            </div>
          </li>
          <li
            className=" hover:font-bold group sticky cursor-pointer h-full flex items-center"
            onClick={() => handleSelectCategory("Fashion")}
          >
            Fashion
            <div className=" arrow-box hidden   absolute z-20  top-10  -left-12 bg-white border shadow-md p-2 group-hover:inline">
              <div className=" text-[12px] font-thin space-y-3 w-[150px] p-3 cursor-pointer">
                <li onClick={() => handleSelectSubCategory("Men's Clothing")}>
                  Men's Clothing
                </li>
                <li onClick={() => handleSelectSubCategory("Women's Clothing")}>
                  Women's Clothing
                </li>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h1 className=" font-bold text-[20px] p-2">
        Click the product you want to edit
      </h1>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {category === "Allproducts" ? (
          <>
            {products.map((product) => {
              return (
                <Link to={`/adminHome/editproduct/${product._id}`}>
                  <div className="w-72 flex flex-col justify-center items-center bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <img
                      src={product.image}
                      alt="Product"
                      className="h-72 w-fit object-cover rounded-t-xl"
                    />
                    <div className="px-4 py-3 w-72">
                      <span className="text-gray-400 mr-3 uppercase text-xs">
                        {product.subcategory}
                      </span>
                      <p className="text-lg font-bold text-black truncate block capitalize">
                        {product.title}
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        ) : (
          <>
            {fData.map((product) => {
              return (
                <Link to={`/adminHome/editproduct/${product._id}`}>
                  <div className="w-72 flex flex-col justify-center items-center bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <img
                      src={product.image}
                      alt="Product"
                      className="h-72 w-fit object-cover rounded-t-xl"
                    />
                    <div className="px-4 py-3 w-72">
                      <span className="text-gray-400 mr-3 uppercase text-xs">
                        {product.subcategory}
                      </span>
                      <p className="text-lg font-bold text-black truncate block capitalize">
                        {product.title}
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </section>
    </div>
  );
};

export default Allproducts;
