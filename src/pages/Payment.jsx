import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({});
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [normalPrice, setNormalPrice] = useState(0);
  const [div, setDiv] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [discount, setDiscount] = useState("");
  const [User, setUser] = useState({});
  const [coupen, setCoupen] = useState([]);
  const [coupenCode, setCoupenCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const user = localStorage.getItem("user");

  const [currentDate, setCurrentDate] = useState(new Date());

  const addDays = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 3);
    setCurrentDate(newDate);
  };
  const formattedDate = currentDate.toLocaleString("en-US", {
    month: "short", // Use 'long' for full month names
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    addDays();
  });
  const handleCardDetailsChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpiDetailsChange = (e) => {
    // setUpiDetails(e.target.value);
  };
  useEffect(() => {
    if (user) {
      const userInfo = jwtDecode(user);
      setUser(userInfo);
      axios
        .get(`https://amazon-clone-votv.onrender.com/user/getuser/${userInfo.userId}`)
        .then((res) => {
          setAddress(res.data.user);
          const total = res.data.cart.reduce(
            (total, item) => total + item.price * item.qty,
            0
          );
          setTotalPrice(total);
          setNormalPrice(total);
          setCart(res.data.cart);
          setCoupen(res.data.coupen);
        });
    }
  }, [user]);
  const handlePlaceOrder = async () => {
    if (paymentMethod) {
      if (paymentMethod === "cash on delivery") {
        toast.success("Order placed ");
        navigate(
          `/success?paymentStatus=success&user=${User.userId}&total=${totalPrice}`
        );
      } else {
        if (address) {
          const toastId = toast.loading("Payment processing");
          const stripe = await loadStripe(
            "pk_test_51OETquSEvbsKeMh2TdGZKZccKNThIJHdhhx4kAZfzT3LzmBeJK3jCkTFT1DdkOv6lq8gIT2vZBCSNhXmhoo4l1CT00OD9X0QgO"
          );

          axios
            .post(`https://amazon-clone-votv.onrender.com/user/payment/${User.userId}`, {
              totalPrice,
            })
            .then(async (res) => {
              stripe
                .redirectToCheckout({ sessionId: res.data })
                .then((res) => toast.remove(toastId));
            });
        } else {
          toast.error("Shipping address must be given");
        }
      }
    } else {
      toast.error("Select a payment methode");
    }
  };

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleCoupenChange = (e) => {
    setCoupenCode(e.target.value);
  };
  const handleApplyCoupen = () => {
    const isValid = coupen.find((code) => code.code === coupenCode);
    console.log(isValid);
    if (isValid) {
      setDiscount(isValid.description);
      const discound = (totalPrice * isValid.discountValue) / 100;
      setTotalPrice(Math.round(totalPrice - discound ));
      setDiv(true);
    } else {
      toast.error("Invslid coupen");
    }
  };

  console.log(totalPrice);

  return (
    <div>
      <div className=" flex flex-col items-center mt-3">
        <div className="  flex justify-evenly items-center w-[97%] h-[60px] bg-[#EAEDED]">
          <div className=" flex justify-center w-[20%]">
            <img
              width={103}
              src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665507/amazon_tuwwx3.svg"
              alt="logo"
            />
            <p className="mt-1 ms-1 text-[13px]">.in</p>
          </div>
          <div className=" flex justify-center w-[60%]">
            <h1 className=" text-[28px] ">Checkout</h1>
          </div>
          <div className=" flex justify-center w-[20%]">
            <img
              src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665520/lock_vp14rw.png"
              alt="lock-icon"
            />
          </div>
        </div>
        <div className=" w-[92%] p-3 flex ">
          <div className="  w-[70%] h-screen overflow-auto scroll-none p-l-div">
            <div className=" w-[95%]">
              <div className=" flex justify-between pb-2">
                <div className=" flex text-[18px] font-bold">
                  <h1>1</h1>
                  <h1 className="ms-3 ">Delivery address</h1>
                </div>
                <div className=" text-[14px]">
                  <p>{address && address.name}</p>
                  <p>{address && address.area}</p>
                  <p>
                    {address && address.landmark + ", "}
                    {address && address.pin}
                  </p>
                </div>
                <Link to={"/address"}>
                  <div className=" text-[14px] text-[#047387]">
                    {address ? "Change" : "Add address"}
                  </div>
                </Link>
              </div>
              <div
                className=" flex pt-2 mb-3 font-bold text-[18px] text-[#C45500]"
                style={{ borderTop: "1px solid #B3BFC3" }}
              >
                <h1>2</h1>
                <h1 className="ms-3 ">Select a payment method</h1>
              </div>
              <div className=" border rounded  ms-[30px] p-2">
                <h1
                  className=" text-[18px] font-bold h-[30px]"
                  style={{ borderBottom: "1px solid #B3BFC3" }}
                >
                  Payment method
                </h1>

                <div className=" pl-3">
                  {!div ? (
                    <p className="p-2 ">Apply coupen</p>
                  ) : (
                    <p className="p-2 font-bold">Coupen applied</p>
                  )}
                  <div className="p-2 flex space-x-2  ">
                    {!div ? (
                      <>
                        <input
                          onChange={handleCoupenChange}
                          className=" outline-none pl-2 border rounded-md border-black h-7 shadow-inner  "
                          type="text"
                        />
                        <button
                          onClick={handleApplyCoupen}
                          className="  border rounded-lg bg-white shadow-sm text-[13px]  w-14 h-7"
                        >
                          Apply
                        </button>
                      </>
                    ) : (
                      <p className=" bg-gray-200 text-[12px] p-1">{discount}</p>
                    )}
                  </div>
                </div>
                <div className=" p-2">
                  <div
                    className={`flex items-start mb-3 ${
                      paymentMethod === "card" && "bg-[#FCF5EE] rounded border"
                    }`}
                  >
                    <input
                      checked={paymentMethod === "card"}
                      value="card"
                      onChange={handleChange}
                      className="m-[5px] mx-3 w-[14px] h-[14px]"
                      type="radio"
                      id="radio"
                      name="radiobutton"
                    />
                    <div>
                      <div className=" mb-2">Credit or debit card</div>
                      <img
                        width={269}
                        src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665513/card_ej3p2j.png"
                        alt="card"
                      />
                      {paymentMethod === "card" && (
                        <div className=" mt-2 mb-4 flex flex-col">
                          <p className=" text-[14px]">Enter card details</p>
                          <div>
                            <label
                              className=" mr-4 text-[13px] mb-1"
                              htmlFor="text"
                            >
                              Card no :
                            </label>
                            <input
                              onChange={handleCardDetailsChange}
                              className=" text-[14px] pl-2 border focus:outline-none rounded-sm"
                              id="text"
                              type="text"
                              name="cardnumber"
                              placeholder="Enter card number"
                            />
                          </div>
                          <div>
                            <label
                              className=" mr-1 text-[13px] mb-1"
                              htmlFor="name"
                            >
                              Nickname :
                            </label>
                            <input
                              className=" text-[14px] pl-2 border focus:outline-none rounded-sm"
                              id="name"
                              name="nickname"
                              type="text"
                              onChange={handleCardDetailsChange}
                            />
                          </div>
                          <div>
                            <label
                              className=" mr-[42px] text-[13px] mb-1"
                              htmlFor="cvc"
                            >
                              cvc :
                            </label>
                            <input
                              className=" w-[50px] text-[14px] pl-2 border focus:outline-none rounded-sm"
                              id="name"
                              name="cvc"
                              type="text"
                              onChange={handleCardDetailsChange}
                            />
                          </div>

                          <div className=" flex">
                            <label
                              className=" mr-10 text-[13px] "
                              htmlFor="Exp"
                            >
                              Exp :
                            </label>
                            <div className=" flex">
                              <select
                                id="Exp"
                                name="month"
                                className=" border rounded-sm focus:outline-none  bg-gray-200 mr-2"
                                onChange={handleCardDetailsChange}
                              >
                                {Array.from({ length: 12 }, (_, index) => {
                                  const month = 1 + index;
                                  return (
                                    <option key={month} value={month}>
                                      {month}
                                    </option>
                                  );
                                })}
                              </select>
                              <select
                                id="Exp"
                                className="border rounded-sm focus:outline-none bg-gray-200 mr-2"
                                onChange={handleCardDetailsChange}
                                name="year"
                              >
                                {Array.from({ length: 10 }, (_, index) => {
                                  const year = 2023 + index;
                                  return (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex items-start mb-5">
                    <input
                      checked={paymentMethod === "netbank"}
                      value="netbank"
                      onChange={handleChange}
                      className="m-[5px] mx-3 w-[14px] h-[14px]"
                      type="radio"
                      id="radio"
                      name="radiobutton"
                    />

                    <div>
                      <div className=" mb-2">Net Banking</div>
                      <select
                        name="options"
                        className=" rounded shadow-sm bg-gray-50 border text-[12px] p-1"
                      >
                        <option value="option1">Choose an option</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                    </div>
                  </div>
                  <div
                    className={` flex items-start  mb-2  ${
                      paymentMethod === "upi" && "bg-[#FCF5EE] rounded border"
                    }`}
                  >
                    <input
                      checked={paymentMethod === "upi"}
                      value="upi"
                      onChange={handleChange}
                      className="m-[5px] mx-3 w-[14px] h-[14px] mt-2"
                      type="radio"
                      id="radio"
                      name="radiobutton"
                    />
                    <div className=" mb-3 mt-1">
                      <div className=" mb-2">UPI</div>
                      {paymentMethod === "upi" && (
                        <>
                          <p className=" text-[14px] mb-2">
                            Please enter your UPI ID
                          </p>
                          <input
                            onChange={handleUpiDetailsChange}
                            className=" rounded h-[30px] border shadow-inner text-[13px]"
                            type="text"
                            name="upi"
                            placeholder=" Enter UPI ID"
                          />
                          <button className=" ms-2 w-[57px] h-[30px]  text-[12px] rounded bg-[#FFD814]">
                            Verify
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className=" flex items-start mb-5">
                    <input
                      checked={paymentMethod === "cash on delivery"}
                      value="cash on delivery"
                      onChange={handleChange}
                      className="m-[5px] mx-3 w-[14px] h-[14px]"
                      type="radio"
                      id="radio"
                      name="radiobutton"
                    />
                    <div>
                      <div className=" mb-2">
                        Cash on Delivery/Pay on Delivery
                      </div>
                      <p className=" text-[13px]">
                        Cash, UPI and Cards accepted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className=" flex justify-between  w-full  mt-2 pt-2 border-b"
                style={{ borderTop: "1px solid #B3BFC3" }}
              >
                <div className=" flex font-bold text-[18px] w-1/3 ">
                  <h1>3</h1>
                  <h1 className="ms-3">Items and Delivery</h1>
                </div>
                <div className=" w-1/2  ">
                  <p className=" mb-3 font-semibold text-[13px] text-[#077805]">
                    Delivery date: {formattedDate}
                  </p>
                  {cart.map((item) => {
                    return (
                      <div key={item._id} className=" mb-2  ">
                        <div className=" flex">
                          <img width={50} src={item.image} alt="keyboard" />
                          <p className=" text-[13px] ms-3">
                            <span className=" font-bold">{item.title}</span>{" "}
                            <br />
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="  w-1/ 5  ">
                  <button className=" bg-gray-50 border rounded-1  text-[10px] p-1">
                    Review order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[30%] h-[300px] border rounded p-4 justify-evenly flex flex-col ">
            <div className="text-[18px] font-semibold">Order Summary</div>
            <div className=" flex justify-between text-[14px]">
              <p>Items:</p>
              <p> {(normalPrice).toLocaleString()}</p>
            </div>
            {div && (
              <div className=" flex justify-between text-[14px]">
                <p>Discounted price:</p>
                <div className=" flex space-x-1">
                  <del> ₹{normalPrice}</del>
                  <p>₹{Math.round(totalPrice-40)}</p>
                </div>
              </div>
            )}
            <div className=" flex justify-between text-[14px]">
              <p>Delivery:</p>
              <p> ₹40.00</p>
            </div>

            <hr />
            <div className=" flex justify-between font-semibold text-[#B12A0E] text-[18px]">
              <p className=" ">Oreder Total:</p>
              <p>{Math.round(totalPrice).toLocaleString()}</p>
            </div>
            <button
              className="bg-[#FFD814] rounded p-1 flex justify-center text-[14px]"
              onClick={handlePlaceOrder}
            >
              Place your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
