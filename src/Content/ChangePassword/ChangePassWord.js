import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ChangePassWord.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassWord = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Hàm xử lý thay đổi mật khẩu
  const handleChangePassword = () => {
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không đúng. Vui lòng nhập lại.");
      return;
    }

    setErrorMessage(""); // Xóa thông báo lỗi nếu mật khẩu đúng

    // Gửi yêu cầu PUT để thay đổi mật khẩu
    setIsLoading(true);
    axios
      .put(
        `http://192.168.1.45:8080/api/v1/users/details/${userId}`,
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Password updated successfully", response.data);
        alert("Đổi mật khẩu thành công!");
        setIsLoading(false);
        navigate("/account"); // Chuyển hướng đến trang tài khoản
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        alert("Đổi mật khẩu không thành công. Vui lòng thử lại.");
        setIsLoading(false);
      });
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
        className="HeaderAccount"
      ></div>
      <div className="Account">
        <div className="AccountLeft">
          <div className="AccountLeftTitle">
            <h5>TRANG TÀI KHOẢN</h5>
            <p>Xin chào, Quang Vinh!</p>
          </div>

          <div className="AccountLeftContent">
            <div className="NavBarAccountLeft">
              <a href="/account"> Thông tin cá nhân</a>
            </div>
            <div className="NavBarAccountLeft">
              <a href="/password"> Đổi mật khẩu</a>
            </div>
          </div>
        </div>

        <div className="PassWordRight">
          <div className="PassWordRightTitle">
            <h5>ĐỔI MẬT KHẨU</h5>
          </div>

          <div className="PassWordRightContent">
            <div className="InputPassWord">
              <p>MẬT KHẨU MỚI*</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <i
                className={
                  showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
                }
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className="InputPassWord">
              <p>XÁC NHẬN MẬT KHẨU MỚI*</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className={
                  showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
                }
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="ButtonPassWord">
              <button onClick={handleChangePassword} disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "ĐẶT LẠI MẬT KHẨU"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassWord;
