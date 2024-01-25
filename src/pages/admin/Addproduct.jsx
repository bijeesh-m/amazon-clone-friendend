import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Addproduct = () => {
  const [productDetails, setProductDetails] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleAddProduct = () => {
    const toastId = toast.loading("Adding new product...");
    axios
      .post("http://localhost:3002/admin/addproduct", productDetails)
      .then((res) => {
        console.log(res.data);
        toast.success("Product added successfully", {
          id: toastId,
        });
      })
      .catch((err) => {
        toast.error(err.response.data, { id: toastId });
      });
  };

  console.log(productDetails);
  return (
    <div>
      <div className=" min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className=" w-full relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  +
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Add Product</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Enter product details below
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Product Title</label>
                    <input
                      onChange={handleChange}
                      name="productTitle"
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product title"
                    />
                  </div>
                  <div className=" flex space-x-5">
                    <div className="flex flex-col">
                      <label className="leading-loose">Category</label>
                      <select
                        onChange={handleChange}
                        name="productCategory"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      >
                        <option
                          className=" font-bold bg-slate-200 "
                          value=""
                          disabled
                          selected
                        >
                          Select Category
                        </option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                      </select>
                    </div>

                    <div className="flex flex-col relative">
                      <label className="leading-loose">Subcategory</label>
                      <select
                        onChange={handleChange}
                        name="productSubcategory"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 "
                      >
                        <option
                          className=" font-bold bg-slate-200 "
                          value=""
                          disabled
                          selected
                        >
                          Select Category
                        </option>
                        {productDetails.productCategory === "Electronics" ? (
                          <>
                            <option value="Smartphones">Smartphones</option>
                            <option value="Laptop">Laptop</option>
                          </>
                        ) : (
                          <>
                            <option value="Men's Clothing">
                              Men's Clothing
                            </option>
                            <option value="Women's Clothing">
                              Women's Clothing
                            </option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Product Description</label>
                    <input
                      onChange={handleChange}
                      name="productDescription"
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product description"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Product Price</label>
                    <input
                      onChange={handleChange}
                      name="productPrice"
                      type="number"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product price"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Product Image</label>
                    <input
                      onChange={handleChange}
                      name="productImage"
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product image URL"
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <Link className=" w-full" to={'/adminHome/dashboard'}>
                    <button className="flex border justify-center items-center w-full  text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                      Cancel
                    </button>
                  </Link>

                  <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
