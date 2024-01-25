import Home from "./pages/Home";
import AdminHome from "./pages/admin/AdminHome";
import { Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLayout from "./outlets/HomeLayout";
import Account from "./pages/Account";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import "./index.css";
import "./App.css";
import Payment from "./pages/Payment";
import FormFill from "./pages/FormFill";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Category from "./pages/Category";
import Address from "./pages/Address";
import { isEqual } from "lodash";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Dashboard from "./pages/admin/Dashboard";
import Addproduct from "./pages/admin/Addproduct";
import EditProduct from "./pages/admin/EditProduct";
import Allproducts from "./pages/admin/Allproducts";
import Users from "./pages/admin/Users";
import UserDetails from "./pages/admin/UserDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import DeleteProducts from "./pages/admin/DeleteProducts";
import Orders from "./pages/admin/Orders";
import SalesReport from "./pages/admin/SalesReport";
import OrderDetails from "./pages/admin/OrderDetails";
import UserOrders from "./pages/user/UserOrders";
import ViewOrders from "./pages/user/ViewOrders";

export const myContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://amazon-clone-votv.onrender.com/user/products", { withCredentials: true })
      .then((res) => {
        if (!isEqual(products, res.data)) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const loginUser = JSON.parse(userInfo);
      if (!isEqual(user, loginUser)) {
        setUser(loginUser);
      }
    }
  }, [user, products]);

  return (
    <myContext.Provider
      value={{
        user,
        setUser,
        address,
        setAddress,
        products,
        setProducts,
        cartCount,
        setCartCount,
      }}
    >
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/products/:category" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/vieworder/:id" element={<ViewOrders />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/form" element={<FormFill />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/adminHome" element={<AdminHome />}>
            <Route index element={<Dashboard />} />
            <Route path="/adminHome/addproduct" element={<Addproduct />} />
            <Route
              path="/adminHome/editproduct/:id"
              element={<EditProduct />}
            />
            <Route path="/adminHome/allproducts" element={<Allproducts />} />
            <Route path="/adminHome/users" element={<Users />} />
            <Route
              path="/adminHome/userdetails/:id"
              element={<UserDetails />}
            />
            <Route
              path="/adminHome/deleteproduct"
              element={<DeleteProducts />}
            />
            <Route path="/adminHome/salesreport" element={<SalesReport />} />
            <Route path="/adminHome/orders" element={<Orders />} />
            <Route
              path="/adminHome/orderdetails/:id"
              element={<OrderDetails />}
            />
          </Route>
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </div>
    </myContext.Provider>
  );
}

export default App;
