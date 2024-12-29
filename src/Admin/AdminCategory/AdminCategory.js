import React, { useEffect, useState } from "react";
import "./AdminCategory.css";
import { useNavigate } from "react-router-dom";

const AdminCategory = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // Lưu ID danh mục cần xóa
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleHome = () => {
    navigate("/");
  };

  const handleAddCategory = () => {
    navigate("/addCategory");
  };

  const handleEditCategory = (id) => {
    navigate("/editCategory", { state: { id } });
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

  // Mở popup xác nhận xóa
  const openDeletePopup = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setIsDeleteOpen(true);
  };

  // Đóng popup
  const closeDeletePopup = () => {
    setDeleteCategoryId(null);
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    fetch("http://192.168.1.45:8080/api/v1/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Danh mục sản phẩm:", data);
        setCategories(data);
      })
      .catch((err) => {
        setError("Có lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Hàm xóa danh mục
  const handleDeleteCategory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://192.168.1.45:8080/api/v1/categories/${deleteCategoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Xoá danh mục thành công");
        setCategories(
          categories.filter((category) => category.id !== deleteCategoryId)
        );
        closeDeletePopup();
      } else {
        alert("Xoá danh mục không thành công");
      }
    } catch (error) {
      alert("Lỗi khi xóa danh mục");
    }
  };

  // Nếu đang tải dữ liệu
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  // Nếu có lỗi
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div id="main">
      <div className="HeaderAdmin">
        <div className="LogoShopAdmin">
          <h1 onClick={handleHome}>TRYST </h1>
        </div>

        <div className="LogOutAdmin">
          <div onClick={handleLogoutAdmin} className="IconLogoutAdmin">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
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
          <div className="AdminRightCategory">
            <div>
              <h5>QUẢN LÝ DANH MỤC SẢN PHẨM</h5>
            </div>

            <div className="ButtonAddCate">
              <button onClick={handleAddCategory}>
                Thêm danh mục sản phẩm <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="TitleAdminCategory">
            <div className="AdminCategory1">
              <p>ID</p>
            </div>

            <div className="AdminCategory">
              <p>Tên danh mục sản phẩm</p>
            </div>

            <div className="AdminCategory2">
              <p>Sửa</p>
            </div>

            <div className="AdminCategory3">
              <p>Xoá</p>
            </div>
          </div>

          <div className="ListCategory">
            {categories.map((category) => (
              <div key={category.id} className="CategoryItem">
                <div className="IdCategory">
                  <p>{category.id}</p>
                </div>

                <div className="NameCategory">
                  <p>{category.name}</p>
                </div>

                <div className="EditCategory">
                  <i
                    onClick={() => handleEditCategory(category.id)}
                    className="fa-regular fa-pen-to-square"
                  ></i>
                </div>

                <div className="DeleteCategory">
                  <i
                    onClick={() => openDeletePopup(category.id)}
                    className="fa-solid fa-trash"
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {isDeleteOpen && (
            <div className="delete-overlay">
              <div className="delete">
                <p>Bạn có chắc chắn muốn xoá danh mục này?</p>
                <div className="ButtonDeleteCategory">
                  <button onClick={closeDeletePopup}>Không</button>
                  <button onClick={handleDeleteCategory}>Chắc chắn</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
