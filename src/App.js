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
      </Routes>
    </>
  );
}

export default App;
