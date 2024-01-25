import React, { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { myContext } from "../App";
const FormFill = () => {
  const navigate = useNavigate();

  const data = localStorage.getItem("accToken");
  const user = jwtDecode(data);
  const [inputValues, SetInputValues] = useState({
    username: user.name,
    email: user.email,
    password: "",
  });
  const [inputError, setInputError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate(inputValues);
    setInputError(error);

    if (Object.keys(error).length === 0) {
      axios
        .post("https://amazon-clone-votv.onrender.com/user/googlefill", inputValues, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.data === "success") {
            console.log("success");
            toast.success("Registration success");
            localStorage.setItem("user",res.data.token)
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error("User already exist");
          console.log(err.message);
        });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "username is required";
    } else if (values.username.length < 3) {
      errors.username = "the username should have minimum 3 characters";
    } else if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 3) {
      errors.password = "the password should have minimum 3 characters";
    }
    return errors;
  };

  return (
    <div className=" flex justify-center">
      <form className="w-[348.5px]  border rounded mt-5">
        <h1 className=" m-3  text-[28px]">Create Account</h1>
        <label className=" text-[13px] font-bold ms-3 " htmlFor="name">
          Your name
        </label>
        <br />
        <input
          className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3  focus:outline-none"
          type="text"
          name="username"
          onChange={handleChange}
          defaultValue={user.name}
          placeholder="  First and last name"
        />
        <p className=" text-[red] text-[11px] ms-3 mb-1 mt-0">
          {inputError.username}
        </p>
        <label className="text-[13px] font-bold ms-3" htmlFor="email">
          Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className=" ms-3   text-[13px]  border rounded-1 w-[312.66px] h-[31px] focus:outline-none"
        />

        <div className="ms-3">
          <label className="text-[13px] font-bold" htmlFor="password">
            Password
          </label>
          <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className=" focus:outline-none focus:border-2   text-[13px] border   rounded-1 w-[312.66px] h-[31px] "
            placeholder="  Enter password"
          />
          <p className=" text-[red] text-[11px] ms-3 mb-1 mt-0">
            {inputError.password}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          id="sign-in-button"
          className="border w-[312.66px] h-[31px] rounded text-[13px] mb-4 ms-3 mt-4 bg-[#FFD814]"
        >
          Create Amazon Account
        </button>
      </form>
    </div>
  );
};

export default FormFill;
