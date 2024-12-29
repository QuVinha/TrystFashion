import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = location.state || {};
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName");
    const token = localStorage.getItem("token");
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true);
    }
  }, []);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };

  const handleUploadDescriptiveImages = async () => {
    if (!id) {
      alert("Không tìm thấy ID sản phẩm. Vui lòng thử lại.");
      return;
    }

    if (!images.some((image) => image)) {
      alert("Vui lòng chọn ít nhất một hình ảnh!");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      if (image) {
        formData.append("files", image); // Key 'files' như trong Postman
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://192.168.1.45:8080/api/v1/products/uploads/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Hình ảnh đã được tải lên thành công!");
        setShowPopup(false); // Đóng Popup sau khi upload thành công
      } else {
        const errorText = await response.text();
        console.error("Lỗi phản hồi:", errorText);
        alert("Có lỗi xảy ra: " + errorText);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể tải lên hình ảnh. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`http://192.168.1.45:8080/api/v1/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch product data");
          }
          return res.json();
        })
        .then((data) => {
          setProductData({
            name: data.name,
            category_id: data.category_id,
            price: data.price,
            color: data.color,
            color2: data.color2,
            quantity: data.quantity,
            code: data.code,
            description: data.description,
            file: null, // Reset file input
            imagePreview: data.image, // Gán ảnh hiện có
          });
        })
        .catch((error) => {
          setError("Lỗi khi tải sản phẩm");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    fetch("http://192.168.1.45:8080/api/v1/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
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
    color: "",
    color2: "",
    quantity: "",
    code: "",
    description: "",
    file: null, // Để xử lý file ảnh
    imagePreview: "", // Hiển thị ảnh xem trước
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProductData((prevData) => ({
          ...prevData,
          file: file,
          imagePreview: reader.result, // Cập nhật ảnh xem trước
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditProduct = async () => {
    if (!isAdmin) {
      alert("Bạn không có quyền chỉnh sửa sản phẩm.");
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
      if (productData.file) {
        formData.append("file", productData.file);
      }

      const response = await fetch(
        `http://192.168.1.45:8080/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Cập nhật sản phẩm thành công");
        navigate("/adminProduct");
      } else {
        const errorData = await response.json();
        alert(`Có lỗi xảy ra: ${errorData.message || "Vui lòng thử lại."}`);
      }
    } catch (error) {
      alert("Lỗi khi cập nhật sản phẩm");
    }
  };

  const openPopup = () => {
    if (!id) {
      alert("Không tìm thấy ID sản phẩm. Vui lòng thử lại.");
      return;
    }
    setShowPopup(true);
  };
  const closePopup = () => setShowPopup(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="main">
      <div className="HeaderAdmin">
        <div className="LogoShopAdmin">
          <h1 onClick={() => navigate("/admin")}>TRYST</h1>
        </div>
        <div className="LogOutAdmin">
          <div onClick={() => navigate("/")} className="IconLogoutAdmin">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>

      <div className="AdminPage">
        <div className="AdminPageLeft">
          <div className="AdminLeftTitle">
            <h5>TRANG QUẢN TRỊ</h5>
          </div>
          <div className="AdminMenu">
            <div
              onClick={() => navigate("/accountUser")}
              className="NavAdminMenu1"
            >
              <i className="fa-solid fa-user"></i>
              <a>Quản lý tài khoản</a>
            </div>
            <div
              onClick={() => navigate("/adminProduct")}
              className="NavAdminMenu2"
            >
              <i className="fa-solid fa-shirt"></i>
              <a>Quản lý sản phẩm</a>
            </div>
            <div
              onClick={() => navigate("/adminCategory")}
              className="NavAdminMenu3"
            >
              <i className="fa-solid fa-list"></i>
              <a>Quản lý danh mục sản phẩm</a>
            </div>
            <div
              onClick={() => navigate("/adminOrder")}
              className="NavAdminMenu4"
            >
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
              <select
                name="category_id"
                value={productData.category_id}
                onChange={handleChange}
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

            <div className="TitleImgProduct">
              <p>Hình ảnh chính sản phẩm</p>
            </div>

            <div className="FormAddProduct1">
              <input
                type="file"
                accept="image/*"
                placeholder="Hình ảnh sản phẩm"
                name="file"
                onChange={handleChange}
              />
            </div>

            <div className="TitleImgProduct">
              <p>Hình ảnh mô tả sản phẩm</p>
            </div>

            <div className="PickDetailsImgProduct">
              <button onClick={openPopup}>Chọn hình ảnh</button>
            </div>

            {showPopup && (
              <div className="Popup-overlay" onClick={closePopup}>
                <div className="Popup" onClick={(e) => e.stopPropagation()}>
                  <div className="PopupContent">
                    <div className="TitlePopupContent">
                      <p>Chọn hình ảnh mô tả sản phẩm</p>
                    </div>

                    {Array.from({ length: 4 }, (_, index) => (
                      <div key={index}>
                        <div className="TitleImgDetailsProduct">
                          <p>Hình ảnh {index + 1}</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          name={`file${index}`}
                          onChange={(e) => handleFileChange(e, index)}
                        />
                      </div>
                    ))}

                    <div className="ButtonPopup">
                      <button onClick={handleUploadDescriptiveImages}>
                        Thêm hình ảnh
                      </button>
                      <button onClick={closePopup}>Đóng</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="ButtonEditProduct">
              <button onClick={handleEditProduct}>CHỈNH SỬA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
