import React, { useEffect, useState, useContext } from "react";
import "./AdminCategory.css";
import { useNavigate } from "react-router-dom";

const AdminCategory = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const Delete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const [categories, setCategories] = useState([]); // Lưu dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  useEffect(() => {
    // Gọi API khi component được render
    fetch("http://192.168.10.226:8080/api/v1/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json(); // Chuyển đổi dữ liệu thành JSON
      })
      .then((data) => {
        console.log("Categories:", data); // Xem dữ liệu trả về trong console
        setCategories(data); // Lưu dữ liệu vào state
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Có lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false); // Dừng trạng thái tải dữ liệu
      });
  }, []);

  // Nếu đang tải dữ liệu
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  // Nếu có lỗi
  if (error) {
    return <p>{error}</p>;
  }
  const handleHome = () => {
    navigate("/");
  };

  const handleAddCategory = () => {
    navigate("/addCategory");
  };

  const handleEditCategory = () => {
    navigate("/editCategory");
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
          <h1 onClick={handleAdmin}>TRYST </h1>
        </div>

        <div className="LogOutAdmin">
          <div onClick={handleHome} className="IconLogoutAdmin">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
          <div className="AdminRightCategory">
            <div>
              <h5>QUẢN LÝ DANH MỤC SẢN PHẨM</h5>
            </div>

            <div className="ButtonAddCate">
              <button onClick={handleAddCategory}>
                {" "}
                Thêm danh mục sản phẩm <i class="fa-solid fa-plus"></i>{" "}
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
                    onClick={() => Delete(category.id)}
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
                  <button onClick={closeDelete}>Không</button>
                  <button>Chắc chắn</button>
                </div>
              </div>
            </div>
          )}

          {/* <div className="ListCategory">
            <div className="IdCategory">
              <p>6</p>
            </div>

            <div className="NameCategory">
              <p>SWEATER</p>
            </div>

            <div className="EditCategory">
              <i class="fa-regular fa-pen-to-square"></i>
            </div>

            <div className="DeleteCategory">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
