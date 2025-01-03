import React, { useEffect, useState } from "react";
import "./AdminOrderDetails.css";
import { useNavigate, useLocation } from "react-router-dom";

const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [order1, setOrders1] = useState([]);
  const [order2, setOrders2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName");
    const token = localStorage.getItem("token");
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true);
    }
  }, []);

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

  const handleLogoutAdmin = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    localStorage.removeItem("roleName");
    localStorage.removeItem("cartItems");
    navigate("/login");
    window.scrollTo(0, 0);
  };

  const shippingFee = order1?.payment_shipping === "fast" ? 35000 : 25000;
  const subTotal = order1?.total_money ? order1.total_money - shippingFee : 0;

  const handleAcceptOrder = () => {
    if (!isAdmin) {
      alert("Bạn không có quyền để thực hiện thao tác này");
      return; // Không thực hiện thao tác nếu không phải admin
    }

    const token = localStorage.getItem("token");
    fetch(`http://192.168.1.45:8080/api/v1/orders/confirm/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Đảm bảo gửi token trong header
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text(); // Trả về dữ liệu dạng text nếu có lỗi
        }
        return response.json(); // Nếu thành công, parse dữ liệu dạng JSON
      })
      .then((data) => {
        if (typeof data === "string") {
          // Nếu dữ liệu trả về là một chuỗi thông báo (ví dụ: thông báo lỗi)
          console.log("Thông báo lỗi từ API:", data);
          alert(data); // Hiển thị thông báo lỗi
        } else {
          // Nếu dữ liệu trả về là JSON
          if (data.is_active === false) {
            alert("Đã xảy ra lỗi khi vô hiệu hóa đơn hàng");
          } else {
            alert("Đơn hàng đã bị huỷ");
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        alert("Đơn hàng đã được chấp nhận");
        window.location.reload();
      });
  };

  useEffect(() => {
    fetch(`http://192.168.1.45:8080/api/v1/orders/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Đơn hàng:", data);
        setOrders1(data);
      })
      .catch((err) => {
        setError("Có lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        console.log("Chi tiết đơn hàng:", data);
        setOrders2(data);
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
      <div
        style={{
          width: "100%",
          height: "15vh",
          zIndex: 1,
        }}
        className="HeaderAdmin"
      >
        <div className="LogoShopAdmin">
          <h1 onClick={handleHome}>TRYST </h1>
        </div>

        <div className="LogOutAdmin">
          <div onClick={handleLogoutAdmin} className="IconLogoutAdmin">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>

      <div className="AdminPage">
        <div className="AdminPageLeft">
          <div className="AdminLeftTitle">
            <h5 onClick={handleAdmin}>TRANG QUẢN TRỊ</h5>
          </div>

          <div className="AdminMenuHeader">
            <p>Menu Admin</p>
          </div>

          <div className="AdminMenu">
            <div onClick={handleAccountUser} className="NavAdminMenu1">
              <i className="fa-solid fa-user"></i>
              <a>Quản lý tài khoản</a>
            </div>

            <div onClick={handleAdminProduct} className="NavAdminMenu2">
              <i className="fa-solid fa-shirt"></i>
              <a>Quản lý sản phẩm</a>
            </div>

            <div onClick={handleAdminCategory} className="NavAdminMenu3">
              <i className="fa-solid fa-list"></i>
              <a>Quản lý danh mục sản phẩm</a>
            </div>

            <div onClick={handleAdminOrder} className="NavAdminMenu4">
              <i className="fa-solid fa-truck"></i>
              <a>Quản lý đơn hàng</a>
            </div>
          </div>
        </div>
        <div className="AdminPageRight">
          <div className="AdminRightTitle">
            <h5>CHI TIẾT ĐƠN HÀNG</h5>
          </div>

          <div className="ContentAdminOD">
            <div className="AdminODLeft">
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
                  <div className="nameTotalPriceOD">
                    <p>Tạm tính </p>
                  </div>
                  <div className="priceTotalPriceOD">
                    <p>
                      {subTotal !== 0
                        ? `${subTotal.toLocaleString()}đ`
                        : "Đang tải..."}
                    </p>
                  </div>
                </div>

                <div className="totalPriceOD">
                  <div className="nameTotalPriceOD">
                    <p>Phí vận chuyển </p>
                  </div>
                  <div className="priceTotalPriceOD">
                    <p>{`${shippingFee.toLocaleString()}đ`}</p>
                  </div>
                </div>

                <div className="totalPriceOD">
                  <div className="nameTotalPriceOD">
                    <p>Tổng tiền </p>
                  </div>
                  <div className="priceTotalPriceOD">
                    <p>
                      {order1?.total_money !== undefined
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
                    <p>{order1?.fullname}</p>
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

            {/* RIGHT */}

            <div className="AdminODRight">
              <div className="ContentAdminODRight">
                <div className="titleAddressOD">
                  <p>Thông tin đặt hàng </p>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Mã đơn hàng: </p>
                  </div>
                  <div className="OD2">
                    <p>{order1?.id}</p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Ngày đặt hàng: </p>
                  </div>
                  <div className="OD2">
                    <p>
                      {order1?.order_date &&
                        new Date(order1.order_date).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                    </p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Tên khách hàng: </p>
                  </div>
                  <div className="OD2">
                    <p>{order1?.fullname}</p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Số điện thoại: </p>
                  </div>
                  <div className="OD2">
                    <p>{order1?.phone_number}</p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Email: </p>
                  </div>
                  <div className="OD2">
                    <p>{order1?.email}</p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Tổng tiền: </p>
                  </div>
                  <div className="OD2">
                    <p>
                      {order1?.total_money !== undefined
                        ? `${order1.total_money.toLocaleString()}đ`
                        : "Đang tải..."}
                    </p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Phương thức vận chuyển: </p>
                  </div>
                  <div className="OD2">
                    <p>{order1?.payment_shipping}</p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Phương thức thanh toán: </p>
                  </div>
                  <div className="OD2">
                    <p>{order1?.payment_method}</p>
                  </div>
                </div>

                <div className="OD">
                  <div className="OD1">
                    <p>Trạng thái: </p>
                  </div>
                  <div className="OD2">
                    <p>{order1?.status}</p>
                  </div>
                </div>

                <div className="ButtonAcceptOrder">
                  <button onClick={handleAcceptOrder}>Xác nhận đơn hàng</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
