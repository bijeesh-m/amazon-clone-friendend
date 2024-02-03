import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [userdetails, setUserDetails] = useState({});
  const [address, setAddress] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://amazon-clone-votv.onrender.com/admin/user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserDetails(res.data);
        setAddress(res.data.address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" w-full h-full flex justify-center items-center ">
      <div className="bg-white w-9/12 overflow-hidden shadow rounded-lg border">
        {userdetails && (
          <>
            <div className="px-4 py-4 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the {userdetails.username}.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4  sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <p className="text-sm font-medium text-gray-500">Full name</p>
                  <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userdetails.username}
                  </p>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <p className=" text-sm font-medium text-gray-500">
                    Email address
                  </p>
                  <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userdetails.email}
                  </p>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <p className="text-sm font-medium text-gray-500">
                    Phone number
                  </p>
                  {userdetails.phone ? (
                    <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      (123) 456-7890
                    </p>
                  ) : (
                    "nill"
                  )}
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  {address ? (
                    <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {address.area}
                      <br />
                      {address.landmark},{address.pin}
                    </p>
                  ) : (
                    "nill"
                  )}
                </div>
              </dl>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
