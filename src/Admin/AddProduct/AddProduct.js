import React, { useEffect, useState, useContext } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName"); // Lấy roleName từ localStorage
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true); // Nếu người dùng là admin và có token hợp lệ
    }
  }, []);

  const [productData, setProductData] = useState({
    name: "",
    category_id: "",
    price: "",
    quantity: "",
    color: "",
    color2: "",
    code: "",
    description: "",
  });

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gửi dữ liệu sản phẩm mới lên API
  const handleAddProduct = async () => {
    if (!isAdmin) {
      alert("Bạn không có quyền thêm sản phẩm.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await fetch("http://192.168.10.226/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
        body: JSON.stringify({
          name: productData.name,
          price: parseFloat(productData.price), // Đảm bảo giá trị giá là số
          quantity: parseInt(productData.quantity, 10), // Đảm bảo số lượng là số nguyên
          category_id: parseInt(productData.category_id, 10), // Đảm bảo category_id là số nguyên
          color: productData.color,
          code: productData.code,
          color2: productData.color2,
          description: productData.description,
          url: "", // Nếu bạn có trường này, có thể thêm URL ở đây.
        }),
      });

      if (response.ok) {
        alert("Thêm sản phẩm thành công!");
        // Reset form nếu cần
        setProductData({
          name: "",
          category_id: "",
          price: "",
          quantity: "",
          color: "",
          color2: "",
          code: "",
          description: "",
        });
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
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
          <div className="AdminRightTitle">
            <h5>THÊM SẢN PHẨM MỚI</h5>
          </div>

          <div className="AdminRightAddProduct">
            <div className="FormAddProduct1">
              <input
                type="text"
                placeholder="Tên Sản Phẩm"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="FormAddProduct">
              <input
                type="text"
                placeholder="Danh Mục"
                name="category_id"
                value={productData.category_id}
                onChange={handleInputChange}
              />

              <input
                type="number"
                placeholder="Đơn Giá"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="FormAddProduct">
              <input
                type="text"
                placeholder="Màu 1"
                name="color"
                value={productData.color}
                onChange={handleInputChange}
              />

              <input
                type="text"
                placeholder="Màu 2"
                name="color2"
                value={productData.color2}
                onChange={handleInputChange}
              />
            </div>

            <div className="FormAddProduct">
              <input
                type="number"
                placeholder="Số lượng"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
              />

              <input
                type="text"
                placeholder="Mã sản phẩm"
                name="code"
                value={productData.code}
                onChange={handleInputChange}
              />
            </div>

            <div className="FormAddProduct">
              <textarea
                id="message"
                name="description"
                placeholder="Mô tả sản phẩm"
                value={productData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="FormAddProduct1">
              <input
                type="file"
                accept="image/*"
                placeholder="Hình ảnh sản phẩm"
                name="image"
                // onChange={handleFileChange} // Hàm xử lý khi người dùng chọn file
              />
            </div>

            <div className="ButtonAddProduct">
              <button>THÊM SẢN PHẨM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
