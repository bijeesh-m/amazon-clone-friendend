import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3002/admin/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="max-w-2xl mx-auto mt-5 w-full">
        <div className="flex justify-between items-center mb-4">Users</div>
        <div className="p-4 w-full  bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          {users.length !== 0 ? (
            <>
              {users.map((user) => {
                return (
                  <div key={user._id} className="flow-root">
                    <Link to={`/adminHome/userdetails/${user._id}`}>
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="w-8 h-8 rounded-full"
                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705468276/3935309_user_admin_icon_nt0ahn.svg"
                                alt=""
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-black truncate dark:text-gray-400">
                                {user.username}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Link>
                  </div>
                );
              })}
            </>
          ) : (
            <p className=" font-extrabold text-red-600">Users not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
