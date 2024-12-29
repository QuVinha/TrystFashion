import React, { useEffect, useState } from "react";
import "./AdminOrder.css";
import { useNavigate } from "react-router-dom";

const AdminOrder = () => {
  const navigate = useNavigate();
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const closeDelete = () => setIsDeleteOpen(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const Delete = (id) => {
    setSelectedOrderId(id);
    setIsDeleteOpen(true); // Hiển thị overlay
  };

  const handleOrderDetails = (orderId) => {
    navigate("/adminOrderDetails", { state: { id: orderId } });
  };

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

  useEffect(() => {
    const roleName = localStorage.getItem("roleName");
    const token = localStorage.getItem("token");
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true);
    }
  }, []);

  const handleDeleteOrder = () => {
    if (!isAdmin) {
      alert("Bạn không có quyền để thực hiện thao tác này");
      return; // Không thực hiện thao tác nếu không phải admin
    }

    const token = localStorage.getItem("token");
    fetch(`http://192.168.1.45:8080/api/v1/orders/disable/${selectedOrderId}`, {
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
        console.error("Lỗi khi vô hiệu hóa tài khoản:", error);
        alert("Đơn hàng đã bị huỷ");
        window.location.reload();
      });
  };

  useEffect(() => {
    fetch("http://192.168.1.45:8080/api/v1/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Đơn hàng:", data);
        setOrders(data);
      })
      .catch((err) => {
        setError("Có lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
            <h5>QUẢN LÝ ĐƠN HÀNG</h5>
          </div>

          <div className="TitleAdminOrder">
            <div className="AdminOrder">
              <p>Mã Đơn hàng</p>
            </div>

            <div className="AdminOrder">
              <p>Tên khách hàng</p>
            </div>

            <div className="AdminOrder">
              <p>Địa chỉ</p>
            </div>

            <div className="AdminOrder">
              <p>Số điện thoại</p>
            </div>

            <div className="AdminOrder">
              <p>Tổng</p>
            </div>

            <div className="AdminOrder">
              <p>Trạng thái</p>
            </div>

            <div className="AdminOrder">
              <p>Chức năng</p>
            </div>
          </div>

          <div className="OrderMap">
            {order.map((order) => (
              <div key={order?.id} className="OrderList">
                <div className="OrderItem">
                  <div className="OrderID">
                    <p>{order?.id}</p>
                  </div>

                  <div className="OrderName">
                    <p>{order?.fullname}</p>
                  </div>

                  <div className="OrderAddress">
                    <p>{order?.address}</p>
                  </div>

                  <div className="OrderPhone">
                    <p>{order?.phone_number}</p>
                  </div>

                  <div className="OrderPrice">
                    <p>
                      {order?.total_money !== undefined
                        ? `${order?.total_money.toLocaleString()}đ`
                        : "Đang tải..."}
                    </p>
                  </div>

                  <div className="OrderStatus">
                    <p>{order?.status}</p>
                  </div>

                  <div className="OrderWatch">
                    <i
                      onClick={() => handleOrderDetails(order?.id)}
                      className="fa-solid fa-magnifying-glass"
                    ></i>
                  </div>
                  <div className="OrderDisable">
                    <i
                      onClick={() => Delete(order?.id)}
                      className="fa-solid fa-ban"
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isDeleteOpen && (
            <div className="delete-overlay">
              <div className="delete">
                <p>Bạn có chắc chắn muốn huỷ đơn hàng này?</p>
                <div className="ButtonDeleteUser">
                  <button onClick={closeDelete}>Không</button>
                  <button onClick={handleDeleteOrder}>Chắc chắn</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
