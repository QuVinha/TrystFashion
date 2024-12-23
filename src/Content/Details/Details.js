import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Details.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const { id } = location.state || {};
  const [products1, setProducts1] = useState(null);
  const [products2, setProducts2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useContext(CartContext);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const Up = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };

  const Down = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
    setErrorMessage("");
  };

  const handleSizeClick = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
    setErrorMessage("");
  };

  const handleAddToCart = () => {
    let isValid = true;

    if (!selectedSize && !selectedColor) {
      setErrorMessage("Vui lòng chọn size và màu sắc");
      isValid = false;
    } else if (!selectedSize) {
      setErrorMessage("Vui lòng chọn size");
      isValid = false;
    } else if (!selectedColor) {
      setErrorMessage("Vui lòng chọn màu sắc");
      isValid = false;
    }

    if (isValid) {
      addToCart(products1);
      alert("Thêm giỏ hàng thành công!");
    }
  };

  const handleBuyNow = () => {
    let isValid = true;

    if (!selectedSize && !selectedColor) {
      setErrorMessage("Vui lòng chọn size và màu sắc");
      isValid = false;
    } else if (!selectedSize) {
      setErrorMessage("Vui lòng chọn size");
      isValid = false;
    } else if (!selectedColor) {
      setErrorMessage("Vui lòng chọn màu sắc");
      isValid = false;
    }

    if (isValid) {
      navigate("/pay");
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`http://192.168.10.226:8080/api/v1/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Received data:", data);
          if (data) {
            setProducts1(data);
          } else {
            setError("Không có dữ liệu sản phẩm");
          }
        })
        .catch((error) => {
          console.log("Error fetching products:", error);
          setError("Lỗi khi tải dữ liệu");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://192.168.10.226:8080/api/v1/products/images/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Received data:", data);
          if (data) {
            setProducts2(data);
          } else {
            setError("Không có dữ liệu sản phẩm");
          }
        })
        .catch((error) => {
          console.log("Error fetching products:", error);
          setError("Lỗi khi tải dữ liệu");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleThumbnailClick = (imageData) => {
    setSelectedImage(imageData);
  };

  return (
    <div id="main">
      <Header />
      <div className="Details">
        <div
          style={{
            backgroundColor: "#000",
            width: "100%",
            height: "10vh",
            zIndex: 1,
          }}
          className="HeaderDetails"
        ></div>

        <div className="productDetails">
          <div className="ImgProductDetails">
            <div className="productDetailsImg">
              {selectedImage ? (
                <img
                  src={`data:image/png;base64,${selectedImage}`}
                  alt={products1?.name}
                />
              ) : products2 && products2.length > 0 ? (
                <img
                  src={`data:image/png;base64,${products2[0]}`}
                  alt={products1?.name}
                />
              ) : (
                <p>Không có hình ảnh sản phẩm</p>
              )}
            </div>
            <div className="productThumbnails">
              {products2 && products2.length > 0 ? (
                products2.map((imageData, index) => (
                  <img
                    key={index}
                    src={`data:image/png;base64,${imageData}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnailImage"
                    onClick={() => handleThumbnailClick(imageData)}
                  />
                ))
              ) : (
                <p>Không có hình ảnh thumbnail</p>
              )}
            </div>
          </div>
          <div className="productDetailsContent">
            <p className="productDetailsName">{products1?.name}</p>

            <div className="productDetailsTrademark">
              <div className="productDetailsTrademark1">
                <p>Thương hiệu: </p>
              </div>
              <div className="productDetailsTrademark2">
                <p>TRYST</p>
              </div>

              <span>|</span>

              <div className="productDetailsTrademark1">
                <p>Mã SP: </p>
              </div>
              <div className="productDetailsTrademark2">
                <p>{products1?.code}</p>
              </div>
            </div>

            <p className="productDetailsPrice">
              {Math.floor(products1?.price).toLocaleString("vi-VN")}đ
            </p>

            <div className="productDetailsInventory">
              <div className="productDetailsInventory1">
                <p>Tình trạng:</p>
              </div>
              <div className="productDetailsInventory2">
                <p>Hiện còn {products1?.quantity} sản phẩm</p>
              </div>
            </div>

            <div className="productDetailsIncluded">
              <div className="productDetailsIncluded1">
                <p>Đi kèm:</p>
              </div>
              <div className="productDetailsIncluded2">
                <p>Tag, Sticker</p>
              </div>
            </div>

            <div className="productDetailsSize">
              <div className="productDetailsSize1">
                <p>Size:</p>
              </div>
              <div className="productDetailsSize2">
                <button
                  onClick={() => handleSizeClick("M")}
                  className={selectedSize === "M" ? "selected" : ""}
                >
                  M
                  {selectedSize === "M" && <div className="corner-check"></div>}
                </button>
                <button
                  onClick={() => handleSizeClick("L")}
                  className={selectedSize === "L" ? "selected" : ""}
                >
                  L
                  {selectedSize === "L" && <div className="corner-check"></div>}
                </button>
              </div>
            </div>

            <div className="productDetailsColor">
              <div className="productDetailsColor1">
                <p>Màu Sắc:</p>
              </div>
              <div className="productDetailsColor2">
                <button
                  onClick={() => handleColorClick("Trắng")}
                  className={selectedColor === "Trắng" ? "selected" : ""}
                >
                  Trắng
                  {selectedColor === "Trắng" && (
                    <div className="corner-check"></div>
                  )}
                </button>
                <button
                  onClick={() => handleColorClick("Đen")}
                  className={selectedColor === "Đen" ? "selected" : ""}
                >
                  Đen
                  {selectedColor === "Đen" && (
                    <div className="corner-check"></div>
                  )}
                </button>
              </div>
            </div>

            <div className="productDetailsQuantity">
              <div className="productDetailsQuantity1">
                <p>Số lượng:</p>
              </div>
              <div className="productDetailsQuantity2">
                <button onClick={Down}>-</button>
                <p className="numQuantity">{count}</p>
                <button onClick={Up}>+</button>
              </div>
            </div>

            {errorMessage && (
              <p style={{ color: "red", paddingTop: "20px" }}>{errorMessage}</p>
            )}

            <div className="productDetailsBuy">
              <div className="productDetailsBtnBuy">
                <button onClick={handleAddToCart} className="btnAdd">
                  Thêm Vào Giỏ Hàng
                </button>
                <button onClick={handleBuyNow} className="btnBuy">
                  Mua Ngay
                </button>
              </div>
            </div>

            <div className="productDetails"></div>
          </div>
        </div>

        <div className="productDetailsS">
          <div className="tabDetails">
            <div
              className={`productDetailsSTitle1 ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => handleTabClick("description")}
            >
              <p>MÔ TẢ SẢN PHẨM</p>
            </div>

            <div
              className={`productDetailsSTitle2 ${
                activeTab === "details" ? "active" : ""
              }`}
              onClick={() => handleTabClick("details")}
            >
              <p>CHI TIẾT SẢN PHẨM</p>
            </div>

            <div
              className={`productDetailsSTitle3 ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              <p>ĐÁNH GIÁ</p>
            </div>
          </div>

          {/* Nội dung của từng tab */}
          {activeTab === "description" && (
            <div className="productDetailsSContent">
              {products1?.description}
            </div>
          )}

          {activeTab === "details" && (
            <div className="productDetailsSContent1">
              <div className="details">
                <label className="detailsLabel">Kho</label>
                <div>8</div>
              </div>
              <div className="details">
                <label className="detailsLabel">Chi tiết</label>
                <div>Cổ trung</div>
              </div>
              <div className="details">
                <label className="detailsLabel">Kiểu dáng</label>
                <div>Dài tay</div>
              </div>

              <div className="details">
                <label className="detailsLabel">Chất liệu</label>
                <div>Vải lụa</div>
              </div>
              <div className="details">
                <label className="detailsLabel">Gửi từ</label>
                <div>Hà Nội</div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="productDetailsSContent2">
              <p>Hiện chưa có đánh giá cho sản phẩm này.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
