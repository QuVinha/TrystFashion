import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DetailsOrder.css";
import { useNavigate, useLocation } from "react-router-dom";

const DetailsOrder = () => {
  const [order1, setOrder1] = useState([]);
  const [order2, setOrder2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("user_id");

        const response = await fetch(
          `http://192.168.10.164:8080/api/v1/orders/user/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        console.log("Đơn hàng:", data);
        setOrder1(data);
      } catch (error) {
        console.error(error);
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://192.168.10.164:8080/api/v1/order_details/order/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        console.log("Chi tiết đơn hàng:", data);
        setOrder2(data);
      } catch (error) {
        console.error(error);
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <div id="main">
      <Header />
      <div className="DetailsOrder">
        <div
          style={{
            backgroundColor: "#000",
            width: "100%",
            height: "10vh",
            zIndex: 1,
          }}
          className="HeaderDetails"
        ></div>

        <div className="YourOrderContent">
          <h1>CHI TIẾT ĐƠN HÀNG</h1>
        </div>

        <div className="ContentDetailsOrder">
          <div className="ContentAdminODLeft">
            <div className="titleOD">
              <div className="titleOD1">
                <p>Thông tin đơn hàng</p>
              </div>
              <div className="titleOD2">
                <p>Đơn giá</p>
              </div>
            </div>

            <div>
              {order2?.map((order2) => (
                <div className="productOD" key={order2?.product_id}>
                  <div className="nameProductOD">
                    <p>{order2?.product_name}</p>
                    <p>X{order2?.quantity}</p>
                  </div>
                  <div className="priceProductOD">
                    <p>
                      {order2?.total_money !== undefined
                        ? `${order2.total_money.toLocaleString()}đ`
                        : "Đang tải..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="totalPriceOD">
              {/* <div className="nameTotalPriceOD">
                <p>Tạm tính </p>
              </div>
              <div className="priceTotalPriceOD">
                <p>599.000đ</p>
              </div> */}
            </div>

            <div className="totalPriceOD">
              <div className="nameTotalPriceOD">
                <p>Phí vận chuyển </p>
              </div>
              <div className="priceTotalPriceOD">
                <p>25.000đ</p>
              </div>
            </div>

            <div className="totalPriceOD">
              <div className="nameTotalPriceOD">
                <p>Tổng tiền </p>
              </div>
              <div className="priceTotalPriceOD">
                <p>
                  {order1?.[0]?.totalMoney !== undefined
                    ? `${order1?.[0]?.totalMoney.toLocaleString()}đ`
                    : "Đang tải..."}
                </p>
              </div>
            </div>

            <div className="titleAddressOD">
              <p>Thông tin giao hàng </p>
            </div>

            <div className="addressOD">
              <div className="addressOD1">
                <p>Họ và tên: </p>
              </div>
              <div className="addressOD2">
                <p>{order1?.[0]?.fullName || "Đang tải..."}</p>
              </div>
            </div>

            <div className="addressOD">
              <div className="addressOD1">
                <p>Địa chỉ: </p>
              </div>
              <div className="addressOD2">
                <p>{order1?.[0]?.address}</p>
              </div>
            </div>

            <div className="addressOD">
              <div className="addressOD1">
                <p>Email: </p>
              </div>
              <div className="addressOD2">
                <p>{order1?.[0]?.email}</p>
              </div>
            </div>

            <div className="addressOD">
              <div className="addressOD1">
                <p>Số điện thoại: </p>
              </div>
              <div className="addressOD2">
                <p>{order1?.[0]?.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailsOrder;
