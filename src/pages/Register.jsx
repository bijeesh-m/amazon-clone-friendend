import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputValues, SetInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [phoneInput, setphoneInput] = useState({
    ph: "",
  });

  const [showOtp, setshowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [inputError, setInputError] = useState({});

  const handleSubmit1 = (e) => {
    const errors = validate(inputValues, phoneInput);
    setInputError(errors);
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const toastId = toast.loading("Sending OTP...");
      axios
        .post(
          "https://amazon-clone-votv.onrender.com/user/register",
          { phoneInput, inputValues },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data === "success") {
            setshowOtp(true);
            toast.success("OTP send success", {
              id: toastId,
            });
          }
        })
        .catch((res, err) => {
          if (res.response.data === "User is Already exist") {
            toast.error("User is Already exist", {
              id: toastId,
            });
          } else {
            toast.error("OTP send Failed", {
              id: toastId,
            });
          }
        });
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetInputValues({ ...inputValues, [name]: value });
  };

  const handlePhoneInputChange = (value) => {
    setphoneInput((prevInputValues) => ({
      ...prevInputValues,
      ph: value,
    }));
  };

  const onSuccess = (credentialResponse) => {
    axios
      .post(
        "https://amazon-clone-votv.onrender.com/user/googleauth",
        credentialResponse,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.data === "success") {
          toast.success("Login Success");
          localStorage.setItem("user", res.data.token);
          navigate("/");
        } else {
          localStorage.setItem("accToken", credentialResponse.credential);
          navigate("/form");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOtp = () => {
    const vToastId = toast.loading("Verifing OTP...");
    axios
      .post(
        "https://amazon-clone-votv.onrender.com/user/verify-otp",
        { otp, phoneInput, inputValues },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.data === "success") {
          localStorage.setItem("user", response.data.token);
          toast.success("OTP verified successfully", {
            id: vToastId,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error("OTP verification failed", {
          id: vToastId,
        });
      });
  };

  const validate = (values, phValue) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!values.username) {
      errors.username = "username is required";
    } else if (values.username.length < 3) {
      errors.username = "the username should have minimum 3 characters";
    } else if (!phValue.ph) {
      errors.ph = "mobile number is required";
    } else if (phValue.ph.length < 12) {
      errors.ph = "Enter a valid mobile number";
    } else if (!values.email) {
      errors.email = "email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "enter a valid email";
    } else if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 3) {
      errors.password = "the password should have minimum 3 characters";
    }
    return errors;
  };

  return (
    <div className="flex flex-col items-center">
      <div className=" flex justify-center mt-1 ">
        <div className="flex items-center">
          <div className=" h-[31px] w-[103px] mt-2">
            <img
              className=" w-full"
              src="https://res.cloudinary.com/dunf6rko6/image/upload/v1703665507/amazon_tuwwx3.svg"
              alt="Logo"
            />
          </div>
          <p className="mt-[12px] ms-1 text-[13px]">.in</p>
        </div>
      </div>
      {!showOtp ? (
        <>
          <form
            onSubmit={handleSubmit1}
            className="w-[348.5px]  border rounded mt-2"
          >
            <h1 className=" m-3  text-[28px]">Create Account</h1>
            <label className=" text-[13px] font-bold ms-3 " htmlFor="name">
              Your name
            </label>
            <br />
            <input
              className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3  focus:outline-none"
              type="text"
              name="username"
              id="user"
              value={inputValues.username}
              onChange={handleChange}
              placeholder="  First and last name"
            />
            <p className=" text-[red] text-[11px] ms-3 mb-1 mt-0">
              {inputError.username}
            </p>
            <div className=" w-[312.67px] ms-3">
              <label className=" text-[13px] font-bold" htmlFor="name">
                Mobile number
              </label>

              <PhoneInput
                country={"in"}
                name="mobNumber"
                value={phoneInput.ph}
                onChange={handlePhoneInputChange}
              />
              <p className=" text-[red] text-[11px]  mb-1 mt-0">
                {inputError.ph}
              </p>
            </div>
            <label className="text-[13px] font-bold ms-3" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="useremail"
              value={inputValues.email}
              onChange={handleChange}
              className=" ms-3   text-[13px]  border rounded-1 w-[312.66px] h-[31px] focus:outline-none"
            />
            <p className=" text-[red] text-[11px] ms-3 mb-1 mt-0">
              {inputError.email}
            </p>
            <div className="ms-3">
              <label className="text-[13px] font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="userpassword"
                value={inputValues.password}
                onChange={handleChange}
                className=" focus:outline-none focus:border-2   text-[13px] border   rounded-1 w-[312.66px] h-[31px] "
                placeholder="  At least 6 characters"
              />
              <p className=" text-[red] text-[11px]  mb-1 mt-0">
                {inputError.password}
              </p>
            </div>
            <button
              id="sign-in-button"
              className="border w-[312.66px] h-[31px] rounded text-[13px] ms-3 mt-4 bg-[#FFD814]"
            >
              Verify mobile number
            </button>
            <div className=" mt-1 mb-1 flex justify-center text-[13px] w-full">
              <p>OR</p>
            </div>
            <div className=" flex justify-center">
              <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              >
                <GoogleLogin width={310} onSuccess={onSuccess} />
              </GoogleOAuthProvider>
            </div>

            <div className=" flex justify-center mt-2 mb-2 text-[13px] ">
              <p>Already have an account?</p>
              <Link to={"/login"} className=" no-underline ms-1">
                <span>Sign in</span>
              </Link>
            </div>
          </form>
        </>
      ) : (
        <>
          <form
            className="w-[348.5px]  border rounded mt-2"
            onSubmit={handleSubmit2}
          >
            <h1 className=" m-3  text-[28px]">Verify mobile number</h1>
            <p className="ms-3 text-[13px]">
              A text with a One Time Password (OTP) has been sent to your mobile
              number:
            </p>
            <label
              className=" text-[13px] font-bold ms-3 mt-2 mb-3 "
              htmlFor="otp"
            >
              Enter OTP:
            </label>
            <br />
            <input
              className=" text-[13px] border rounded-1 w-[312.66px] h-[31px] ms-3 mb-2 focus:outline-none"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="  Enter otp"
            />
            <button
              onClick={verifyOtp}
              className="border w-[312.66px] h-[31px] rounded text-[13px] ms-3 mb-3 mt-4 bg-[#FFD814]"
            >
              Create your Amazon account
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
