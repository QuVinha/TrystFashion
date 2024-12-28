import React, { useEffect, useState } from "react";
import "./AddCategory.css";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoryName, setCategoryName] = useState(""); // State để lưu tên danh mục
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName"); // Lấy roleName từ localStorage
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true); // Nếu người dùng là admin và có token hợp lệ
    }
  }, []);

  const handleAddCategory = async () => {
    if (!isAdmin) {
      alert("Bạn không có quyền thêm danh mục.");
      return;
    }

    if (!categoryName.trim()) {
      alert("Tên danh mục không được để trống.");
      return;
    }

    try {
      setLoading(true); // Bật trạng thái loading
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await fetch(
        "http://192.168.10.164:8080/api/v1/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
          body: JSON.stringify({ name: categoryName.trim() }), // Gửi dữ liệu danh mục
        }
      );

      if (response.ok) {
        alert("Thêm danh mục thành công!");
        navigate("/adminCategory");
        setCategoryName(""); // Xóa input sau khi thêm thành công
      } else {
        alert("Thêm danh mục không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

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
          <h1 onClick={handleAdmin}>TRYST</h1>
        </div>

        <div className="LogOutAdmin">
          <div onClick={handleHome} className="IconLogoutAdmin">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>

      <div className="AdminPage">
        <div className="AdminPageLeft">
          <div className="AdminLeftTitle">
            <h5>TRANG QUẢN TRỊ</h5>
          </div>

          <div className="AdminMenuHeader">
            <p>Menu Admin</p>
          </div>

          <div className="AdminMenu">
            <div onClick={handleAccountUser} className="NavAdminMenu1">
              <i className="fa-solid fa-user"></i>
              <a>Quản lý tài khoản</a>
            </div>

            <div onClick={handleAdminProduct} className="NavAdminMenu2">
              <i className="fa-solid fa-shirt"></i>
              <a>Quản lý sản phẩm</a>
            </div>

            <div onClick={handleAdminCategory} className="NavAdminMenu3">
              <i className="fa-solid fa-list"></i>
              <a>Quản lý danh mục sản phẩm</a>
            </div>

            <div onClick={handleAdminOrder} className="NavAdminMenu4">
              <i className="fa-solid fa-truck"></i>
              <a>Quản lý đơn hàng</a>
            </div>
          </div>
        </div>

        <div className="AdminPageRight">
          <div className="AdminRightTitle">
            <h5>THÊM DANH MỤC SẢN PHẨM</h5>
          </div>

          <div className="AdminRightAddCategory">
            <div className="FormAddCategory">
              <input
                type="text"
                placeholder="Tên Danh Mục Sản Phẩm"
                name="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)} // Cập nhật tên danh mục
              />
            </div>

            <div className="ButtonAddProduct">
              <button onClick={handleAddCategory} disabled={loading}>
                {loading ? "Đang thêm..." : "THÊM DANH MỤC SẢN PHẨM"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
