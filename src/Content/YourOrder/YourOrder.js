import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./YourOrder.css";

const YourOrder = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDetailsOrder = (orderId) => {
    navigate("/detailsOrder", { state: { id: orderId } });
  };

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
        setOrder(data);
      } catch (error) {
        console.error(error);
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div id="main">
      <Header />
      <div className="YourOrder">
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
          <h1>ĐƠN HÀNG</h1>
        </div>

        <div className="OrderDetails">
          <div className="TitleOrderDetails">
            <div className="YOtitle">
              <p>Mã đơn hàng</p>
            </div>
            <div className="YOtitle">
              <p>Ngày đặt hàng</p>
            </div>
            <div className="YOtitle">
              <p>Tổng tiền</p>
            </div>
            <div className="YOtitle">
              <p>Trạng thái</p>
            </div>
          </div>

          {order.length > 0 &&
            order.map((item, index) => (
              <div
                onClick={() => handleDetailsOrder(item?.id)}
                className="ContentOrderDetails"
                key={index}
              >
                <div className="YOtitle">
                  <p>{item.id}</p>
                </div>
                <div className="YOtitle">
                  <p>
                    {item?.orderDate &&
                      new Date(item.orderDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                  </p>
                </div>
                <div className="YOtitle">
                  <p>{item.totalMoney?.toLocaleString()}đ</p>
                </div>
                <div className="YOtitle">
                  <p>{item.status}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YourOrder;
