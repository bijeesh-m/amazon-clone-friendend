import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { myContext } from "../App";
import { isEqual } from "lodash";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupen, setCoupen] = useState([]);
  const token = localStorage.getItem("user");
  const { cartCount, setCartCount, user } = useContext(myContext);

  const handleQuantityChange = (e, prodId) => {
    const toastId = toast.loading("Loading...");

    const newQuantity = e.target.value;
    if (token) {
      const user = jwtDecode(token);
      axios
        .put(
          `https://amazon-clone-votv.onrender.com/user/updatecartquantity/${prodId}/${user.userId}`,
          { quantity: newQuantity },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setCart(res.data);
          toast.remove(toastId);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const toastId = toast.loading("Loading...");
    if (token) {
      const user = jwtDecode(token);
      axios
        .get(`https://amazon-clone-votv.onrender.com/user/cart/${user.userId}`)
        .then((res) => {
          if (!isEqual(cart, res.data.cart)) {
            setCart(res.data.cart);
          }
          toast.remove(toastId);
          setCoupen(res.data.coupen);
          const total = res.data.cart.reduce(
            (total, item) => total + item.price * item.qty,
            0
          );
          setTotalPrice(total);
        });
    }
  }, [token, cart, cartCount]);

  const handleDelete = (prodId) => {
    if (token) {
      const user = jwtDecode(token);
      axios
        .delete(
          `https://amazon-clone-votv.onrender.com/user/deletecartitem/${prodId}/${user.userId}`,
          {
            withCredential: true,
          }
        )
        .then((res) => {
          setCartCount(cartCount + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="p-4 bg-[#EAEDED] flex">
      <div className=" bg-white w-[907px] ">
        <div>
          <h1 className=" text-[28px] p-4 ">Shoping Cart</h1>
        </div>
        <div className=" w-full flex justify-end">
          <p className=" text-[13px] text-[#565959] px-2 ">Price</p>
          <hr />
        </div>
        {cart.map((data) => {
          return (
            <div key={data._id} className=" min-h-[230px]   p-2 mb-2">
              <hr />

              <div className="flex">
                <div className=" max-h-[25%] w-[25%] p-3">
                  <Link to={`/product/${data._id}`}>
                    <img src={data.image} alt="" />
                  </Link>
                </div>

                <div className=" flex flex-col justify-evenly ms-2 w-[1000px]">
                  <div className=" flex justify-between">
                    <h1 className=" text-[18px] w-[500px]">
                      {data.description}
                    </h1>
                    <h1 className=" text-[18px] font-bold">₹{data.price}</h1>
                  </div>
                  <div>
                    <img
                      width={67.5}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665517/Group_75_lj52uz.png"
                      alt=""
                    />
                  </div>
                  <p className=" text-[12px] text-[#565959]">
                    Eligible for FREE Shipping
                  </p>
                  <div className=" flex text-[12px] items-center">
                    <p className=" text-[13px]">Qty: </p>
                    <select
                      className="mx-2 border rounded ms-1 text-[13px] h-[29px]"
                      name="quantity"
                      id="quantity"
                      value={data.qty}
                      onChange={(e) => handleQuantityChange(e, data._id)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>

                    <span className=" flex  text-[#007185]">
                      |{" "}
                      <p
                        className=" cursor-pointer"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </p>{" "}
                      | Save for later | See more like this | Share
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ms-4 ">
        <div className="flex flex-col       items-start justify-evenly p-3      w-[300px] bg-white h-[200px] ">
          <p className=" text-[12px] font-bold text-[#009674]">
            Your order is eligible for FREE Delivery.
          </p>
          <p className=" text-[12px]">
            Choose FREE Delivery option at checkout.
          </p>
          <div className="flex text-[18px]">
            <h1>Subtotal ({cartCount} items):</h1>
            <span className=" ms-2">₹{totalPrice.toLocaleString()}</span>
          </div>
          <button className=" flex items-start ">
            <Link to={"/payment"}>
              <p className="text-[13px] p-2  bg-[#FFD814] rounded-2 h-[30px] w-[258px] flex items-center justify-center">
                Proceed to Buy
              </p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
