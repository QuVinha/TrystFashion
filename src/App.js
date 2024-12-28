import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Content/HomePage/HomePage";
import Login from "./Content/Login/Login";
import Cart from "./Content/Cart/Cart";
import Product from "./Content/Products/Product";
import Details from "./Content/Details/Details";
import Register from "./Content/Register/Register";
import AboutUs from "./Content/AboutUs/AboutUs";
import Contact from "./Content/Contact/Contact";
import Account from "./Content/Account/Account";
import ChangePassWord from "./Content/ChangePassword/ChangePassWord";
import Pay from "./Content/Pay/Pay";
import YourOrder from "./Content/YourOrder/YourOrder";
import DetailsOrder from "./Content/YourOrder/DetailsOrder";
import Admin from "./Admin/Admin";
import AccountUser from "./Admin/AdminAccount/AccountUser";
import AdminOrder from "./Admin/AdminOrder/AdminOrder";
import AdminOrderDetails from "./Admin/AdminOrderDetails/AdminOrderDetails";
import AdminProduct from "./Admin/AdminProduct/AdminProduct";
import AdminCategory from "./Admin/AdminCategory/AdminCategory";
import AddProduct from "./Admin/AddProduct/AddProduct";
import AddCategory from "./Admin/AddCategory/AddCategory";
import EditProduct from "./Admin/EditProduct/EditProduct";
import EditCategory from "./Admin/EditCategory/EditCategory";
import InfoAccount from "./Admin/InfoAccount/InfoAccount";

function App() {
  const [username, setUserName] = useState("");

  const storedUsername = localStorage.getItem("user_name");

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage user_name={username} />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/password" element={<ChangePassWord />} />
        <Route path="/product" element={<Product user_name={username} />} />
        <Route
          path="/details"
          element={
            <Details storedUsername={storedUsername} user_name={username} />
          }
        />
        <Route path="/about" element={<AboutUs user_name={username} />} />
        <Route path="/contact" element={<Contact user_name={username} />} />
        <Route path="/cart" element={<Cart user_name={username} />} />
        <Route path="/pay" element={<Pay user_name={username} />} />
        <Route path="/yourOrder" element={<YourOrder user_name={username} />} />
        <Route
          path="/detailsOrder"
          element={<DetailsOrder user_name={username} />}
        />
        <Route path="/admin" element={<Admin user_name={username} />} />
        <Route
          path="/accountUser"
          element={<AccountUser user_name={username} />}
        />
        <Route path="/infoAccount/:userId" element={<InfoAccount />} />
        <Route
          path="/adminOrder"
          element={<AdminOrder user_name={username} />}
        />
        <Route
          path="/adminOrderDetails"
          element={<AdminOrderDetails user_name={username} />}
        />
        <Route
          path="/adminProduct"
          element={<AdminProduct user_name={username} />}
        />
        <Route
          path="/adminCategory"
          element={<AdminCategory user_name={username} />}
        />
        <Route
          path="/addProduct"
          element={<AddProduct user_name={username} />}
        />
        <Route
          path="/editProduct"
          element={<EditProduct user_name={username} />}
        />
        <Route
          path="/addCategory"
          element={<AddCategory user_name={username} />}
        />
        <Route
          path="/editCategory"
          element={<EditCategory user_name={username} />}
        />
      </Routes>
    </>
  );
}

export default App;
