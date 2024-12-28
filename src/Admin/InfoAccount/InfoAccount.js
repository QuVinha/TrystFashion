import React, { useEffect, useState, useContext } from "react";
import "./InfoAccount.css";
import { useNavigate, useParams } from "react-router-dom";

const InfoAccount = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const Delete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const { userId } = useParams(); // Lấy userId từ URL
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName");
    const token = localStorage.getItem("token");
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    // Giả sử bạn có API để lấy thông tin người dùng
    fetch(`http://192.168.10.164:8080/api/v1/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin người dùng");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Thông tin người dùng:", data);
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể tải thông tin người dùng");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Đang tải thông tin...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleDeleteAccount = () => {
    if (!isAdmin) {
      alert("Bạn không có quyền để thực hiện thao tác này");
      return; // Không thực hiện thao tác nếu không phải admin
    }

    const token = localStorage.getItem("token");
    fetch(`http://192.168.10.164:8080/api/v1/users/deactivate/${userInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Đảm bảo gửi token trong header
      },
    })
      .then((response) => {
        // Nếu response không thành công (không phải mã trạng thái 2xx)
        if (!response.ok) {
          return response.text(); // Trả về dữ liệu dạng text nếu có lỗi (có thể là thông báo lỗi)
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
            console.log("Tài khoản đã bị vô hiệu hóa:", data);
            alert("Tài khoản đã bị vô hiệu hóa");
          } else {
            console.log("Có lỗi xảy ra khi vô hiệu hóa tài khoản", data);
            console.log("Dữ liệu trả về:", data);
            alert("Tài khoản đã bị vô hiệu hóa");
            navigate("/accountUser");
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi khi vô hiệu hóa tài khoản:", error);
        alert("Có lỗi xảy ra khi vô hiệu hóa tài khoản");
      });
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
            <h5>THÔNG TIN NGƯỜI DÙNG</h5>
          </div>

          <div className="AccountInfo">
            <div className="InfoUser">
              <div className="InfoLabel">
                <label>ID:</label>
              </div>
              <div className="InfoData">
                <p>{userInfo.id}</p>
              </div>
            </div>

            <div className="InfoUser">
              <div className="InfoLabel">
                <label>Họ tên:</label>
              </div>
              <div className="InfoData">
                <p>{userInfo.fullname}</p>
              </div>
            </div>

            <div className="InfoUser">
              <div className="InfoLabel">
                <label>Tên tài khoản:</label>
              </div>
              <div className="InfoData">
                <p>{userInfo.user_name}</p>
              </div>
            </div>

            <div className="InfoUser">
              <div className="InfoLabel">
                <label>Địa chỉ:</label>
              </div>
              <div className="InfoData">
                <p>{userInfo.address}</p>
              </div>
            </div>

            <div className="InfoUser">
              <div className="InfoLabel">
                <label>Số điện thoại:</label>
              </div>
              <div className="InfoData">
                <p>{userInfo.phone_number}</p>
              </div>
            </div>

            <div className="InfoUser">
              <div className="InfoLabel">
                <label>Ngày sinh:</label>
              </div>
              <div className="InfoData">
                <p>{new Date(userInfo.date_of_birth).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="ButtonDisableUser">
              {isAdmin && (
                <button onClick={() => setIsDeleteOpen(true)}>
                  VÔ HIỆU HOÁ TÀI KHOẢN
                </button>
              )}
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
    </div>
  );
};

export default InfoAccount;
