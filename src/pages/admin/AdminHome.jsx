import React, { useEffect, useState } from "react";
import { useClickAway } from "react-use";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const AdminHome = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();
  const componentRef = React.useRef(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    axios
      .get("https://amazon-clone-votv.onrender.com/admin/getadmin", {
        withCredentials: true,
      })
      .then((res) => {
        const [admin, domain] = res.data.userId.split("@");
        setAdmin(admin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogOut = () => {
    const toastId = toast.loading("Loading...");
    axios
      .delete("https://amazon-clone-votv.onrender.com/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Logout success", { id: toastId });
        navigate("/adminlogin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useClickAway(componentRef, () => {
    setShowSidebar(false);
  });

  return (
    <div>
      <div className="flex h-screen bg-gray-100  ">
        <div
          ref={componentRef}
          className={`flex-col w-64 bg-gray-800 h-full absolute z-40 ${
            !showSidebar && "hidden"
          }`}
        >
          <div className="flex items-center justify-evenly  h-[9.5%] bg-">
            <button
              onClick={toggleSidebar}
              className="text-gray-500  mx-2  w-1/7 focus:outline-none focus:text-gray-700"
            >
              <img
                width={30}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665520/menu_lj46zj.png"
                alt=""
              />
            </button>
            <span className="text-white mx-2 w-1/2 font-bold uppercase">
              Sidebar
            </span>
          </div>
          <div className=" h-[90.5%]  flex flex-col  justify-between ">
            <nav className="flex-1   px-2 py-4 bg-gray-800">
              <Link
                onClick={() => setShowSidebar(false)}
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
                <p>{admin}</p>
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
