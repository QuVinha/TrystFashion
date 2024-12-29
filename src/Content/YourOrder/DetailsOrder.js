import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DetailsOrder.css";
import { useNavigate, useLocation } from "react-router-dom";

const DetailsOrder = () => {
  const [order1, setOrder1] = useState(null);
  const [order2, setOrder2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        const response = await fetch(
          `http://192.168.1.45:8080/api/v1/orders/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        const selectedOrder = data.find((order) => order.id === id);
        setOrder1(selectedOrder);
      } catch (error) {
        console.error(error);
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://192.168.1.45:8080/api/v1/order_details/order/${id}`,
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
              {order2.map((order) => (
                <div className="productOD" key={order.product_id}>
                  <div className="nameProductOD">
                    <p>{order.product_name}</p>
                    <p>X{order.quantity}</p>
                  </div>
                  <div className="priceProductOD">
                    <p>
                      {order.total_money
                        ? `${order.total_money.toLocaleString()}đ`
                        : "Đang tải..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="totalPriceOD">
              <div className="nameTotalPriceOD">
                <p>Phí vận chuyển </p>
              </div>
              <div className="priceTotalPriceOD">
                <p>
                  {order1?.payment_shipping === "fast" ? "35.000đ" : "25.000đ"}
                </p>
              </div>
            </div>

            <div className="totalPriceOD">
              <div className="nameTotalPriceOD">
                <p>Tổng tiền </p>
              </div>
              <div className="priceTotalPriceOD">
                <p>
                  {order1?.total_money
                    ? `${order1.total_money.toLocaleString()}đ`
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
                <p>{order1?.fullname || "Đang tải..."}</p>
              </div>
            </div>

            <div className="addressOD">
              <div className="addressOD1">
                <p>Địa chỉ: </p>
              </div>
              <div className="addressOD2">
                <p>{order1?.address}</p>
              </div>
            </div>

            <div className="addressOD">
              <div className="addressOD1">
                <p>Email: </p>
              </div>
              <div className="addressOD2">
                <p>{order1?.email}</p>
              </div>
            </div>

            <div className="addressOD">
              <div className="addressOD1">
                <p>Số điện thoại: </p>
              </div>
              <div className="addressOD2">
                <p>{order1?.phone_number}</p>
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
