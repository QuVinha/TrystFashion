import React, { useEffect, useState } from "react";
import "./AccountUser.css";
import { useNavigate } from "react-router-dom";

const AccountUser = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const Delete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://192.168.10.226:8080/api/v1/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Danh sách người dùng:", data); // Xem dữ liệu trong console
        setUsers(data); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể tải người dùng");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          <h1 onClick={handleAdmin}>TRYST </h1>
        </div>

        <div className="LogOutAdmin">
          <div onClick={handleHome} className="IconLogoutAdmin">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>

      <div className="AdminPage">
        <div className="AdminPageLeft">
          <div className="AdminLeftTitle">
            <h5>TRANG QUẢN TRỊ</h5>
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
                  <button>Chắc chắn</button>
                </div>
              </div>
            </div>
          )}

          {/* <div className="ListAccountUser">
            <div className="IdUser">
              <p>10</p>
            </div>

            <div className="NameUser">
              <p>Nguyễn Khắc Quang Vinh</p>
            </div>

            <div className="AccUser">
              <p>QuangVinh18</p>
            </div>

            <div className="AddressUser">
              <p>K104 Mai Lão Bạng</p>
            </div>

            <div className="BirthUser">
              <p>16/8/2002</p>
            </div>

            <div className="PhoneUser">
              <p>0762779408</p>
            </div>

            <div className="WatchUser">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>

            <div className="DisableUser">
              <i class="fa-solid fa-ban"></i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AccountUser;
