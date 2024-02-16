import React, { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../App";

const Account = () => {
  const { setCartCount } = useContext(myContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    axios
      .get("https://amazon-clone-votv.onrender.com/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Logout success");
        navigate("/");
        setCartCount(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" w-[100%] h-[83vh] flex justify-center p-3">
      <div className="w-[1000px] ">
        <h1 className=" text-[28px] mb-3">Your Account</h1>
        <div className="grid grid-cols-3 gap-[20px] ">
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                width={66}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665508/box_dsk4ti.png"
                alt=""
              />
            </div>
            <Link to={"/orders"}>
              <div className="p-2">
                <h1 className="  mb-1 text-[17px]">Your orders</h1>
                <p className=" text-[14px] text-[#687782]">
                  Track, return, or buy things again
                </p>
              </div>
            </Link>
          </div>
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                width={66}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665523/signlock_syawr8.png"
                alt=""
              />
            </div>
            <div className="p-2">
              <h1 className="  mb-1 text-[17px]">Login & security</h1>
              <p className=" text-[14px] text-[#687782]">
                Edit login, name, and mobile number
              </p>
            </div>
          </div>
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                width={66}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665521/prime_anhtek.png"
                alt=""
              />
            </div>
            <div className="p-2">
              <h1 className="  mb-1 text-[17px]">Prime</h1>
              <p className=" text-[14px] text-[#687782]">
                View benefits and payment settings
              </p>
            </div>
          </div>
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                width={66}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665508/address_udur4n.png"
                alt=""
              />
            </div>
            <Link to={"/address"}>
              <div className="p-2">
                <h1 className="  mb-1 text-[17px]">Your Addresses</h1>
                <p className=" text-[14px] text-[#687782]">
                  Edit addresses for orders and gifts
                </p>
              </div>
            </Link>
          </div>
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                width={66}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665520/payment_zu6sx7.png"
                alt=""
              />
            </div>
            <div className="p-2">
              <h1 className="  mb-1 text-[17px]">Payment options</h1>
              <p className=" text-[14px] text-[#687782]">
                Edit or add payment methods
              </p>
            </div>
          </div>
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                width={66}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665508/apay_msvd5o.png"
                alt=""
              />
            </div>
            <div className="p-2">
              <h1 className="  mb-1 text-[17px]">Amazon Pay balance</h1>
              <p className=" text-[14px] text-[#687782]">
                Add money to your balance
              </p>
            </div>
          </div>
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                width={66}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665513/contact_mwgfhg.png"
                alt=""
              />
            </div>
            <div className="p-2">
              <h1 className="  mb-1 text-[17px]">Contact Us</h1>
            </div>
          </div>
          <div className=" border flex p-2 rounded min-h-[101.33px]">
            <div>
              <img
                className=" w-[180px] h-[66px]"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665507/abusiness_ow6qij.jpg"
                alt=""
              />
            </div>
            <div className="p-2">
              <h1 className="  mb-1 text-[17px]">Your business account</h1>
              <p className=" text-[14px] text-[#687782]">
                Sign up to save up to 28% with GST invoice and bulk discounts,
                purchase on credit, and more
              </p>
            </div>
          </div>
          <div
            onClick={handleLogOut}
            className=" cursor-pointer border flex p-2 rounded min-h-[101.33px]"
          >
            <div>
              <img
                className=" w-[66px] h-[66px]"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1704446118/icons8-logout-100_b6yfpx.png"
                alt=""
              />
            </div>
            <div className="p-2">
              <h1 className="  mb-1 text-[17px]">Log Out</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
