import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { myContext } from "../App";
import toast from "react-hot-toast";

const Category = () => {
  const [products, setProducts] = useState([]);
  const { user, cartCount, setCartCount } = useContext(myContext);
  const [subCategory, setSubCategory] = useState("");
  const [sortBy, setSortBy] = useState("high-to-low");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    setSubCategory("");
    location.reload;
    axios
      .get(`https://amazon-clone-votv.onrender.com/user/products/${category}`)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {});
  }, [category, reload]);

  const sortedProducts = products.sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    if (sortBy === "high-to-low") {
      return priceB - priceA;
    }
    return priceA - priceB;
  });

  const filteredProducts = subCategory
    ? sortedProducts.filter((product) => product.subcategory === subCategory)
    : sortedProducts;

  const subcategories = [...new Set(products.map((item) => item.subcategory))];

  const handleAddToCart = (prodId) => {
    const toastId = toast.loading("Loading...");
    axios
      .post(
        `https://amazon-clone-votv.onrender.com/user/addtocart/${prodId}`,
        user,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setCartCount(cartCount + 1);
        toast.success("Item added to cart", { id: toastId });
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          toast.error("Please login to continue", { id: toastId });
        } else {
          toast.error("Item already in a cart", { id: toastId });
        }
      });
  };

  return (
    <div className="  flex flex-col items-center">
      {loading ? (
        <div className="  w-full h-[85vh] flex justify-center items-center  bg-white">
          <img
            src="https://res.cloudinary.com/dunf6rko6/image/upload/v1707026965/loading-4x-gray._CB485916689__yee9mc.gif"
            alt="loading"
          />
        </div>
      ) : (
        <div>
          <div className="w-full flex h-[49px] justify-between items-center border shadow-sm">
            <ul className="flex items-center h-full ml-2 space-x-4 w-[70%] ">
              <h1 className=" font-bold">{category}</h1>
              <li className="group relative flex h-full items-center justify-center ">
                Mobiles & Accessories
                <div className=" hidden arrow  h-[60vh] absolute mt-[69vh] left-0 bg-white border shadow-md p-2 group-hover:inline">
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
                <ul className=" hidden arrow justify-evenly  h-[60vh] absolute  mt-[69vh] left-0 bg-white border shadow-md p-2 group-hover:inline">
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
                <ul className=" hidden arrow  justify-evenly  h-[60vh] absolute  mt-[69vh] left-0 bg-white border shadow-md p-2 group-hover:inline">
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
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="low-to-high">Price:Low to high</option>
              <option value="high-to-low" selected>
                Price:High to low
              </option>
            </select>
          </div>
          <div className="  flex">
            <div className=" p-2 pt-4  w-[15%] flex flex-col">
              <h1 className=" text-[18px] mb-2 font-bold">Category</h1>
              <h3
                className=" text-[16px] font-semibold mb-1 cursor-pointer"
                onClick={() => setReload(!reload)}
              >
                {category}
                {">>"}
              </h3>
              {category && (
                <>
                  {subcategories.map((item) => {
                    return (
                      <h5
                        className=" cursor-pointer mb-1"
                        onClick={() => {
                          setSubCategory(item);
                        }}
                      >
                        {item}
                      </h5>
                    );
                  })}
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
                              {(() => {
                                const currentDate = new Date();
                                currentDate.setDate(currentDate.getDate() + 3);
                                const formattedDate =
                                  currentDate.toLocaleDateString();
                                return formattedDate;
                              })()}
                            </span>{" "}
                            <br />
                            FREE Delivery by Amazon
                          </p>
                          <button
                            onClick={() => handleAddToCart(data._id)}
                            className=" flex items-start mb-2"
                          >
                            <p className="text-[13px] py-1 px-2  bg-[#FFD814] rounded-2 ">
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
      )}
    </div>
  );
};

export default Category;
