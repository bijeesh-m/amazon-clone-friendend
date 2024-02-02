import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewOrders = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    const toastId = toast.loading("Loading...");
    axios
      .get(`https://amazon-clone-votv.onrender.com/user/vieworder/${id}`)
      .then((res) => {
        setOrder(res.data);
        setProducts(res.data.products);
        setAddress(res.data.user.address);
        toast.remove(toastId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className=" flex justify-center p-10">
      <div className=" bg-[#f9fafb] w-[90%]  flex flex-col rounded-lg items-center justify-center pt-4 space-y-7">
        <div className=" flex w-[90%] py-2 justify-between">
          <p className=" text-[20px] font-semibold">Order #{order.orderId}</p>
          <p className="">Order placed {order.createdAt}</p>
        </div>
        <div className=" w-[90%] bg-white flex   p-4 rounded-lg ">
          <div className=" flex w-1/2 flex-col space-y-3">
            {products.map((product) => {
              return (
                <div key={product._id} className="   flex   space-x-10 w-full ">
                  <div className="  rounded-lg  w-1/4 ">
                    <img src={product.image} alt="" />
                  </div>
                  <div className=" space-y-2 w-1/2 ">
                    <div className=" font-bold ">{product.title}</div>
                    <div className="text-[14px] font-semibold">
                      ₹ {product.price.toLocaleString()}
                    </div>
                    <div className=" text-[14px] text-gray-500">
                      {product.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" w-1/2   ml-4 pl-2 space-y-2">
            <div className=" font-bold ">Delivery address</div>
            <div className=" text-[14px] text-gray-500">
              {address && address.area}
              <br />
              {address && address.landmark + ","} <br />
              {address && address.pin}
            </div>
          </div>
        </div>
        <div className=" w-[90%] bg-[#f3f4f6] rounded-lg flex justify-end p-4">
          <div className=" flex justify-between w-1/3 flex-col space-y-5">
            <div className=" flex justify-between w-full">
              <div>Sub total</div>
              <div>₹ {order && (order.totalPrice - 40).toLocaleString()}</div>
            </div>
            <hr />
            <div className=" flex justify-between w-full">
              <div>Shipping</div>
              <div>₹ 40</div>
            </div>
            <hr />

            <div className=" flex justify-between w-full">
              <div>Order total</div>
              <div>
                ₹{order.totalPrice && order.totalPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex items-center bg-white rounded-lg flex-col justify-center w-[90%]  mb-5 p-2">
          <div className=" w-full font-bold text-[20px] p-3 mb-5">
            <p>Order status</p>
          </div>
          <div class="w-[80%] bg-gray-50 border  rounded-full h-4  flex items-center p-1">
            <div
              className={`bg-green-600 h-2.5 rounded-l transition-width duration-[1s] ease-linear delay-1000
    ${
      order.status === "Pending"
        ? "w-[33.33%]"
        : order.status === "Shipped"
        ? "w-[66.66%]"
        : order.status === "Delivered"
        ? "w-[100%]"
        : "w-0"
    }`}
            ></div>
            <div className="bg-white border w-7 h-7 rounded-full flex justify-center items-center -translate-x-[0.5px]">
              ✔️
            </div>
          </div>
          <div class=" w-[80%]  flex mt-5 font-bold mb-5 text-gray-400">
            <div className="w-1/3 flex justify-between ">
              <p className=" -translate-x-8">Ordered</p>
              <p
                className={`translate-x-11 ${
                  order.status === "Pending" && "text-black"
                }`}
              >
                Pending
              </p>
            </div>
            <p
              className={`w-1/3 flex translate-x-11 justify-end ${
                order.status === "Shipped" && "text-black"
              }`}
            >
              {" "}
              Shipped
            </p>
            <p
              className={`w-1/3 flex justify-end translate-x-6 ${
                order.status === "Delivered" && "text-black"
              }`}
            >
              Delivered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
