import React, { useEffect, useState, useContext } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const roleName = localStorage.getItem("roleName"); // Lấy roleName từ localStorage
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true); // Nếu người dùng là admin và có token hợp lệ
    }
  }, []);

  // Gọi API danh mục sản phẩm
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
        console.error(err);
        setError("Không thể tải danh mục sản phẩm");
      })
      .finally(() => {
        setLoading(false);
      });
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
    file: null, // Lưu trữ file ảnh
  });

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files && files[0]) {
      // Kiểm tra loại file
      if (!files[0].type.startsWith("image/")) {
        alert("Vui lòng chọn một tệp hình ảnh.");
        return;
      }

      setProductData((prevState) => ({
        ...prevState,
        file: files[0],
      }));
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  //API thêm sản phẩm
  const handleAddProduct = async () => {
    if (!isAdmin) {
      alert("Bạn không có quyền thêm sản phẩm.");
      return;
    }

    if (
      !productData.name ||
      !productData.category_id ||
      !productData.price ||
      !productData.file
    ) {
      alert("Vui lòng điền đầy đủ thông tin và chọn hình ảnh.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("categoryId", productData.category_id);
      formData.append("price", productData.price);
      formData.append("quantity", productData.quantity);
      formData.append("color", productData.color);
      formData.append("color2", productData.color2);
      formData.append("code", productData.code);
      formData.append("description", productData.description);
      formData.append("file", productData.file);

      const response = await fetch("http://192.168.1.45:8080/api/v1/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Thêm sản phẩm thành công!");
        setProductData({
          name: "",
          category_id: "",
          price: "",
          quantity: "",
          color: "",
          color2: "",
          code: "",
          description: "",
          file: null,
        });
      } else {
        const errorData = await response.json();
        alert(`Có lỗi xảy ra: ${errorData.message || "Vui lòng thử lại."}`);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
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
              <select
                name="category_id"
                value={productData.category_id}
                onChange={handleInputChange}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

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

            <div className="TitleImgProduct">
              <p>Hình ảnh chính sản phẩm</p>
            </div>

            <div className="FormAddProduct1">
              <input
                type="file"
                accept="image/*"
                placeholder="Hình ảnh sản phẩm"
                name="file"
                onChange={handleInputChange}
              />
            </div>

            <div className="ButtonAddProduct">
              <button onClick={handleAddProduct}>THÊM SẢN PHẨM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
