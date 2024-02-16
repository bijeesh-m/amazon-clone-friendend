import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const toastId = toast.loading("Loading...");
    axios
      .get(`https://amazon-clone-votv.onrender.com/user/orders?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data);
        toast.remove(toastId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  console.log(orders.length);

  return (
    <div className="w-full min-h-[100vh]  flex items-center flex-col p-4 ">
      <div className="     h-10 w-[70%] flex items-center top-23 ">
        <h1 className=" text-[26px] font-semibold ">Your Orders</h1>
      </div>

      {orders.map((order) => {
        return (
          <div
            key={order._id}
            className=" m-h-[40%] rounded  w-[70%]  flex flex-col justify-between text-[12px] my-2"
          >
            <div className=" m-h-28   flex border   rounded-t-lg  justify-around bg-[#f0f2f2]">
              <div className="w-[40%] flex items-center justify-between mx-3 p-3">
                <div>
                  <span className=" text-[12px]">
                    {" "}
                    ORDER {order.status.toUpperCase()}{" "}
                  </span>{" "}
                  <br />
                  <span className=" text-[14px]">{order.createdAt}</span>
                </div>
                <div>
                  <span className=" text-[12px]"> TOTAL</span> <br />
                  <span className=" text-[14px]">
                    ₹{order.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className=" flex flex-col  w-[60%]   items-end mr-5 my-3">
                <div className=" text-[12px]">ORDER # {order.orderId}</div>
                <Link to={`/vieworder/${order.orderId}`}>
                  <p className=" text-[14px] text-[#198197]">
                    View order details
                  </p>
                </Link>
              </div>
            </div>
            <div className=" border ">
              {order.products.map((product) => {
                return (
                  <div key={product._id} className=" flex  w-full flex-col  mx-4 mb-1">
                    <p className=" text-lg font-semibold">{order.status==="Delivered"&&"Order Delivered"}</p>
                    <div className=" flex w-full justify-center space-x-3 space-y-2">
                      <div className="w-[10%]   flex justify-center items-center p-1">
                        <Link to={`/product/${product._id}`}>
                          <img
                            className=" p-1  w-fit"
                            src={product.image}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className=" w-full   space-y-3">
                        <p className=" text-[#198197] text-[14px] w-1/2 ">
                          {product.title}
                        </p>
                        <p className=" text-[#198197] text-[14px] w-1/2 truncate">
                          {product.description}
                        </p>
                        <button className=" bg-[#FFA41C] rounded p-1">
                          Buy again
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[#198197] p-[15px]  text-[14px] m-h-[15vh] border rounded-b-lg">
              Archive order
            </div>
          </div>
        );
      })}
      {orders && (
        <div className=" flex justify-end w-[70%] ">
          <div className=" aria-disabled: w-1/5  flex justify-between items-center">
            <button
              className="  text-white rounded-md py-1 px-2 disabled:bg-gray-300 bg-gray-500"
              onClick={prevPage}
              disabled={page === 1}
            >
              <p>Prev</p>
            </button>
            <span>
              {"<< "}
              {page} {" >>"}
            </span>
            <button
              className="  text-white rounded-md py-1 px-2 disabled:bg-gray-300 bg-gray-500"
              onClick={nextPage}
              disabled={orders.length < 10}
            >
              <p>Next</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
