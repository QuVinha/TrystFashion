import React, { useEffect, useState, useContext } from "react";
import "./AdminProduct.css";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const Delete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleHome = () => {
    navigate("/");
  };

  const handleAddProduct = () => {
    navigate("/addProduct");
  };

  const handleEditProduct = (productId) => {
    navigate("/editProduct", { state: { id: productId } });
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

  useEffect(() => {
    const roleName = localStorage.getItem("roleName"); // Lấy roleName từ localStorage
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true); // Nếu người dùng là admin và có token hợp lệ
    }
  }, []);

  const openDeletePopup = (productId) => {
    setDeleteProductId(productId); // Lưu ID sản phẩm cần xóa
    setIsDeleteOpen(true);
  };

  const closeDeletePopup = () => {
    setDeleteProductId(null); // Xóa ID sản phẩm cần xóa
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    fetch("http://192.168.1.45:8080/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dữ liệu nhận được:", data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products) {
          setProducts(data.products);
        } else {
          setError("Không có dữ liệu sản phẩm");
        }
      })
      .catch((error) => {
        console.log("Lỗi khi tải sản phẩm:", error);
        setError("Lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteProduct = async () => {
    // Kiểm tra xem người dùng có quyền admin không
    if (!isAdmin) {
      alert("Bạn không có quyền xóa sản phẩm.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await fetch(
        `http://192.168.1.45:8080/api/v1/products/${deleteProductId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      if (response.ok) {
        // Nếu xoá thành công
        alert("Xoá sản phẩm thành công");
        setProducts(
          products.filter((product) => product.id !== deleteProductId)
        ); // Cập nhật lại danh sách sản phẩm
        closeDeletePopup(); // Đóng popup xác nhận xóa
      } else {
        // Nếu không thành công
        alert("Xoá sản phẩm không thành công");
      }
    } catch (error) {
      // Nếu có lỗi khi gửi yêu cầu
      alert("Lỗi khi xóa sản phẩm");
    }
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
          <div className="AdminRightProduct">
            <div>
              <h5>QUẢN LÝ SẢN PHẨM</h5>
            </div>

            <div className="ButtonAddPrd">
              <button onClick={handleAddProduct}>
                {" "}
                Thêm sản phẩm <i class="fa-solid fa-plus"></i>{" "}
              </button>
            </div>
          </div>

          <div className="TitleAdminProduct">
            <div className="AdminProduct">
              <p>ID</p>
            </div>

            <div className="AdminProduct">
              <p>Tên sản phẩm</p>
            </div>

            <div className="AdminProduct">
              <p>Đơn giá</p>
            </div>

            <div className="AdminProduct">
              <p>Số lượng</p>
            </div>

            {/* <div className="AdminProduct">
              <p>Mô tả</p>
            </div> */}

            <div className="AdminProduct">
              <p>Danh mục</p>
            </div>

            {/* <div className="AdminProduct">
              <p>Hình ảnh</p>
            </div> */}

            <div className="AdminProduct">
              <p>Sửa</p>
            </div>

            <div className="AdminProduct">
              <p>Xoá</p>
            </div>
          </div>

          <div className="ProductMap">
            {products.map((product) => (
              <div key={product?.id} className="ProductList">
                <div className="ProductItem">
                  <div className="IDProduct">
                    <p>{product?.id}</p>
                  </div>
                  <div className="NameProduct">
                    <p>{product?.name}</p>
                  </div>
                  <div className="PriceProduct">
                    <p>
                      {product?.price !== undefined
                        ? `${product?.price.toLocaleString()}đ`
                        : "Đang tải..."}
                    </p>
                  </div>
                  <div className="QuantityProduct">
                    <p>{product?.quantity}</p>
                  </div>
                  {/* <div className="DesProduct">
                    <p>{product?.description}</p>
                  </div> */}
                  <div className="CategoryProduct">
                    <p>{product?.category.name}</p>
                  </div>
                  {/* <div className="ImageProduct">
                    {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <p>Không có hình ảnh</p>
          )}
                  </div> */}
                  <div className="EditProduct">
                    <i
                      onClick={() => handleEditProduct(product?.id)}
                      className="fa-regular fa-pen-to-square"
                    ></i>
                  </div>
                  <div className="DeleteProduct">
                    <i
                      onClick={() => openDeletePopup(product.id)}
                      className="fa-solid fa-trash"
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDeleteOpen && (
        <div className="delete-overlay">
          <div className="delete">
            <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
            <div className="ButtonDeleteProduct">
              <button onClick={closeDeletePopup}>Không</button>
              <button onClick={handleDeleteProduct}>Chắc chắn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
