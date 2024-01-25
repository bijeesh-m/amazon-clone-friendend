import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <section className="container p-6 mx-auto space-y-3">
        <div className="  flex items-center justify-center">
          <div className=" w-full grid gap-8 my-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="w-full max-w-xs text-center">
              <Link to={"/adminHome/addproduct"}>
                <div className="object-cover object-center w-full h-40 mx-auto rounded-lg shadow-sm bg-white">
                  <div className="space-y-2 w-full h-full  flex flex-col items-center justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705469753/add_1028168_lcxtwm.png"
                      alt=""
                    />
                    <h5 className="text-lg  ">Add Product</h5>
                  </div>
                </div>
              </Link>
            </div>

            <div className="w-full max-w-xs text-center">
              <Link to={"/adminHome/allproducts"}>
                <div className="object-cover object-center w-full h-40 mx-auto rounded-lg shadow-sm bg-white">
                  <div className=" space-y-2 w-full h-full  flex flex-col items-center justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705469134/pen_2885538_evlo5j.png"
                      alt=""
                    />
                    <h5 className="text-lg  ">Edit Product</h5>
                  </div>
                </div>
              </Link>
            </div>

            <div className="w-full max-w-xs text-center">
              <Link to={'/adminHome/deleteproduct'}>
                <div className="object-cover object-center w-full h-40 mx-auto rounded-lg shadow-sm bg-white">
                  <div className=" space-y-2 w-full h-full  flex flex-col items-center justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705468874/delete_3807871_qpv1pp.png"
                      alt=""
                    />
                    <h5 className="text-lg ">Delete Product</h5>
                  </div>
                </div>
              </Link>
            </div>

            <div className="w-full max-w-xs text-center">
              <Link to={"/adminHome/users"}>
                <div className="object-cover object-center w-full h-40 mx-auto rounded-lg shadow-sm bg-white">
                  <div className=" space-y-2 w-full h-full  flex flex-col items-center justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705470330/friendlist_6866254_eyrj3b.png"
                      alt=""
                    />
                    <h5 className="text-lg ">Users</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full max-w-xs text-center">
              <Link to={"/adminHome/allproducts"}>
                <div className="object-cover object-center w-full h-40 mx-auto rounded-lg shadow-sm bg-white">
                  <div className=" space-y-2 w-full h-full  flex flex-col items-center justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705484729/food_11513743_s5pkog.png"
                      alt=""
                    />
                    <h5 className="text-lg ">All Products</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full max-w-xs text-center">
              <Link to={"/adminHome/salesreport"}>
                <div className="object-cover object-center w-full h-40 mx-auto rounded-lg shadow-sm bg-white">
                  <div className=" space-y-2 w-full h-full  flex flex-col items-center justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705728747/seo-report_7289700_sipjfo.png"
                      alt=""
                    />
                    <h5 className="text-lg ">Sales report</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full max-w-xs text-center">
              <Link to={"/adminHome/orders"}>
                <div className="object-cover object-center w-full h-40 mx-auto rounded-lg shadow-sm bg-white">
                  <div className=" space-y-2 w-full h-full  flex flex-col items-center justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705730598/online-business_9623726_je9mns.png"
                      alt=""
                    />
                    <h5 className="text-lg ">Orders</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
