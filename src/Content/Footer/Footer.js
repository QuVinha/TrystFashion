import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterContent">
        <div className="FooterContent1">
          <div className="FooterContent1Title">
            <p>TRYST</p>
          </div>
          <div className="FooterContent1CT">
            <div className="IconFooter">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div className="ContentFooter">
              <p>21 Hồ Đắc Di, P. Nam Đồng, Đống Đa, Hà Nội, Việt Nam</p>
            </div>
          </div>
          <div className="FooterContent1CT">
            <div className="IconFooter">
              <i class="fa-solid fa-phone"></i>
            </div>
            <div className="ContentFooter">
              <p>096 925 31 66</p>
            </div>
          </div>
          <div className="FooterContent1CT">
            <div className="IconFooter">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div className="ContentFooter">
              <p>tryst.21hdd@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="FooterContent2">
          <div className="FooterContent2Title">
            <h3 className="TitlePolicy">Thông tin</h3>
          </div>

          <div className="FooterContent2Infor">
            <a className="InforPolicy">Chính sách bảo mật</a>
          </div>

          <div className="FooterContent2Infor">
            <a className="InforPolicy">Chính sách vận chuyển</a>
          </div>

          <div className="FooterContent2Infor">
            <a className="InforPolicy">Chính sách đổi trả</a>
          </div>
        </div>
        <div className="FooterContent3">
          <div className="FooterContent3SUP">
            <div className="TitleSUP">
              <p>ĐĂNG KÝ NHẬN TIN TỪ TRYST</p>
            </div>
            <div className="InputSUP">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                // value={email}
                // onChange={handleEmailChange}
              />
            </div>
            <div className="ButtonSignUPSUP">
              <button> Đăng ký </button>
            </div>
          </div>
          <div className="FooterContent3Social">
            <div className="Social">
              <a href="https://www.facebook.com/tryst.ig/about">
                <i class="fa-brands fa-square-facebook"></i>
              </a>
            </div>
            <div className="Social">
              <a href="https://www.instagram.com/tryst.ig/">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </div>
            <div className="Social">
              <a href="https://www.tiktok.com/@tryst.ig">
                <i class="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
