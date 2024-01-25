import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DeleteProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Allproducts");
  const [fData, setFdata] = useState([]);
  const [id, setId] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = (prodId) => {
    setModalOpen(!isModalOpen);
    setId(prodId);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3002/admin/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalOpen]);

  const handleSelectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setFdata(products.filter((prod) => prod.category === selectedCategory));
  };
  const handleSelectSubCategory = (selectedSubCategory) => {
    axios
      .get(`http://localhost:3002/admin/products/${selectedSubCategory}`)
      .then((res) => {
        console.log(res);
        setFdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (prodId) => {
    axios
      .delete(`http://localhost:3002/admin/product/${id}`)
      .then((res) => {
        setModalOpen(!isModalOpen);
        toast.success("Product deleted");
      })
      .catch((err) => console.log(err));
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
            <div className=" arrow-box hidden   absolute  top-10  -left-12 bg-white border shadow-md p-2 group-hover:inline">
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

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {category === "Allproducts" ? (
          <>
            {products.map((product) => {
              return (
                <>
                  <div className=" w-72 flex flex-col justify-center items-center bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl focus-within:rounded-sm">
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
                      <div className="flex items-center justify-center">
                        <img
                          className=" cursor-pointer"
                          onClick={() => handleModalToggle(product._id)}
                          width={50}
                          src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705559290/trash-bin_5028066_ojopmt.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {isModalOpen && (
                    <div
                      id="deleteModal"
                      tabIndex="-1"
                      aria-hidden="true"
                      className="fixed z-1 flex justify-center items-center w-full  "
                    >
                      <div className="relative flex items-center justify-center p-4 w-full max-w-md h-full">
                        <div className="relative p-5 text-center bg-white rounded-lg border sm:p-5">
                          <p class="mb-4 text-black dark:text-gray-300">
                            Are you sure you want to delete this item?
                          </p>
                          <div className=" w-full flex justify-around">
                            <button
                              className=" bg-gray-300 text-[13px]  p-2 rounded-lg text-black"
                              type="button"
                              onClick={handleModalToggle}
                            >
                              No, cancel
                            </button>
                            <button
                              className=" bg-red-600 text-[13px] p-2 rounded-lg text-white"
                              type="button"
                              onClick={handleDelete}
                            >
                              Yes I'm sure
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handleModalToggle}
                            className="text-gray-400 absolute top-2.5 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                          >
                            <span className=" text-[20px]">X</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </>
        ) : (
          <>
            {fData.map((product) => {
              return (
                <>
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
                      <div className="flex items-center justify-center">
                        <button onTa></button>
                        <img
                          className=" cursor-pointer"
                          onClick={() => handleModalToggle(product._id)}
                          width={50}
                          src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705559290/trash-bin_5028066_ojopmt.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {isModalOpen && (
                    <div
                      id="deleteModal"
                      tabIndex="-1"
                      aria-hidden="true"
                      className="fixed z-1 flex justify-center items-center w-full  "
                    >
                      <div className="relative flex items-center justify-center p-4 w-full max-w-md h-full">
                        <div className="relative p-5 text-center bg-white rounded-lg border sm:p-5">
                          <p class="mb-4 text-black dark:text-gray-300">
                            Are you sure you want to delete this item?
                          </p>
                          <div className=" w-full flex justify-around">
                            <button
                              className=" bg-gray-300 text-[13px]  p-2 rounded-lg text-black"
                              type="button"
                              onClick={handleModalToggle}
                            >
                              No, cancel
                            </button>
                            <button
                              className=" bg-red-600 text-[13px] p-2 rounded-lg text-white"
                              type="button"
                              onClick={handleDelete}
                            >
                              Yes I'm sure
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handleModalToggle}
                            className="text-gray-400 absolute top-2.5 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                          >
                            <span className=" text-[20px]">X</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </>
        )}
      </section>
    </div>
  );
};

export default DeleteProducts;
