import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Pay.css";
import Select from "react-select";
import axios from "axios";
import IconZalopay from "../../assets/img/IconPayment/iconZalopay.png";
import IconVnpay from "../../assets/img/IconPayment/iconVnpay.png";
import IconMomo from "../../assets/img/IconPayment/iconMomo.png";
import IconMoney from "../../assets/img/IconPayment/iconMoney.png";
import IconTransfer from "../../assets/img/IconPayment/iconTransfer.png";

const Pay = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [products1, setProducts1] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("saving");
  const [shippingCost, setShippingCost] = useState(25000);
  const {
    productId,
    cartItems = [],
    selectedSize,
    selectedColor,
    count,
  } = location.state || {};

  useEffect(() => {
    if (productId) {
      fetch(`http://192.168.10.164:8080/api/v1/products/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product data");
          return res.json();
        })
        .then((data) => {
          console.log("Received data:", data);
          if (data) {
            setProducts1(data);
          } else {
            setError("Không có dữ liệu sản phẩm");
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setError("Lỗi khi tải dữ liệu");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        const cityOptions = response.data.map((city) => ({
          label: city.Name,
          value: city.Id,
          districts: city.Districts,
        }));
        setCities(cityOptions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const calculateTotalItems = () => {
    return cartItems.length
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 1; // Nếu không có cartItems, giả định là 1 sản phẩm
  };

  const handleShippingChange = (event) => {
    const selectedMethod = event.target.value;
    setShippingMethod(selectedMethod); // Cập nhật giá trị 'saving' hoặc 'fast'

    if (selectedMethod === "saving") {
      setShippingCost(25000); // Phí vận chuyển tiết kiệm
    } else if (selectedMethod === "fast") {
      setShippingCost(35000); // Phí vận chuyển nhanh
    }
  };

  // Tính tổng giá trị sản phẩm trong giỏ hàng (totalPrice)
  const totalPrice = cartItems.length
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : products1
    ? products1.price * count
    : 0;

  // Trả về giao diện trong trường hợp đang tải hoặc có lỗi
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setDistricts(
      selectedOption.districts.map((district) => ({
        label: district.Name,
        value: district.Id,
        wards: district.Wards,
      }))
    );
    setSelectedDistrict(null);
    setSelectedWard(null);
    setWards([]);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setWards(
      selectedOption.wards.map((ward) => ({
        label: ward.Name,
        value: ward.Id,
      }))
    );
    setSelectedWard(null);
  };

  const handleWardChange = (selectedOption) => {
    setSelectedWard(selectedOption);
  };

  return (
    <div id="main">
      <Header />
      <div
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: "10vh",
          zIndex: 1,
        }}
        className="HeaderPay"
      ></div>

      <div className="Pay">
        <div className="PayContent">
          <div className="PayContentLeft">
            <div className="PayContentLeftTitle1">
              <p>Thông tin thanh toán</p>
            </div>

            <div className="PayContentLeftInput">
              <div className="InputNamePay">
                <input type="text" placeholder="Họ và tên" />
              </div>

              <div className="InputEmailPhonePay">
                <div className="InputEmailPhonePay1">
                  <input type="email" placeholder="E-mail" />
                </div>
                <div className="InputEmailPhonePay2">
                  <input type="text" placeholder="Điện thoại" />
                </div>
              </div>

              <div className="InputAddressPay">
                <input type="text" placeholder="Địa chỉ" />
              </div>

              <div className="InputCityPay">
                {/* Dropdown for City */}
                <div className="InputCityPay1">
                  <Select
                    value={selectedCity}
                    onChange={handleCityChange}
                    options={cities}
                    placeholder="Chọn Tỉnh/Thành phố"
                    isSearchable={true}
                    className="form-select mb-3"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Dropdown for District */}
                <div className="InputCityPay2">
                  <Select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    options={districts}
                    placeholder="Chọn Quận/Huyện"
                    isSearchable={true}
                    isDisabled={!selectedCity}
                    className="form-select mb-3"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Dropdown for Ward */}
                <div className="InputCityPay3">
                  <Select
                    value={selectedWard}
                    onChange={handleWardChange}
                    options={wards}
                    placeholder="Chọn Phường/Xã"
                    isSearchable={true}
                    isDisabled={!selectedDistrict}
                    className="form-select mb-3"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>

            <div className="PayContentLeftTitle2">
              <p>Phương thức vận chuyển</p>
            </div>

            <div className="ShippingOptions">
              <div className="ShippingOption">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="saving-shipping"
                  name="shipping"
                  value="saving"
                  checked={shippingMethod === "saving"}
                  onChange={handleShippingChange}
                />
                <label htmlFor="saving-shipping" className="flex1-label">
                  <div className="label-text">Vận chuyển tiết kiệm</div>
                  <div className="label-price">25.000đ</div>
                </label>
              </div>

              <div className="ShippingOption">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="fast-shipping"
                  name="shipping"
                  value="fast"
                  checked={shippingMethod === "fast"}
                  onChange={handleShippingChange}
                />
                <label htmlFor="fast-shipping" className="flex1-label">
                  <div className="label-text">Vận chuyển nhanh</div>
                  <div className="label-price">35.000đ</div>
                </label>
              </div>
            </div>

            <div className="PayContentLeftTitle2">
              <p>Phương thức thanh toán</p>
            </div>

            <div className="PayOptions">
              <div className="PayOption">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="saving-payment"
                  name="payment"
                  value="saving"
                  defaultChecked
                />
                <label htmlFor="saving-payment" className="flex-label">
                  <div className="pay-text">Thanh toán khi giao hàng (COD)</div>
                  <div className="ImgPayment">
                    <img src={IconMoney} alt="" />
                  </div>
                </label>
              </div>

              <div className="PayOption">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="saving-payment"
                  name="payment"
                  value="fast"
                />
                <label htmlFor="saving-payment" className="flex-label">
                  <div className="pay-text"> Chuyển khoản qua ngân hàng</div>
                  <div className="ImgPayment">
                    <img src={IconTransfer} alt="" />
                  </div>
                </label>
              </div>

              <div className="PayOption">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="saving-payment"
                  name="payment"
                  value="fast"
                />
                <label htmlFor="saving-payment" className="flex-label">
                  <div className="pay-text"> Thanh toán qua ZaloPay</div>
                  <div className="ImgPayment">
                    <img src={IconZalopay} alt="" />
                  </div>
                </label>
              </div>

              <div className="PayOption">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="saving-payment"
                  name="payment"
                  value="fast"
                />
                <label htmlFor="saving-payment" className="flex-label">
                  <div className="pay-text">Thanh toán qua Ví điện tử MoMo</div>
                  <div className="ImgPayment">
                    <img src={IconMomo} alt="" />
                  </div>
                </label>
              </div>

              <div className="PayOption">
                <input
                  style={{ cursor: "pointer" }}
                  type="radio"
                  id="saving-payment"
                  name="payment"
                  value="fast"
                />
                <label htmlFor="saving-payment" className="flex-label">
                  <div className="pay-text"> Thanh toán qua VNPAY-QR</div>
                  <div className="ImgPayment">
                    <img src={IconVnpay} alt="" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="PayContentRight">
            <div className="PayContentRightTitle">
              <p>Đơn hàng ({calculateTotalItems()} sản phẩm)</p>
            </div>

            {products1 && (
              <div className="PayProduct">
                <div className="ProductPay">
                  <div className="ProductPayImg">
                    <img
                      src={`data:image/jpeg;base64,${products1?.url}`}
                      alt={products1?.name}
                    />
                  </div>
                  <div className="ProductPayName">
                    <h5>{products1?.name}</h5>
                    <p>Size {selectedSize}</p>
                    <p>Màu {selectedColor}</p>
                    <p>Số lượng {count}</p>
                  </div>
                  <div className="ProductPayPrice">
                    <p>
                      {Math.floor(products1?.price).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              </div>
            )}

            {cartItems &&
              cartItems.map((product) => (
                <div className="PayProduct" key={product.id}>
                  <div className="ProductPay">
                    <div className="ProductPayImg">
                      <img
                        src={`data:image/jpeg;base64,${product.url}`} // Sử dụng ảnh đúng của sản phẩm
                        alt={product.name}
                      />
                    </div>
                    <div className="ProductPayName">
                      <h5>{product.name}</h5>
                      <p>Màu: {product.color || "N/A"}</p>
                      <p>Size: {product.size || "N/A"}</p>
                      <p>Số lượng: {product.quantity}</p>
                    </div>
                    <div className="ProductPayPrice">
                      <p>
                        {Math.floor(product.price).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            <div className="PayContentRightDiscount">
              <div className="InputDiscount">
                <input type="text" placeholder="Nhập mã giảm giá" />
              </div>
              <div className="ButtonDiscount">
                <button>Áp dụng</button>
              </div>
            </div>

            <div className="EstimatePrice">
              <div className="EstimatePriceContent">
                <div className="EstimatePriceContent1">Tạm tính</div>
                <div className="EstimatePriceContent2">
                  {Math.floor(totalPrice).toLocaleString("vi-VN")}đ
                </div>
              </div>

              <div className="EstimatePriceContent">
                <div className="EstimatePriceContent1">Phí vận chuyển</div>
                <div className="EstimatePriceContent2">
                  {shippingCost > 0
                    ? Math.floor(shippingCost).toLocaleString("vi-VN") + "đ"
                    : "Chưa chọn phương thức"}
                </div>
              </div>
            </div>

            <div className="TotalAmount">
              <div className="TotalAmountContent">
                <div className="TotalAmountContent1">Tổng cộng</div>
                <div className="TotalAmountContent2">
                  {Math.floor(totalPrice + shippingCost).toLocaleString(
                    "vi-VN"
                  )}
                  đ
                </div>
              </div>
            </div>

            <div className="Order">
              <div className="OrderContent">
                <div className="BackToCart">
                  <i class="fa-solid fa-chevron-left"></i>
                  <a href="/cart">Quay về giỏ hàng</a>
                </div>
                <div className="OrderButton">
                  <button>ĐẶT HÀNG</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pay;
