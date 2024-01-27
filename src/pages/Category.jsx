import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { myContext } from "../App";
import toast from "react-hot-toast";

const Category = () => {
  const [products, setProducts] = useState([]);
  const { user, cartCount, setCartCount } = useContext(myContext);
  const [subCategory, setSubCategory] = useState("");
  const { category } = useParams();

  console.log(category, subCategory);

  useEffect(() => {
    setSubCategory("");
    axios
      .get(`https://amazon-clone-votv.onrender.com/user/products/${category}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  const filteredProducts = subCategory
    ? products.filter((product) => product.subcategory === subCategory)
    : products;

  const handleAddToCart = (prodId) => {
    axios
      .post(`https://amazon-clone-votv.onrender.com/user/addtocart/${prodId}`, user, {
        withCredentials: true,
      })
      .then((res) => {
        setCartCount(cartCount + 1);
        toast.success("Item added to cart");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === "Unauthorized") {
          toast.error("Please login to continue");
        } else {
          toast.error("Item already in a cart");
        }
      });
  };

  return (
    <div className="  flex flex-col items-center">
      <div className="w-full flex h-[49px] justify-between items-center border shadow-sm">
        <ul className="flex items-center h-full ml-2 space-x-4 w-[70%] ">
          <h1 className=" font-bold">{category}</h1>
          <li className="group relative flex h-full items-center justify-center ">
            Mobiles & Accessories
            <div className=" hidden  h-[60vh] absolute mt-[400px] left-0 bg-white border shadow-md p-2 group-hover:inline">
              <div className=" text-[13px] flex w-[100%] p-3  ">
                <div className=" w-[200px]">
                  <li>Mobiles</li>
                  <li>Mobile accessories</li>
                  <li>Screen guards</li>
                  <li>Power Banks</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                </div>
                <div>
                  <li>Mobiles</li>
                  <li>Mobile accessories</li>
                  <li>Screen guards</li>
                  <li>Power Banks</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                </div>
              </div>
            </div>
          </li>
          <li className="group relative h-full flex items-center ">
            Laptop & Accessories
            <ul className=" hidden justify-evenly  h-[60vh] absolute  mt-[400px] left-0 bg-white border shadow-md p-2 group-hover:inline">
              <div className=" text-[13px] flex w-[100%] p-3 ">
                <div className=" w-[200px]">
                  <li>Laptop</li>
                  <li>Laptop accessories</li>
                  <li>Screen guards</li>
                  <li>Power Banks</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                </div>
                <div>
                  <li>Laptop</li>
                  <li>Laptop accessories</li>
                  <li>Screen guards</li>
                  <li>Power Banks</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                </div>
              </div>
            </ul>
          </li>
          <li className="group relative h-full flex items-center ">
            Laptop & Accessories
            <ul className=" hidden justify-evenly  h-[60vh] absolute  mt-[400px] left-0 bg-white border shadow-md p-2 group-hover:inline">
              <div className=" text-[13px] flex w-[100%] p-3 ">
                <div className=" w-[200px]">
                  <li>Laptop</li>
                  <li>Laptop accessories</li>
                  <li>Screen guards</li>
                  <li>Power Banks</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                </div>
                <div>
                  <li>Laptop</li>
                  <li>Laptop accessories</li>
                  <li>Screen guards</li>
                  <li>Power Banks</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                  <li>Cases & Covers</li>
                </div>
              </div>
            </ul>
          </li>
        </ul>
      </div>
      <div className=" w-full flex h-[39px] justify-between items-center border shadow-sm">
        <p className="ms-2">
          {filteredProducts.length} results for "
          {subCategory ? subCategory : category}"
        </p>
        <select
          className=" focus:outline-none border rounded bg-[#F0F2F2] shadow-sm h-[20px] mx-2"
          name="sort"
        >
          <option value="low to high">Price:Low to high</option>
          <option value="low to high">Price:High to low</option>
        </select>
      </div>
      <div className="  flex">
        <div className=" p-2 pt-4  w-[15%] flex flex-col">
          <h1 className=" text-[18px] mb-2 font-bold">Category</h1>
          <h3 className=" text-[16px] font-semibold mb-1">
            {category}
            {">>"}
          </h3>
          {category === "Electronics" ? (
            <>
              <h5
                className=" cursor-pointer mb-1"
                onClick={() => {
                  setSubCategory("Smartphones");
                }}
              >
                Mobiles
              </h5>
              <h5
                className=" cursor-pointer mb-1"
                onClick={() => {
                  setSubCategory("Laptop");
                }}
              >
                Laptops
              </h5>
            </>
          ) : (
            <>
              <h5
                className=" cursor-pointer"
                onClick={() => {
                  setSubCategory("Men's Clothing");
                }}
              >
                Men's Clothing
              </h5>
              <h5
                className=" cursor-pointer"
                onClick={() => {
                  setSubCategory("Women's Clothing");
                }}
              >
                Women's Clothing
              </h5>
            </>
          )}
        </div>{" "}
        <div className="w-[80%]  mt-4">
          <div className="mb-1">
            <h1 className=" text-[20px]">Results</h1>
            <p className=" text-[14px]">
              Check each product page for other buying options.
            </p>
          </div>
          <div className="  category">
            {products &&
              filteredProducts.map((data) => {
                return (
                  <div
                    key={data._id}
                    className=" h-[300px] w-full bg-[#F7F7F7] flex  mb-2 border rounded-1"
                  >
                    <div className=" w-[30%] flex justify-center p-3">
                      <Link to={`/product/${data._id}`}>
                        <img
                          className="  max-h-[100%]"
                          src={data.image}
                          alt="jbl"
                        />
                      </Link>
                    </div>
                    <div className=" flex flex-col justify-between bg-white p-2 border w-full  rounded-br rounded-tr">
                      <h1 className="text-[18px] mt-2">
                        {data.title} |{data.description}
                      </h1>
                      <h3 className=" text-[28px]">₹{data.price}</h3>
                      <p className=" text-[14px]">
                        Get it by{" "}
                        <span className=" font-semibold">
                          Sunday, 17 December
                        </span>{" "}
                        <br />
                        FREE Delivery by Amazon
                      </p>
                      <button
                        onClick={() => handleAddToCart(data._id)}
                        className=" flex items-start mb-2"
                      >
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
      </div>
    </div>
  );
};

export default Category;
