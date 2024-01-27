import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { myContext } from "../App";

const Address = () => {
  const { setAddress } = useContext(myContext);
  const token = localStorage.getItem("user");
  const [inputValues, setInputValues] = useState({
    name: "",
    phone: "",
    pin: "",
    area: "",
    landmark: "",
  });
  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      axios
        .get(`https://amazon-clone-votv.onrender.com/user/getaddress/${user.userId}`)
        .then((res) => {
          const address = res.data;
          setAddress(address);
          localStorage.setItem("userAdd", JSON.stringify(address));
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            name: address.name || "",
            phone: address.phone || "",
            pin: address.pin || "",
            area: address.area || "",
            landmark: address.landmark || "",
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token,setAddress]);

  return (
    <div className=" flex justify-center">
      <Formik
        initialValues={inputValues}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          } else if (values.name.length < 3) {
            errors.name = "minimum 3 characters required";
          }
          if (!values.phone) {
            errors.phone = "Required";
          } else if (!/^\d{10}$/.test(values.phone)) {
            errors.phone = "Enter a valid mobile";
          }
          if (!values.pin) {
            errors.pin = "Required";
          } else if (!/^\d{6}$/.test(values.pin)) {
            errors.pin = "Enter a valid pin";
          }
          if (!values.area) {
            errors.area = "Required";
          } else if (values.area.length < 6) {
            errors.area = "Enter a valid data";
          }
          if (!values.landmark) {
            errors.landmark = "Required";
          } else if (values.landmark.length < 10) {
            errors.landmark = "Enter a valid data";
          }

          return errors;
        }}
        onSubmit={(values) => {
          const toatId = toast.loading("updating...");
          const user = jwtDecode(token);
          axios
            .post(`https://amazon-clone-votv.onrender.com/user/address`, { values, user })
            .then((res) => {
              toast.success("Address updated", {
                id: toatId,
              });
              
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="w-[348.5px]  border rounded mt-2 mb-4"
          >
            <h1 className=" m-3  text-[28px]">Your Address</h1>
            <label className=" text-[13px] font-bold ms-3 " htmlFor="username">
              Name
            </label>
            <br />
            <input
              value={values.name}
              onChange={handleChange}
              name="name"
              className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3 mb-2 focus:outline-none"
              type="text"
            />
            <p className=" ms-3 text-[12px] text-[red]">
              {touched.name && errors.name}
            </p>
            <label className=" text-[13px] font-bold ms-3 " htmlFor="mob">
              Phone number
            </label>
            <br />
            <input
              value={values.phone}
              onChange={handleChange}
              name="phone"
              className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3 mb-2 focus:outline-none"
              type="number"
            />
            <p className=" ms-3 text-[12px] text-[red]">
              {touched.phone && errors.phone}
            </p>
            <div className="ms-3">
              <label className="text-[13px] font-bold">Pincode</label>
              <br />
              <input
                value={values.pin}
                onChange={handleChange}
                type="number"
                name="pin"
                className=" focus:outline-none focus:border-2   text-[13px] border   rounded-1 w-[312.66px] h-[31px] mb-1"
              />
              <p className="  text-[12px] text-[red]">
                {touched.pin && errors.pin}
              </p>
            </div>
            <div className="ms-3">
              <label className="text-[13px] font-bold">
                Area, Street, Sector, Village
              </label>
              <br />
              <input
                value={values.area}
                onChange={handleChange}
                type="text"
                name="area"
                className=" focus:outline-none focus:border-2   text-[13px] border   rounded-1 w-[312.66px] h-[31px] mb-1"
              />
              <p className="  text-[12px] text-[red]">
                {touched.area && errors.area}
              </p>
            </div>
            <div className="ms-3">
              <label className="text-[13px] font-bold">Landmark</label>
              <br />
              <input
                value={values.landmark}
                onChange={handleChange}
                type="text"
                name="landmark"
                className=" focus:outline-none focus:border-2   text-[13px] border   rounded-1 w-[312.66px] h-[31px] mb-1"
              />
              <p className="  text-[12px] text-[red]">
                {touched.landmark && errors.landmark}
              </p>
            </div>
            <button
              type="submit"
              className="border w-[312.66px] h-[31px] rounded text-[13px] ms-3 mt-4 bg-[#FFD814] mb-3"
            >
              Update
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Address;
