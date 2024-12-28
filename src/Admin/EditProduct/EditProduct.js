import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = location.state || {};

  const [productData, setProductData] = useState({
    name: "",
    category_id: "",
    price: "",
    color: "",
    color2: "",
    quantity: "",
    code: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName"); // Lấy roleName từ localStorage
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true); // Nếu người dùng là admin và có token hợp lệ
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://192.168.10.164:8080/api/v1/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProductData({
              name: data.name,
              category_id: data.category_id,
              price: data.price,
              color: data.color,
              color2: data.color2,
              quantity: data.quantity,
              code: data.code,
              description: data.description,
              image: data.image,
            });
          } else {
            setError("Không tìm thấy sản phẩm");
          }
        })
        .catch((error) => {
          setError("Lỗi khi tải sản phẩm");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  // Hàm xử lý thay đổi giá trị trong các input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm chỉnh sửa sản phẩm
  const handleEditProduct = async () => {
    // Kiểm tra xem người dùng có quyền admin không
    if (!isAdmin) {
      alert("Bạn không có quyền chỉnh sửa sản phẩm.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await fetch(
        `http://192.168.10.164:8080/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
          body: JSON.stringify(productData), // Gửi dữ liệu cập nhật sản phẩm
        }
      );

      if (response.ok) {
        // Nếu cập nhật thành công
        alert("Cập nhật sản phẩm thành công");
        navigate("/adminProduct"); // Chuyển hướng về trang quản lý sản phẩm
      } else {
        // Nếu cập nhật không thành công
        alert("Cập nhật sản phẩm không thành công");
      }
    } catch (error) {
      // Nếu có lỗi khi gửi yêu cầu
      alert("Lỗi khi cập nhật sản phẩm");
    }
  };

  // Các hàm điều hướng
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            <h5>CHỈNH SỬA THÔNG TIN SẢN PHẨM</h5>
          </div>

          <div className="AdminRightAddProduct">
            <div className="FormAddProduct1">
              <input
                type="text"
                placeholder="Tên Sản Phẩm"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </div>

            <div className="FormAddProduct">
              <input
                type="text"
                placeholder="Danh Mục"
                name="category_id"
                value={productData.category_id}
                onChange={handleChange}
              />

              <input
                type="number"
                placeholder="Đơn Giá"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </div>

            <div className="FormAddProduct">
              <input
                type="text"
                placeholder="Màu 1"
                name="color"
                value={productData.color}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Màu 2"
                name="color2"
                value={productData.color2}
                onChange={handleChange}
              />
            </div>

            <div className="FormAddProduct">
              <input
                type="number"
                placeholder="Số lượng"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Mã sản phẩm"
                name="code"
                value={productData.code}
                onChange={handleChange}
              />
            </div>

            <div className="FormAddProduct">
              <textarea
                id="message"
                name="description"
                placeholder="Mô tả sản phẩm"
                value={productData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="FormAddProduct1">
              <input
                type="file"
                accept="image/*"
                placeholder="Hình ảnh sản phẩm"
                name="image"
                onChange={handleChange}
              />
            </div>

            <div className="ButtonAddProduct">
              <button onClick={handleEditProduct}>CHỈNH SỬA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
