import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Account.css";
import axios from "axios";

// Hàm format ngày sinh
const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(); // Định dạng ngày theo kiểu "MM/DD/YYYY"
};

const Account = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .post(
          "http://192.168.1.45:8080/api/v1/users/details",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("User details:", response.data);

          const { fullname, address, date_of_birth, phone_number } =
            response.data;

          // Lưu thông tin người dùng vào state
          setProfile({
            fullName: fullname || "Chưa nhập tên",
            address: address || "Chưa nhập địa chỉ",
            dateOfBirth: date_of_birth
              ? formatDate(date_of_birth)
              : "Chưa nhập ngày sinh",
            phoneNumber: phone_number || "Chưa nhập số điện thoại",
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [token]);

  const handleSave = () => {
    const userId = localStorage.getItem("user_id");

    // Gửi thông tin đã sửa tới backend
    axios
      .put(
        `http://192.168.1.45:8080/api/v1/users/details/${userId}`,
        {
          fullname: profile.fullName,
          address: profile.address,
          date_of_birth: profile.dateOfBirth,
          phone_number: profile.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Profile updated successfully", response.data);
        alert("Sửa thông tin thành công");
        setIsEditing(false);
        // Đóng chế độ chỉnh sửa sau khi lưu thành công
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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
            <p>Xin chào, {profile.fullName}!</p>
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
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.fullName}</p>
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
                  <p>{profile.address}</p>
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
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.dateOfBirth}</p>
                )}
              </div>
            </div>

            <div className="ProfileForm">
              <div className="ProfileFormTitle">
                <label>Số điện thoại:</label>
              </div>
              <div className="ProfileFormInput">
                {isEditing ? (
                  <input
                    type="number"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profile.phoneNumber}</p>
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
