import axios from "axios";
import { Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const admin = {
    email: "bijeesh@gmail.com",
    password: "123",
  };
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className=" flex justify-center mt-3 ">
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
      <div className=" w-full flex justify-center mt-3">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          enableReinitialize={true}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
                values.email
              )
            ) {
              errors.email = "Enter a valid email";
            } else if (values.email !== admin.email) {
              errors.email = "Incorrect email";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password !== admin.password) {
              errors.password = "Incorrect password";
            }

            return errors;
          }}
          onSubmit={(values) => {
            axios
              .post("https://amazon-clone-votv.onrender.com/admin/login", values, {
                withCredentials: true,
              })
              .then((res) => {
                toast.success("Login success");
                navigate("/adminHome");
              });
            
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="w-[348.5px]  border rounded mt-2 mb-4"
            >
              <h1 className=" m-3  text-[28px]">Admin Login</h1>
              <label
                className=" text-[13px] font-bold ms-3 "
                htmlFor="username"
              >
                Email
              </label>
              <br />
              <input
                value={values.email}
                onChange={handleChange}
                name="email"
                className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3 mb-2 focus:outline-none"
                type="email"
              />
              <p className=" ms-3 text-[12px] text-[red]">
                {touched.email && errors.email}
              </p>
              <label className=" text-[13px] font-bold ms-3 " htmlFor="mob">
                Password
              </label>
              <br />
              <input
                value={values.password}
                onChange={handleChange}
                name="password"
                className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3 mb-2 focus:outline-none"
                type="password"
              />
              <p className=" ms-3 text-[12px] text-[red]">
                {touched.password && errors.password}
              </p>

              <button
                type="submit"
                className="border w-[312.66px] h-[31px] rounded text-[13px] ms-3 mt-4 bg-[#FFD814] mb-10"
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AdminLogin;
