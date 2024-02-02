import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { myContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(myContext);
  const [inputValues, SetInputValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    axios
      .post("https://amazon-clone-votv.onrender.com/user/login", inputValues, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.data === "success") {
          localStorage.setItem("user", res.data.token);
          const userInfo = JSON.stringify(res.data.user);
          localStorage.setItem("userInfo", userInfo);
          setUser(res.data.user);
          toast.success("Login Success", { id: toastId });
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { id: toastId });
      });
  };

  return (
    <>
      <div>
        <div className=" flex justify-center mt-1 ">
          <div className="flex items-center mt-2 mb-1">
            <div className=" h-[31px] w-[103px]">
              <img
                className="  w-full"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665507/amazon_tuwwx3.svg"
                alt="Logo"
              />
            </div>
            <p className=" ms-1 text-[13px]">.in</p>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[348.5px]  border rounded mt-2"
        >
          <h1 className=" m-3  text-[28px]">Sign in</h1>
          <label className=" text-[13px] font-bold ms-3 " htmlFor="name">
            Email or mobile phone number
          </label>
          <br />
          <input
            name="email"
            value={inputValues.email}
            onChange={handleChange}
            className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3 mb-2 focus:outline-none"
            type="text"
          />

          <div className="ms-3">
            <label className="text-[13px] font-bold" htmlFor="password">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={inputValues.password}
              onChange={handleChange}
              className=" focus:outline-none focus:border-2   text-[13px] border   rounded-1 w-[312.66px] h-[31px] mb-1"
            />
          </div>
          <button className="border w-[312.66px] h-[31px] rounded text-[13px] ms-3 mt-4 bg-[#FFD814] mb-5">
            Login
          </button>
          <p className=" ms-3 text-[12px]">
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
        </form>
      </div>
      <div className=" w-full flex justify-center mt-[30px] ">
        <hr className="w-[348.5px] " />
      </div>
      <div className=" w-full flex flex-col text-[13px] items-center">
        <p className="text-[12px] m-2">New to Amazon</p>
        <Link className="text-[black]" to={"/register"}>
          <button className=" border p-1 w-[348.5px] rounded shadow-sm">
            Create your amazon account
          </button>
        </Link>
      </div>
    </>
  );
};

export default Login;
