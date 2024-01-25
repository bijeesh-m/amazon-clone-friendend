import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { myContext } from "../App";

const Product = () => {
  window.onload = function () {
    window.scrollTo(0, 0);
  };
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { user, cartCount, setCartCount } = useContext(myContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/user/product/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddToCart = (prodId) => {
    axios
      .post(`http://localhost:3002/user/addtocart/${prodId}`, user, {
        withCredentials: true,
      })
      .then((res) => {
        setCartCount(cartCount + 1);
        toast.success("Item added to cart");
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          toast.error("Please login to continue");
        } else {
          toast.error("Item already in a cart");
        }
      });
  };

  return (
    <div className="flex justify-center h-[100vh] ">
      <div className="  w-[97%] flex mt-8 ">
        <div className="flex mr-4 w-[50%] ">
          <div className=" h-[367px] mt-2 ms-2 w-[50px]  flex flex-col justify-evenly items-center">
            <div>
              <img
                className="border rounded"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665518/jbl_njxdjd.jpg"
                alt="img"
              />
            </div>
            <div>
              <img
                className="border rounded"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665514/e_yq4lol.jpg"
                alt="img"
              />
            </div>
            <div>
              <img
                className="border rounded"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665508/b_pimxpi.jpg"
                alt="img"
              />
            </div>
            <div>
              <img
                className="border rounded"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665514/c_qcjkeq.jpg"
                alt="img"
              />
            </div>
            <div>
              <img
                className="border rounded"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665514/d_zexuij.jpg"
                alt="img"
              />
            </div>
            <div>
              <img
                className="border rounded"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665507/a_uwif1r.jpg"
                alt="img"
              />
            </div>
          </div>
          <div className="  ms-3 flex justify-center items-center w-full   max-h-[60vh]">
            <img
              className=" mt-[100px] w-[80%] max-h-[110%]"
              src={product.image}
              alt="mobile"
            />
          </div>
        </div>
        <div className="flex flex-col h-[500px]      justify-evenly ">
          <h1 className=" text-[24px]">{product.description}</h1>
          <h2 className=" text-[28px]">₹{product.price}</h2>
          <div>
            <img
              width={67.5}
              src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665517/Group_75_lj52uz.png"
              alt=""
            />
          </div>
          <p className=" text-[13px]">Inclusive of all taxes</p>
          <div className="flex">
            <p className=" text-[14px]">Quantity:</p>
            <select className=" border rounded ms-1" name="quantity" id="">
              <option defaultValue="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
              <option value="1">5</option>
              <option value="1">6</option>
            </select>
          </div>
          <button
            onClick={() => handleAddToCart(product._id)}
            className=" flex items-start "
          >
            <p className="text-[13px] p-2  bg-[#FFD814] rounded-2 h-[30px] w-[206.667px] flex items-center justify-center">
              Add to Cart
            </p>
          </button>
          <button className=" flex items-start ">
            <p className="text-[13px] p-2   bg-[#FFA41C] rounded-2 h-[30px] w-[206.667px] flex items-center justify-center">
              Buy Now
            </p>
          </button>
          <hr />
          <div>
            <ul className="flex w-full justify-evenly">
              <li className=" w-[100px] flex flex-col text-[#268697]  items-center justify-center ">
                <img
                  className=" mb-2"
                  width={35}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665517/icon-returns._CB484059092__nym57a.png"
                  alt=""
                />
                <span className=" text-[12px]">7 days Service</span>
                <span className=" text-[12px]">Centre</span>
                <span className=" text-[12px]">Replacement</span>
              </li>
              <li className=" w-[120px] flex flex-col text-[#268697]  items-center">
                <img
                  className=" mb-2"
                  width={35}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665523/trust_icon_free_shipping_81px._CB630870460__kkwyho.png"
                  alt=""
                />
                <span className=" text-[12px]">Free Delivery</span>
              </li>
              <li className=" w-[120px] flex flex-col text-[#268697]  items-center">
                <img
                  className=" mb-2"
                  width={35}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665517/icon-warranty._CB485935626__mfafyo.png"
                  alt=""
                />
                <span className=" text-[12px]">1 Year Warranty</span>
              </li>
              <li className=" w-[120px] flex flex-col text-[#268697]  items-center">
                <img
                  className=" mb-2"
                  width={35}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665517/icon-cod._CB485937110__qwtokg.png"
                  alt=""
                />
                <span className=" text-[12px]">Pay on Delivery</span>
              </li>
              <li className=" w-[120px] flex flex-col text-[#268697]  items-center">
                <img
                  className=" mb-2"
                  width={35}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665517/icon-amazon-delivered._CB485933725__yvkrit.png"
                  alt=""
                />
                <span className=" text-[12px]">Amazon Delivered</span>
              </li>
              <li className=" w-[120px] flex flex-col text-[#268697]  items-center">
                <img
                  className=" mb-2"
                  width={35}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665517/icon-top-brand._CB617044271__vovqg7.png"
                  alt=""
                />
                <span className=" text-[12px]">Top Brand</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
