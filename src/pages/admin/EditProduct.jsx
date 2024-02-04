import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const EditProduct = () => {
  const [productDetails, setProductDetails] = useState({});
  const [subcategories, setSubcategories] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://amazon-clone-votv.onrender.com/admin/product/${id}`)
      .then((res) => {
        setProductDetails(res.data);
        updateSubcategories(res.data.category); // Update subcategories initially
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const updateSubcategories = (category) => {
    // Update subcategories based on the selected category
    if (category === "Electronics") {
      setSubcategories(["Smartphones", "Laptop"]);
    } else if (category === "Fashion") {
      setSubcategories(["Men's Clothing", "Women's Clothing"]);
    } else {
      setSubcategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setProductDetails({
        ...productDetails,
        [name]: value,
        subcategory: "",
      });
      updateSubcategories(value);
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };
  const handleEditProduct = () => {
    if (Object.keys(productDetails).length === 0) {
      toast.error("Make any change to update");
    } else {
      const toastId = toast.loading("Updating...");
      axios
        .put(
          `https://amazon-clone-votv.onrender.com/admin/product/${id}`,
          productDetails,
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data, {
            id: toastId,
          });
          navigate("/adminHome/allproducts");
        })
        .catch((err) => {
          console.error("error occur:", err);
          toast.error(err.message, {
            id: toastId,
          });
        });
    }
  };

  return (
    <div>
      <div className="  w-full flex justify-center px-3  py-1 mt-1">
        <div className=" w-[90%] ">
          <Link to={"/adminHome/allproducts"}>
            <button className=" rounded-md py-2 px-3 text-gray-500 bg-white shadow-md border ">
              ⬅️Back
            </button>
          </Link>
        </div>
      </div>
      <div className=" min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className=" w-full relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  ✏️
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Edit Product</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Update the product details below
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Product Title</label>
                    <input
                      defaultValue={productDetails.title}
                      onChange={handleChange}
                      name="title"
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product title"
                    />
                  </div>
                  <div className=" flex space-x-5">
                    <div className="flex flex-col">
                      <label className="leading-loose">Category</label>
                      <select
                        id="caty"
                        value={productDetails.category}
                        onChange={handleChange}
                        name="category"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      >
                        <option
                          className=" font-bold bg-slate-200 "
                          value=""
                          disabled
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
                        id="caty"
                        value={productDetails.subcategory}
                        onChange={handleChange}
                        name="subcategory"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 "
                      >
                        <option
                          className=" font-bold bg-slate-200 "
                          value=""
                          disabled
                        >
                          Select Subcategory
                        </option>
                        {subcategories.map((subcat) => (
                          <option key={subcat} value={subcat}>
                            {subcat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Product Description</label>
                    <input
                      defaultValue={productDetails.description}
                      onChange={handleChange}
                      name="description"
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product description"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Product Price</label>
                    <input
                      defaultValue={productDetails.price}
                      onChange={handleChange}
                      name="price"
                      type="number"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product price"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Product Image</label>
                    <input
                      defaultValue={productDetails.image}
                      onChange={handleChange}
                      name="image"
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Product image URL"
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                    Cancel
                  </button>
                  <button
                    onClick={handleEditProduct}
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  >
                    Update
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

export default EditProduct;
