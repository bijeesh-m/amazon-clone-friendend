import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(`https://amazon-clone-votv.onrender.com/admin/orders?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
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
  return (
    <div className="  flex justify-center flex-col items-center p-3">
      <div className=" w-[90%] min-h-[80vh] bg-white border rounded-lg ">
        <div className=" w-full   h-12 flex items-center p-1">
          <input
            type="text"
            className=" w-[25%] h-[6%] p-3 outline-none bg-transparent"
            placeholder="Search users"
          />
        </div>
        <div className="  w-full text-[#8794a1] text-sm   h-14 bg-[#f8fafd] flex justify-between p-4 items-center">
          <div className=" w-1/4 bg ">
            <p>ORDER</p>
          </div>
          <div className=" w-1/4 bg ">
            <p>DATE</p>
          </div>
          <div className=" w-1/4 bg ">
            <p>CUSTOMER</p>
          </div>
          <div className=" w-1/4 bg ">
            <p>PAYMENT STATUS</p>
          </div>
        </div>
        {orders.map((order) => {
          return (
            <Link to={`/adminHome/orderdetails/${order.orderId}`}>
              <div
                key={order._id}
                className=" w-full h-16 text-[#738292] hover:bg-[#f2f3f5] flex justify-between p-4 items-center"
              >
                <div className=" w-1/4 bg ">
                  <p className=" text-xs md:text-base ">{order.orderId}</p>
                </div>
                <div className=" w-1/4 bg ">
                  <p className=" text-xs md:text-base ">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className=" w-1/4 bg ">
                  <p className=" text-xs md:text-base ">
                    {order.user.username}
                  </p>
                </div>
                <div className=" w-1/4 bg ">
                  <p className=" text-xs md:text-base ">{order.status}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className=" flex justify-end w-[90%]   mt-1">
        <div className="  w-1/5  flex justify-between items-center">
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
    </div>
  );
};

export default Orders;
