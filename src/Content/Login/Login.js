import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Login.css";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import { jwtDecode } from "jwt-decode";
import BG4HomePage from "../../../src/assets/img/BGHomepage/BGR4home.jpg";

const Login = ({ setUserName }) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateAll = () => {
    const msg = {};
    if (isEmpty(username)) {
      msg.username = "Tên tài khoản không được để trống !";
    }

    if (isEmpty(password)) {
      msg.password = "Mật khẩu không được để trống !";
    } else if (password.length < 4) {
      msg.password = "Mật khẩu phải có ít nhất 5 kí tự!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const onSubmitLogin = () => {
    const isValid = validateAll();
    if (!isValid) return;

    axios
      .post("http://192.168.10.164:8080/api/v1/users/login", {
        user_name: username,
        password: password,
      })
      .then((response) => {
        console.log("Response data:", response.data);

        // Kiểm tra nếu response chứa một JWT token hợp lệ
        const token = response.data; // Vì token là toàn bộ response.data
        if (token && typeof token === "string") {
          try {
            // Giải mã token để lấy thông tin
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken); // Log token đã giải mã
            // Lưu token và các thông tin khác vào localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user_name", decodedToken.userName);
            localStorage.setItem("user_id", decodedToken.userId);
            localStorage.setItem(
              "roleName",
              decodedToken.roleName.toUpperCase()
            );

            setUserName(decodedToken.userName);
            if (decodedToken.roleName.toUpperCase() === "ADMIN") {
              navigate("/admin");
              window.scrollTo(0, 0);
            } else {
              navigate("/");
            }
          } catch (err) {
            console.error("Invalid token format:", err);
            setError("Đăng nhập thất bại, vui lòng thử lại sau.");
          }
        } else {
          console.error("Invalid token received:", token);
          setError("Đăng nhập thất bại, vui lòng thử lại sau.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Sai tên đăng nhập hoặc mật khẩu, vui lòng nhập lại. ");
      });
  };

  return (
    <div id="main">
      <Header />
      <div
        style={{
          backgroundImage: `url(${BG4HomePage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          width: "100%",
          height: "68vh",
          zIndex: 1,
        }}
        className="Login"
      ></div>
      <div className="ContentLogin">
        <div
          className="LoginContent"
          style={{
            borderRadius: "8px",
            zIndex: 1,
            position: "relative",
          }}
        >
          <div className="FormLogin">
            <div className="TitleLogin">
              <p>ĐĂNG NHẬP TÀI KHOẢN</p>
            </div>
            <div className="InputLogin">
              <div className="NameAccount">
                <input
                  type="text"
                  name="username"
                  placeholder="Tên tài khoản"
                  value={username} // Lấy giá trị từ state
                  onChange={(e) => setUsername(e.target.value)}
                  // onKeyDown={handleKeyDown}
                  className={`form-control-dn ${
                    validationMsg.username ? "error" : ""
                  }`}
                />
                {/* Hiển thị lỗi tên tài khoản */}
                <div className="Validate-Notification">
                  <p className="Validator">{validationMsg.username}</p>
                </div>
              </div>
              <div className="PassWord">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                  value={password} // Lấy giá trị từ state
                  onChange={(e) => setPassword(e.target.value)}
                  // onKeyDown={handleKeyDown}
                  className={`form-control-dn ${
                    validationMsg.password ? "error" : ""
                  }`}
                />

                <i
                  style={{
                    position: "absolute",
                    lineHeight: "3",
                    right: "25px",
                    cursor: "pointer",
                  }}
                  className={
                    showPassword
                      ? "fa-regular fa-eye"
                      : "fa-regular fa-eye-slash"
                  }
                  onClick={togglePasswordVisibility}
                ></i>

                <div className="Validate-Notification">
                  <p className="Validator">{validationMsg.password}</p>
                </div>
              </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            <div className="ButtonLogin">
              <button
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "12px 20px",
                  border: "none",
                  width: "100%",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontFamily: "Roboto Condensed, sans-serif",
                }}
                onClick={onSubmitLogin}
              >
                ĐĂNG NHẬP
              </button>
            </div>
            <div className="LinkRegister">
              <a href="/register">Đăng ký</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
