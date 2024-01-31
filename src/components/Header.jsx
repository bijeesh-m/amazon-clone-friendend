import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { myContext } from "../App";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { products } = useContext(myContext);
  const [searchInput, setSearchInput] = useState("");
  const [address, setAddress] = useState("");
  const { cartCount, setCartCount } = useContext(myContext);
  const { user, setUser } = useContext(myContext);
  const token = localStorage.getItem("user");

  const handleAccount = () => {
    if (token) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (token) {
      const userInfo = jwtDecode(token);
      axios
        .get(
          `https://amazon-clone-votv.onrender.com/user/cartcount/${userInfo.userId}`
        )
        .then((res) => {
          setCartCount(res.data.data);
          setAddress(res.data.user.address);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAddress("");
    }
  }, [cartCount, token, setUser, setCartCount]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div>
      <div className="  header-main-div">
        <div className="flex items-center">
          <div className=" ">
            <Link to={"/"}>
              <img
                className=" pt-2"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665506/amazon_6_ujssqw.png"
                width={95}
                alt="Logo"
              />
            </Link>
          </div>
          .in
        </div>

        <div className="locationDiv">
          <div>
            <img
              src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665520/location_hjttnd.png"
              alt="location"
            />
          </div>
          <div>
            <div className=" flex text-[12px]">
              <div>Deliver to </div>
            </div>
            <div className="font-bold text-[14px]">
              {address ? <p>{address.area}</p> : <p>Select your address</p>}
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center group w-[40%]">
          <div className=" flex h-10 w-full bg-[#febd69] rounded-[4px]">
            <div className="select-div">All</div>
            <input
              onChange={handleChange}
              className=" text-black w-full group-focus:outline-yellow-500  focus:outline-none pl-2"
              name="searchbox"
              type="text"
              value={searchInput}
              placeholder="Search Amazon.in"
            />
            <div className=" group w-[10%] flex justify-center items-center cursor-pointer ">
              <HiMagnifyingGlass color=" black" size={25} />
            </div>
          </div>

          {searchInput ? (
            <>
              <div className=" w-full flex justify-center absolute z-1 mt-[26%]">
                <div className=" h-[50vh] w-[41%] bg-white text-[black] overflow-hidden border ">
                  {products
                    .filter((item) => {
                      if (searchInput) {
                        return item.title
                          .toLowerCase()
                          .includes(searchInput.toLowerCase());
                      }
                      return null;
                    })
                    .map((data) => {
                      return (
                        <Link to={`/product/${data._id}`}>
                          <div
                            onClick={() => setSearchInput("")}
                            className="  overflow-auto  w-[100%] p-2 hover:bg-gray-300"
                            key={data._id}
                          >
                            {data.title}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="region-select">
          <img
            src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665518/indiaFlag_u0pk2t.png"
            alt="region"
          />
          EN
        </div>
        <div className="account-btn">
          <div onClick={handleAccount} className=" cursor-pointer">
            <div className="text-[12px] flex ">
              Hello,
              {token ? (
                <p className=" ml-1">{user.username}</p>
              ) : (
                <p className=" ml-1">Sign in</p>
              )}
            </div>
            <div className="font-bold text-[14px]  ">Account & Lists</div>
          </div>
        </div>
        <div className="order">
          <Link to={"/orders"}>
            <div>
              <div className=" text-[14px]">Returns</div>
              <div className="font-bold text-[14px]">& Orders</div>
            </div>
          </Link>
        </div>
        {token ? (
          <Link to={"/cart"}>
            <div className=" flex mt-8">
              <div className=" mb-7">
                <img
                  width={35}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1704362173/cart_1_rqdywy.svg"
                  alt="cart"
                />
              </div>
              <p className=" text-[#f08509] absolute ms-9 text-[14px] font-bold  ">
                {cartCount}
              </p>
              <p className="mt-[19px] text-[12px] font-bold">Cart</p>
            </div>
          </Link>
        ) : (
          <div
            onClick={() => {
              toast.error("Login requires");
            }}
            className=" flex mt-8"
          >
            <div className=" mb-7">
              <img
                width={35}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1704362173/cart_1_rqdywy.svg"
                alt="cart"
              />
            </div>
            <p className=" text-[#f08509] absolute ms-9 text-[14px] font-bold  ">
              {cartCount}
            </p>
            <p className="mt-[19px] text-[12px] font-bold">Cart</p>
          </div>
        )}
      </div>
      <div className="action-bar">
        <div className="left-actionbar">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              width={20}
              src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665520/menu_lj46zj.png"
              alt="menu"
            />
            &nbsp;All
          </div>
          <div>Fresh</div>
          <div>Prime</div>
          <Link to={`/products/Fashion`}>
            <div>Fashion</div>
          </Link>
          <Link to={`/products/Electronics`}>
            <div>Electronics</div>
          </Link>
          <div>Today's Deals</div>
          <div>Subscribe & Save</div>
          <div>Amazon miniTV</div>
          <div>Sell</div>
          <div>Buy Again</div>
        </div>
        <div className="right-actionbar">New Launches Shop Now</div>
      </div>
    </div>
  );
};

export default Header;
