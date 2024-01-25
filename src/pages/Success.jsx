import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get("paymentStatus");
  const user = urlParams.get("user");
  const total = urlParams.get("total");
  const totalPrice = total;
  console.log(user);
  const navigate = useNavigate();

  const handleOrder = () => {
    if (paymentStatus === "success") {
      axios
        .post(`https://amazon-clone-votv.onrender.com/user/update-oreders/${user}`, {
          totalPrice,
        })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Payment failed or canceled.");
    }
  };

  return (
    <div>
      <div className=" bg-yellow-50 w-full h-[100vh] flex flex-col justify-center items-center">
        <h1 className="bg-[green] p-3 rounded text-[36px]">
          Payment Successful
        </h1>
        <button onClick={handleOrder}>
          <h1 className=" mt-3 underline">Return to Home</h1>
        </button>
      </div>
    </div>
  );
};

export default Success;
