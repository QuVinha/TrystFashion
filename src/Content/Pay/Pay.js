import React, { useState, useEffect } from "react";
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
import AoJersey2 from "../../../src/assets/img/featProducts/Jersey2.png";
import FeatProducts1 from "../../../src/assets/img/featProducts/featPrd1.jpg";

const Pay = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

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
                  defaultChecked
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
              <p>Đơn hàng (2 sản phẩm)</p>
            </div>

            <div className="PayProduct">
              <div className="ProductPay">
                <div className="ProductPayImg">
                  <img src={AoJersey2} alt="" />
                </div>
                <div className="ProductPayName">
                  <h5>Áo Jersey Dài Tay Long Sleeve MERSHIER 6398</h5>
                  <p>Size M</p>
                  <p>Màu đỏ</p>
                </div>
                <div className="ProductPayPrice">
                  <p>410.000đ</p>
                </div>
              </div>

              <div className="ProductPay">
                <div className="ProductPayImg">
                  <img src={FeatProducts1} alt="" />
                </div>
                <div className="ProductPayName">
                  <h5>Áo Phông EVOLVEMENT 26159</h5>
                  <p>Size L</p>
                  <p>Màu đỏ</p>
                </div>
                <div className="ProductPayPrice">
                  <p>390.000đ</p>
                </div>
              </div>
            </div>

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
                <div className="EstimatePriceContent2">612.000đ</div>
              </div>

              <div className="EstimatePriceContent">
                <div className="EstimatePriceContent1">Phí vận chuyển</div>
                <div className="EstimatePriceContent2">25.000đ</div>
              </div>
            </div>

            <div className="TotalAmount">
              <div className="TotalAmountContent">
                <div className="TotalAmountContent1">Tổng cộng</div>
                <div className="TotalAmountContent2">637.000đ</div>
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
