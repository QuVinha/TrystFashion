import React, { useEffect, useState } from "react";
import "./AccountUser.css";
import { useNavigate } from "react-router-dom";

const AccountUser = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const closeDelete = () => setIsDeleteOpen(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const Delete = (id) => {
    setSelectedUserId(id); // Lưu ID người dùng được chọn
    setIsDeleteOpen(true); // Hiển thị overlay
  };

  useEffect(() => {
    const roleName = localStorage.getItem("roleName");
    const token = localStorage.getItem("token");
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.45:8080/api/v1/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Danh sách người dùng:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể tải người dùng");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteAccount = () => {
    if (!isAdmin) {
      alert("Bạn không có quyền để thực hiện thao tác này");
      return; // Không thực hiện thao tác nếu không phải admin
    }

    const token = localStorage.getItem("token");
    fetch(
      `http://192.168.1.45:8080/api/v1/users/deactivate/${selectedUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Đảm bảo gửi token trong header
        },
      }
    )
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
            console.log("Có lỗi xảy ra khi vô hiệu hóa tài khoản", data);
            console.log("Dữ liệu trả về:", data);
            alert("Đã xảy ra lỗi khi vô hiệu hóa tài khoản");
          } else {
            console.log("Tài khoản đã bị vô hiệu hóa:", data);
            alert("Tài khoản đã bị vô hiệu hóa");
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi khi vô hiệu hóa tài khoản:", error);
        alert("Có lỗi xảy ra khi vô hiệu hóa tài khoản");
      });
  };

  // Nếu đang tải dữ liệu
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  // Nếu có lỗi
  if (error) {
    return <p>{error}</p>;
  }

  const handleHome = () => {
    navigate("/");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleInfoAccount = (userId) => {
    navigate(`/infoAccount/${userId}`);
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
            <h5>QUẢN LÝ TÀI KHOẢN</h5>
          </div>

          <div className="TitleAccountUser">
            <div className="AccountUser">
              <p>ID</p>
            </div>

            <div className="AccountUser">
              <p>Họ và tên</p>
            </div>

            <div className="AccountUser">
              <p>Tên tài khoản</p>
            </div>

            <div className="AccountUser">
              <p>Địa chỉ</p>
            </div>

            <div className="AccountUser">
              <p>Ngày sinh</p>
            </div>

            <div className="AccountUser">
              <p>SĐT</p>
            </div>

            <div className="AccountUser">
              <p>Chức năng</p>
            </div>
          </div>

          <div className="ListAccountUser">
            {users.map((user) => (
              <div key={user.id} className="UserItem">
                <div className="IdUser">
                  <p>{user.id}</p>
                </div>
                <div className="NameUser">
                  <p>{user.fullname}</p>
                </div>
                <div className="AccUser">
                  <p>{user.user_name}</p>
                </div>
                <div className="AddressUser">
                  <p>{user.address}</p>
                </div>
                <div className="BirthUser">
                  <p>{new Date(user.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div className="PhoneUser">
                  <p>{user.phone_number}</p>
                </div>
                <div className="WatchUser">
                  <i
                    onClick={() => handleInfoAccount(user.id)}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
                <div className="DisableUser">
                  <i
                    onClick={() => Delete(user.id)}
                    className="fa-solid fa-ban"
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {isDeleteOpen && (
            <div className="delete-overlay">
              <div className="delete">
                <p>Bạn có chắc chắn muốn vô hiệu hoá tài khoản này?</p>
                <div className="ButtonDeleteUser">
                  <button onClick={closeDelete}>Không</button>
                  <button onClick={handleDeleteAccount}>Chắc chắn</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountUser;
