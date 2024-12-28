// src/context/CartContext/CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Kiểm tra nếu có token (người dùng đã đăng nhập)
    if (token) {
      const storedCartItems = JSON.parse(
        localStorage.getItem(`cartItems_${token}`)
      );
      if (storedCartItems) {
        setCartItems(storedCartItems);
      }
    } else {
      // Nếu không có token, làm trống giỏ hàng
      setCartItems([]);
    }
  }, [token]);

  // Lưu giỏ hàng vào localStorage khi cartItems thay đổi
  useEffect(() => {
    if (token) {
      // Lưu giỏ hàng vào localStorage với khóa riêng biệt cho từng tài khoản
      localStorage.setItem(`cartItems_${token}`, JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevItems, { ...product }];
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
    if (token) {
      // Nếu có token, xóa giỏ hàng khỏi localStorage khi đăng xuất
      localStorage.removeItem(`cartItems_${token}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
