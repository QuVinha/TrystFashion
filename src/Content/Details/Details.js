import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Details.css";
import { useNavigate, useLocation } from "react-router-dom";
import BGR5 from "../../../src/assets/img/BGHomepage/5.jpg";
import AoJersey from "../../../src/assets/img/featProducts/1.png";
import AoJersey2 from "../../../src/assets/img/featProducts/2.png";
import AoJersey3 from "../../../src/assets/img/featProducts/3.png";
import AoJersey4 from "../../../src/assets/img/featProducts/4.png";
import AoJersey5 from "../../../src/assets/img/featProducts/5.png";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("description");

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
      alert("Thêm vào giỏ hàng thành công!");
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

  const [mainImage, setMainImage] = useState(AoJersey);
  const productImages = [
    { src: AoJersey, alt: "Áo Jersey" },
    { src: AoJersey2, alt: "Áo Jersey2" },
    { src: AoJersey3, alt: "Áo Jersey3" },
    { src: AoJersey4, alt: "Áo Jersey4" },
    { src: AoJersey5, alt: "Áo Jersey5" },
  ];

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div id="main">
      <Header />
      <div className="Details">
        <div
          style={{
            // backgroundImage: `url(${BGR5})`,
            // backgroundSize: "cover",
            // backgroundPosition: "100% 30%",
            // position: "relative",
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
              <img src={mainImage} alt="Hình ảnh chính của sản phẩm" />
            </div>
            <div className="productThumbnails">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="thumbnailImage"
                  onClick={() => handleImageClick(image.src)}
                />
              ))}
            </div>
          </div>
          <div className="productDetailsContent">
            <p className="productDetailsName">
              Áo Khoác Kẻ Sọc Form Boxy BLACK WORK 71003
            </p>

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
                <p>BLACKWORK71003</p>
              </div>
            </div>

            <p className="productDetailsPrice">820.000đ</p>

            <div className="productDetailsInventory">
              <div className="productDetailsInventory1">
                <p>Tình trạng:</p>
              </div>
              <div className="productDetailsInventory2">
                <p>Còn hàng</p>
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
              <p>Boxy BLACK WORK 71003</p>
              <p>
                * Màu sắc: Trắng, đen (do màn hình và điều kiện ánh sáng khác
                nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5 -
                10%) [ Nếu bạn cần tư vấn kỹ hơn về sản phẩm, cách mix-match hãy
                chat trực tiếp với team TRYST nhé! ]
              </p>
              <p>
                * Hướng dẫn cách giặt sản phẩm: - Hãy giặt sản phẩm bằng nước
                lạnh, lộn trái khi trước khi giặt [ Khuyến khích sử dụng túi
                giặt ] - Không sử dụng các loại bột/nước giặt có hàm lượng chất
                tẩy cao - Khuyến khích sử dụng các loại nước xả giữ màu và làm
                mềm vải - Hạn chế là/ủi trực tiếp lên hình in/ thêu của sản
                phẩm. * Hỗ trợ đổi hàng theo quy định của Shopee: - Team TRYST
                chỉ chấp nhận đổi sản phẩm nếu có lỗi từ nhà sản xuất, đổi size
                nếu còn hàng trong kho - Vui lòng xem kỹ thông tin sản phẩm
                trước khi đặt mua; mọi trường hợp lý do không thích, không hợp,
                chúng mình xin phép không đổi/ trả hàng - Sản phẩm đổi còn đủ
                tag mác của TRYST, chưa qua sử dụng hoặc giặt sấy.
              </p>
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
