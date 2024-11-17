import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ChangePassWord.css";

const ChangePassWord = () => {
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
              <p>MẬT KHẨU CŨ*</p>
              <input type="text" placeholder="Mật khẩu cũ" />
            </div>

            <div className="InputPassWord">
              <p>MẬT KHẨU MỚI*</p>
              <input type="text" placeholder="Mật khẩu mới" />
            </div>

            <div className="InputPassWord">
              <p>XÁC NHẬN MẬT KHẨU MỚI*</p>
              <input type="text" placeholder="Xác nhận mật khẩu mới" />
            </div>

            <div className="ButtonPassWord">
              <button>ĐẶT LẠI MẬT KHẨU </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassWord;
