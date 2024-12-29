import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ username }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [storedUsername, setStoredUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleAccountInfo = () => {
    navigate("/account");
    window.scrollTo(0, 0);
  };

  const handleYourOrder = () => {
    navigate("/yourOrder");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const roleName = localStorage.getItem("roleName"); // Lấy roleName từ localStorage
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true); // Nếu người dùng là admin và có token hợp lệ
    }
  }, []);

  useEffect(() => {
    // Lưu giá trị username vào local storage chỉ một lần khi component được render lần đầu tiên
    if (username) {
      localStorage.setItem("user_name", username);
    }
    // Lấy giá trị username từ local storage sau khi trang tải
    const storedUsername = localStorage.getItem("user_name");
    if (storedUsername) {
      setStoredUsername(storedUsername);
    }
  }, []);

  // Hàm điều hướng hoặc reload trang
  const handleNavigation = (path) => {
    if (location.pathname === path) {
      // Nếu đang ở đúng trang, reload lại trang
      window.location.reload();
      window.scrollTo(0, 0);
    } else {
      // Điều hướng sử dụng navigate
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    localStorage.removeItem("roleName");
    localStorage.removeItem("cartItems");
    navigate("/login");
    window.scrollTo(0, 0);
  };

  return (
    <div id="header">
      <div className={`Header ${isScrolled ? "scrolled" : ""}`}>
        <div className="HeaderFull">
          <div className="LogoShop">
            <h1 onClick={() => handleNavigation("/")}>TRYST</h1>
          </div>
          <div className="NavBar">
            <ul>
              {isAdmin && (
                <li className="Nav0">
                  <NavLink
                    to="/admin"
                    onClick={() => handleNavigation("/admin")}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    ADMIN DASHBOARD
                  </NavLink>
                </li>
              )}

              <li className="Nav1">
                <NavLink
                  to="/"
                  onClick={() => handleNavigation("/")}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  TRANG CHỦ
                </NavLink>
              </li>

              <li className="Nav2">
                <NavLink
                  to="/product"
                  onClick={() => handleNavigation("/product")}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  SẢN PHẨM
                </NavLink>
              </li>

              <li className="Nav3">
                <NavLink
                  to="/about"
                  onClick={() => handleNavigation("/about")}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  VỀ CHÚNG TÔI
                </NavLink>
              </li>

              <li className="Nav4">
                <a
                  href="/contact"
                  onClick={() => handleNavigation("/contact")}
                  className={isActive ? "active" : ""}
                >
                  LIÊN HỆ
                </a>
              </li>

              <li className="Nav5">
                <NavLink
                  to="/cart"
                  onClick={() => handleNavigation("/cart")}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  GIỎ HÀNG
                </NavLink>
              </li>

              <li className="Nav4">
                {storedUsername ? (
                  <div
                    style={{
                      color: "#fff",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {storedUsername}
                    {showDropdown && (
                      <div className="dropdown">
                        <p
                          style={{ borderBottom: "1px solid #dadade" }}
                          onClick={handleAccountInfo}
                        >
                          Tài khoản
                        </p>
                        <p onClick={handleYourOrder}>Đơn hàng</p>
                        <p onClick={handleLogout}>Đăng xuất</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => handleNavigation("/login")}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    ĐĂNG NHẬP
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
