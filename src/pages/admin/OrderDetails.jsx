import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const [address, setAddress] = useState({});
  const [products, setProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://amazon-clone-votv.onrender.com/admin/orders/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrder(res.data);
        setProducts(res.data.products);
        setAddress(res.data.user.address);
        setOrderStatus(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSave = (orderId) => {
    const toastId = toast.loading("Loading...", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#febd69",
      },
    });
    axios
      .put(
        `https://amazon-clone-votv.onrender.com/admin/order/${orderId}`,
        {
          orderStatus,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Look at my styles.", {
          id: toastId,
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="  w-full flex justify-center px-3  py-1 mt-1">
        <div className=" w-[90%] ">
          <Link to={"/adminHome/orders"}>
            <button className=" rounded-md py-2 px-3 text-gray-500 bg-white shadow-md border ">
              ⬅️Back
            </button>
          </Link>
        </div>
      </div>

      <div className="  flex justify-center items-center ">
        <div className=" w-[90%]    p-3 mt-1">
          <div className=" w-full text-[24px]  font-bold flex flex-col justify-center ">
            <p>Order #{order.orderId}</p>
          </div>
          <div className="  w-full h-full bg- rounded-lg  text-[14px] space-x-2 flex mt-6 ">
            <div className=" w-3/4   bg-white rounded-lg min-h-[60vh] ">
              <h1 className=" text-[18px]  p-2 mb-2 mt-3 ">Order Details</h1>
              <hr className=" opacity-10" />
              {order &&
                products.map((product) => {
                  return (
                    <div
                      key={product._id}
                      className=" rounded-lg flex w-full flex-col mb-2 mt-2  space-x-1"
                    >
                      <div className=" flex space-x-3">
                        <div className=" w-1/3 h-[20vh] bg-white  flex justify-center items-center">
                          <img className=" h-full" src={product.image} alt="" />
                        </div>
                        <div className=" w-1/3  ">
                          <p>{product.title}</p>
                        </div>
                        <div className=" w-1/4  ">
                          <p>{product.qty}</p>
                        </div>

                        <div className=" w-1/3   ">
                          <p>₹{product.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className=" w-full flex justify-center items-center">
                        <hr className=" opacity-10 w-[96%] mt-3" />
                      </div>
                    </div>
                  );
                })}
              <div className=" w-full  rounded-b-lg ">
                <div className=" flex w-full justify-end p-2 ml-2 space-x-3">
                  <p className=" w-1/3 ">Sub total</p>
                  <p className=" w-1/5 ">:</p>
                  <p className=" w-1/3 ">
                    ₹
                    {order.totalPrice &&
                      (order.totalPrice - 40).toLocaleString()}
                  </p>
                  <p className=" w-1/3 "></p>
                  <p className=" w-1/3 "></p>
                </div>
                <div className="  flex  w-full p-2 ml-2 space-x-3">
                  <p className=" w-1/3 ">Shipping fee</p>
                  <p className=" w-1/5 ">:</p>
                  <p className=" w-1/3 ">₹40</p>
                  <p className=" w-1/3 "></p>
                  <p className=" w-1/3 "></p>
                </div>
                <div className="  flex  w-full p-2 ml-2 space-x-3">
                  <p className=" w-1/3 ">Total</p>
                  <p className=" w-1/5 ">:</p>
                  <p className=" w-1/3 ">
                    ₹{order.totalPrice && order.totalPrice.toLocaleString()}
                  </p>
                  <p className=" w-1/3 "></p>
                  <p className=" w-1/3 "></p>
                </div>
                <div className="  flex  w-full ml-2 p-2 space-x-3">
                  <p className=" w-1/3 ">Order Status</p>
                  <p className=" w-1/5  ">:</p>
                  <select
                    className=" w-1/3 border outline-none bg-gray-200 text-[16px] p-1 rounded"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <p className=" w-1/3 "></p>
                  <p className=" w-1/3 "></p>
                </div>
                <div className="  flex  w-full  p-2 space-x-3">
                  <p className=" w-1/3 "></p>
                  <p className=" w-1/5  "></p>
                  <p className=" w-1/3  "></p>
                  <p className=" w-1/3 "></p>
                  <button
                    onClick={() => handleSave(order.orderId)}
                    className="w-1/3 rounded-sm text-white p-1 bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className=" w-1/2 bg-white rounded-lg  space-y-3">
              <p className=" text-[18px] mb-3 mt-3 ml-2">Customer</p>
              <hr className=" opacity-10" />
              <div className="  p-2 ms-4 flex items-center space-x-3 text-[16px] text-[#748294]">
                <div className=" w-[50px] bg-gray-400 rounded-full h-[50px] flex justify-center items-center">
                  👤
                </div>
                <h1>{order.user && order.user.username}</h1>
              </div>
              <div className=" w-full justify-center flex">
                <hr className="  opacity-10  w-[89%]" />
              </div>
              <div className="  pl-2 ms-4 flex justify-center flex-col space-x-3 text-[16px] text-[#748294]">
                <p className=" text-black">Contact info</p>
              </div>

              <div className=" text-[#748294]   pl-2 ms-4 flex items-center space-x-3">
                <h1>{order.user && order.user.email}</h1>
              </div>
              <div className=" text-[#748294]   pl-2 ms-4 flex items-center space-x-3">
                <h1>+91 {address && address.phone}</h1>
              </div>
              <div className=" w-full justify-center flex">
                <hr className=" opacity-10 w-[89%]" />
              </div>
              <div className="  pl-2 ms-4 flex justify-center flex-col space-x-3 text-[16px] text-[#748294]">
                <p className=" text-black">Shipping address</p>
              </div>
              <div className=" text-[#748294]   pl-2 ms-4 flex items-center space-x-3">
                <h1>{address && address.area}</h1>
              </div>
              <div className=" text-[#748294]   pl-2 ms-4 flex items-center space-x-3">
                <h1>{address && address.landmark}</h1>
              </div>
              <div className=" text-[#748294]   pl-2 ms-4 flex items-center space-x-3">
                <h1> {address && address.pin}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
