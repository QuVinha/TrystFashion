import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Account.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    address: "",
    email: "",
  });

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const storedFullName = localStorage.getItem("full_name");
    if (storedFullName) {
      setFullName(storedFullName); // Lưu vào state để sử dụng
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
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

        <div className="AccountRight">
          <div className="AccountRightTitle">
            <h5>THÔNG TIN CÁ NHÂN</h5>
          </div>

          <div className="AccountRightContent">
            <div className="ProfileForm">
              <div className="ProfileFormTitle">
                <label>Họ tên:</label>
              </div>

              <div className="ProfileFormInput">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{fullName || "Chưa nhập tên"}</p>
                )}
              </div>
            </div>

            <div className="ProfileForm">
              <div className="ProfileFormTitle">
                <label>Email:</label>
              </div>

              <div className="ProfileFormInput">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.email || "Chưa nhập email"}</p>
                )}
              </div>
            </div>

            <div className="ProfileForm">
              <div className="ProfileFormTitle">
                <label>Địa chỉ:</label>
              </div>

              <div className="ProfileFormInput">
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.address || "Chưa nhập địa chỉ nhà"}</p>
                )}
              </div>
            </div>

            <div className="ProfileForm">
              <div className="ProfileFormTitle">
                <label>Ngày sinh:</label>
              </div>

              <div className="ProfileFormInput">
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.dob || "Chưa nhập ngày sinh"}</p>
                )}
              </div>
            </div>

            <div className="ProfileFormButton">
              {isEditing ? (
                <button onClick={handleSave}>Lưu</button>
              ) : (
                <button onClick={handleEdit}>Sửa thông tin</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
