import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
const AdminHome = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  let Admin = "";
  function getCookie(name) {
    const cookies = document.cookie.split(" ");
    if (cookies.length > 0) {
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    }
  }

  const jwtToken = getCookie("adminjwt");

  if (jwtToken) {
    const admin = jwtDecode(jwtToken);
    const email = admin.userId.split("@")[0].toUpperCase();
    Admin = email;
  } else {
  }

  const handleLogOut = () => {
    axios
      .delete("http://localhost:3002/admin/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        toast.success("Logout success");
        navigate("/adminlogin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="flex h-screen bg-gray-100  ">
        <div
          className={`flex-col w-64 bg-gray-800 h-full ${
            !showSidebar && "hidden"
          }`}
        >
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">Sidebar</span>
          </div>
          <div className="flex flex-col  justify-between h-[89vh]  overflow-y-auto ">
            <nav className="flex-1   px-2 py-4 bg-gray-800">
              <Link
                to={"/adminHome"}
                className="flex  items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
              >
                <img
                  className=" mr-2"
                  width={15}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665520/menu_lj46zj.png"
                  alt=""
                />
                Dashboard
              </Link>
            </nav>
            <div
              onClick={handleLogOut}
              className=" mb-3 flex  items-center   px-4 py-2 text-gray-100 hover:bg-gray-700"
            >
              <img
                className=" mr-2"
                width={22}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1706099189/icons8-logout-48_ltp4ra.png"
                alt=""
              />
              Log Out
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center justify-between py-[11px] bg-white border-b border-gray-200 ">
            <div className="flex items-center px-4">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none focus:text-gray-700"
              >
                <img
                  width={50}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705476859/menu_zr2xgt.svg"
                  alt=""
                />
              </button>
              <input
                className="mx-4 w-full h-7 border rounded-md px-4 py-2"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="flex items-center pr-4">
              <button className="flex space-x-2 items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                <p>{Admin}</p>
                <div className=" flex justify-center items-center p-2  border w-10 h-10 rounded-full">
                  <img
                    src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705468276/3935309_user_admin_icon_nt0ahn.svg"
                    alt="admin"
                  />
                </div>
              </button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
