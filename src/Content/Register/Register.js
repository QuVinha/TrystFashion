import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Register.css";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import { useNavigate } from "react-router-dom";
import BG4HomePage from "../../../src/assets/img/BGHomepage/BGR4home.jpg";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onChangeFullname = (event) => {
    const value = event.target.value;
    setFullname(value);
  };

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setUser_name(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onChangeAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const onChangePhoneNumber = (event) => {
    const value = event.target.value;
    setPhone_number(value);
  };

  const onChangeConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const onChangeDate = (event) => {
    const value = event.target.value;
    setBirthday(value);
  };

  const validateAll = () => {
    const msg = {};
    const regex = /^[a-zA-Z0-9]+$/;

    if (isEmpty(fullname)) {
      msg.fullname = "Họ và tên không được để trống!";
    }

    if (isEmpty(address)) {
      msg.address = "Địa chỉ không được để trống!";
    }

    if (isEmpty(user_name)) {
      msg.user_name = "Tên tài khoản không được để trống!";
    } else if (user_name.length < 3 || user_name.length > 10) {
      msg.user_name = "Tên tài khoản phải từ 3-8 kí tự!";
    } else if (!regex.test(user_name)) {
      msg.user_name = "Tên tài khoản chỉ chứa các ký tự chữ cái, chữ số!";
    }

    if (isEmpty(password)) {
      msg.password = "Mật khẩu không được để trống!";
    } else if (password.length < 6) {
      msg.password = "Độ dài mật khẩu phải trên 6 kí tự!";
    } else if (!regex.test(password)) {
      msg.password = "Mật khẩu chỉ chứa các ký tự chữ cái, chữ số!";
    }

    if (password !== confirmPassword) {
      msg.confirmPassword = "Mật khẩu nhập lại không khớp!";
    }

    if (isEmpty(phone_number)) {
      msg.phone_number = "Số điện thoại không được để trống!";
    } else if (!/^\d+$/.test(phone_number)) {
      msg.phone_number = "Số điện thoại chỉ được chứa chữ số!";
    } else if (phone_number.length !== 10) {
      msg.phone_number = "Số điện thoại phải có đúng 10 chữ số!";
    } else if (/^(\d)\1{9}$/.test(phone_number)) {
      msg.phone_number = "Số điện thoại không được chứa 10 chữ số giống nhau!";
    } else if (!phone_number.startsWith("0")) {
      msg.phone_number = "Số điện thoại phải bắt đầu bằng số 0!";
    }

    if (isEmpty(birthday)) {
      msg.birthday = "Ngày sinh không được để trống!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleRegister = async () => {
    const isValid = validateAll();
    if (!isValid) return;

    const userData = {
      fullname: fullname,
      user_name: user_name,
      password: password,
      address: address,
      phone_number: phone_number,
      date_of_birth: birthday, // date_of_birth instead of birthday
      role_id: 1, // Set role_id to 1
      facebook_account_id: 0, // Default to 0 as per the API spec
      google_account_id: 0, // Default to 0 as per the API spec
    };

    try {
      const response = await axios.post(
        "http://192.168.1.45:8080/api/v1/users/register",
        userData
      );
      alert("Đăng ký thành công");
      navigate("/login");

      console.log("Registration successful:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Assuming the backend returns a 400 status for duplicate usernames
        if (
          error.response.data.message &&
          error.response.data.message.includes("Tên tài khoản đã tồn tại")
        ) {
          alert("Tên đăng nhập đã có người sử dụng");
        } else {
          alert("Tên đăng nhập đã có người sử dụng");
        }
      } else {
        console.error("Registration failed:", error.response?.data || error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    }
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
        className="Register"
      ></div>
      <div className="ContentRegister">
        <div
          className="RegisterContent"
          style={{
            borderRadius: "8px",
            zIndex: 1,
            position: "relative",
          }}
        >
          <div className="FormRegister">
            <div className="TitleRegister">
              <p>ĐĂNG KÝ TÀI KHOẢN</p>
            </div>

            <div className="InputRegister">
              <div className="NameAccountRegister">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Họ và tên"
                  value={fullname}
                  onChange={onChangeFullname}
                  className={`form-control-dn ${
                    validationMsg.fullname ? "error" : ""
                  }`}
                />
                <div className="Validate-Notification">
                  <p className="Validator">{validationMsg.fullname}</p>
                </div>
              </div>

              <div className="NameAccountRegister">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Tên tài khoản"
                  value={user_name}
                  onChange={onChangeUsername}
                  className={`form-control-dn ${
                    validationMsg.user_name ? "error" : ""
                  }`}
                />
                <div className="Validate-Notification">
                  <p className="Validator">{validationMsg.user_name}</p>
                </div>
              </div>

              <div className="PassWordRegister">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={onChangePassword}
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

              <div className="PassWordRegister">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  className={`form-control-dn ${
                    validationMsg.confirmPassword ? "error" : ""
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
                  <p className="Validator">{validationMsg.confirmPassword}</p>
                </div>
              </div>

              <div className="NameAccountRegister">
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Số điện thoại"
                  value={phone_number}
                  onChange={onChangePhoneNumber}
                  className={`form-control-dn ${
                    validationMsg.phone_number ? "error" : ""
                  }`}
                />
                <div className="Validate-Notification">
                  <p className="Validator">{validationMsg.phone_number}</p>
                </div>
              </div>

              <div className="NameAccountRegister">
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={onChangeAddress}
                  className={`form-control-dn ${
                    validationMsg.address ? "error" : ""
                  }`}
                />
                <div className="Validate-Notification">
                  <p className="Validator">{validationMsg.address}</p>
                </div>
              </div>

              <div className="PassWordRegister">
                <input
                  type="date"
                  name="birthday"
                  placeholder="Ngày sinh"
                  value={birthday}
                  onChange={onChangeDate}
                  className={`form-control-dn ${
                    validationMsg.birthday ? "error" : ""
                  }`}
                />
                <div className="Validate-Notification">
                  <p className="Validator">{validationMsg.birthday}</p>
                </div>
              </div>
            </div>

            <div className="ButtonRegister">
              <button
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "12px 20px",
                  border: "none",
                  width: "100%",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={handleRegister}
              >
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
