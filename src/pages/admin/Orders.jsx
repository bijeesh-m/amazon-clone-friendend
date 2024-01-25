import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/admin/orders`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" h-full flex justify-center items-center p-3">
      <div className=" w-[90%] h-full bg-white border rounded-lg ">
        <div className=" w-full   h-12 flex items-center p-1">
          <input
            type="text"
            className=" w-[25%] h-[6%] p-3 outline-none bg-transparent"
            placeholder="Search users"
          />
        </div>
        <div className="  w-full text-[#8794a1] text-[12px] h-14 bg-[#f8fafd] flex justify-between p-4 items-center">
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
            <Link to={`/adminHome/orderdetails/${order._id}`}>
              <div
                key={order._id}
                className=" w-full h-16 text-[#738292] text-[14px] hover:bg-[#f2f3f5] flex justify-between p-4 items-center"
              >
                <div className=" w-1/4 bg ">
                  <p>{order._id}</p>
                </div>
                <div className=" w-1/4 bg ">
                  <p>{order.createdAt}</p>
                </div>

                <div className=" w-1/4 bg ">
                  <p>{order.user.username}</p>
                </div>
                <div className=" w-1/4 bg ">
                  <p>{order.status}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
