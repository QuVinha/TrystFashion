import React, { useEffect, useState } from "react";
import "./EditCategory.css";
import { useNavigate, useLocation } from "react-router-dom";

const EditCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; // Lấy ID từ trạng thái navigation
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName"); // Lấy roleName từ localStorage
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true); // Nếu người dùng là admin và có token hợp lệ
    }
  }, []);

  useEffect(() => {
    // Fetch dữ liệu danh mục hiện tại
    fetch(`http://192.168.10.164:8080/api/v1/categories/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        return response.json();
      })
      .then((data) => {
        setCategoryName(data.name); // Điền tên danh mục vào input
      })
      .catch((err) => {
        console.error("Error fetching category data:", err);
        setError("Có lỗi khi tải dữ liệu danh mục");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleEditCategory = async () => {
    // Kiểm tra xem người dùng có quyền admin không
    if (!isAdmin) {
      alert("Bạn không có quyền chỉnh sửa danh mục.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://192.168.10.164:8080/api/v1/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
          body: JSON.stringify({ name: categoryName }), // Gửi dữ liệu cập nhật danh mục
        }
      );

      if (response.ok) {
        // Nếu cập nhật thành công
        alert("Cập nhật danh mục thành công");
        navigate("/adminCategory"); // Chuyển hướng về trang quản lý danh mục
      } else {
        // Nếu cập nhật không thành công
        alert("Cập nhật danh mục không thành công");
      }
    } catch (error) {
      // Nếu có lỗi khi gửi yêu cầu
      alert("Lỗi khi cập nhật danh mục");
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

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
          <h1 onClick={handleAdmin}>TRYST </h1>
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
            <h5>CHỈNH SỬA DANH MỤC SẢN PHẨM</h5>
          </div>

          <div className="AdminRightAddCategory">
            <div className="FormAddCategory">
              <input
                type="text"
                placeholder="Tên Danh Mục Sản Phẩm"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="ButtonAddProduct">
              <button onClick={handleEditCategory}>CHỈNH SỬA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
