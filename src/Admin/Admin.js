import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleAccountUser = () => {
    navigate("/accountUser");
  };

  const handleAdminOrder = () => {
    navigate("/adminOrder");
  };

  const handleAdminProduct = () => {
    navigate("/adminProduct");
  };

  const handleAdminCategory = () => {
    navigate("/adminCategory");
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    localStorage.removeItem("roleName");
    localStorage.removeItem("cartItems");
    navigate("/login");
    window.scrollTo(0, 0);
  };

  return (
    <div id="main">
      <div
        style={{
          width: "100%",
          height: "15vh",
          zIndex: 1,
        }}
        className="HeaderAdmin"
      >
        <div className="LogoShopAdmin">
          <h1 onClick={handleHome}>TRYST </h1>
        </div>

        <div className="LogOutAdmin">
          <div onClick={handleLogoutAdmin} className="IconLogoutAdmin">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>

      <div className="AdminPage">
        <div className="AdminPageLeft">
          <div className="AdminLeftTitle">
            <h5 onClick={handleAdmin}>TRANG QUẢN TRỊ</h5>
          </div>

          <div className="AdminMenuHeader">
            <p>Menu Admin</p>
          </div>

          <div className="AdminMenu">
            <div onClick={handleAccountUser} className="NavAdminMenu1">
              <i class="fa-solid fa-user"></i>
              <a>Quản lý tài khoản</a>
            </div>

            <div onClick={handleAdminProduct} className="NavAdminMenu2">
              <i class="fa-solid fa-shirt"></i>
              <a>Quản lý sản phẩm</a>
            </div>

            <div onClick={handleAdminCategory} className="NavAdminMenu3">
              <i class="fa-solid fa-list"></i>
              <a>Quản lý danh mục sản phẩm</a>
            </div>

            <div onClick={handleAdminOrder} className="NavAdminMenu4">
              <i class="fa-solid fa-truck"></i>
              <a>Quản lý đơn hàng</a>
            </div>
          </div>
        </div>
        <div className="AdminPageRight">
          <div className="AdminRightTitle">
            <h5>HOME DASHBOARD</h5>
          </div>

          <div className="AdminRightContent">
            <div onClick={handleAccountUser} className="SectionDashboard">
              <div className="SectionLink1">
                <i class="fa-solid fa-user"></i>
                <p>Quản lý tài khoản</p>
              </div>
            </div>

            <div onClick={handleAdminProduct} className="SectionDashboard">
              <div className="SectionLink3">
                <i class="fa-solid fa-shirt"></i>
                <p>Quản lý sản phẩm</p>
              </div>
            </div>
          </div>

          <div className="AdminRightContent">
            <div onClick={handleAdminCategory} className="SectionDashboard">
              <div className="SectionLink4">
                <i class="fa-solid fa-list"></i>
                <p>Quản lý danh mục sản phẩm</p>
              </div>
            </div>

            <div onClick={handleAdminOrder} className="SectionDashboard">
              <div className="SectionLink2">
                <i class="fa-solid fa-truck"></i>
                <p>Quản lý đơn hàng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
