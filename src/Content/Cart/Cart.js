// src/components/Cart/Cart.js
import React, { useContext } from "react";
import "./Cart.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleBuyNow = () => {
    navigate("/pay", { state: { cartItems } });
    window.scrollTo(0, 0);
  };
  const handleBuyContinue = () => {
    navigate("/product");
    window.scrollTo(0, 0);
  };

  const handleQuantityChange = (id, increment) => {
    const item = cartItems.find((product) => product.id === id);
    if (item) {
      updateQuantity(id, item.quantity + increment);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div id="main">
      <Header />
      <div
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: "10vh",
          zIndex: 1,
        }}
        className="HeaderCart"
      ></div>
      <div className="Cart">
        <div className="CartTitle">
          <div className="CartTitle1">
            <p>GIỎ HÀNG</p>
          </div>
          <div className="CartTitle2">
            <p>({calculateTotalItems()} sản phẩm)</p>
          </div>
        </div>

        <div className="CartContent">
          <div className="CartContentLeft">
            {cartItems.map((item) => (
              <div key={item.id} className="CartProduct">
                <div className="CartProductImg">
                  <img
                    src={`data:image/jpeg;base64,${item.url}`}
                    alt={item.name}
                  />
                </div>
                <div className="CartProductName">
                  <h5>{item.name}</h5>
                  <p>Màu: {item.color || "N/A"}</p>
                  <p>Size: {item.size || "N/A"}</p>
                </div>
                <div className="CartProductPrice">
                  <p>{item.price.toLocaleString()} đ</p>
                </div>
                <div className="CartProductQuantity">
                  <div className="CartQuantity">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>
                      -
                    </button>
                    <p className="numCartQuantity">{item.quantity}</p>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>

                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFromCart(item.id)}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            ))}
          </div>

          <div className="CartContentRight">
            <div className="provisionalPayment">
              <div className="provisionalPayment1">
                <div className="Payment1title">
                  <p>Tạm tính:</p>
                </div>
                <div className="Payment1price">
                  <p>{calculateTotal().toLocaleString()} đ</p>
                </div>
              </div>

              <div className="provisionalPayment2">
                <div className="Payment2title">
                  <p>Thành tiền:</p>
                </div>
                <div className="Payment2price">
                  <p>{calculateTotal().toLocaleString()} đ</p>
                </div>
              </div>

              <div className="buttonPayNow">
                <div className="buttonPayNow">
                  <button onClick={handleBuyNow}>THANH TOÁN NGAY</button>
                </div>
              </div>
              <div className="buttonShopping">
                <button onClick={handleBuyContinue}>TIẾP TỤC MUA HÀNG</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
