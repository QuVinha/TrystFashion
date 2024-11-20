import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import emailjs from "@emailjs/browser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AoJacket from "../../../src/assets/img/featProducts/1.png";
import BG2HomePage from "../../../src/assets/img/BGHomepage/BGR2-Homepage.jpg";
import BG1HomePage from "../../../src/assets/img/BGHomepage/BGhome.jpg";
import Thy from "../../../src/assets/img/BGHomepage/thy.jpg";
import Thy1 from "../../../src/assets/img/BGHomepage/thy1.jpg";
import Thy2 from "../../../src/assets/img/BGHomepage/thy2.jpg";
import BG7HomePage from "../../../src/assets/img/BGHomepage/BG3.jpg";
import ImgPhotoSimple1 from "../../../src/assets/img/proDPSample/1.jpg";
import ImgPhotoSimple2 from "../../../src/assets/img/proDPSample/2.jpg";
import ImgPhotoSimple3 from "../../../src/assets/img/proDPSample/3.jpg";
import FeatProducts1 from "../../../src/assets/img/featProducts/featPrd1.jpg";
import FeatProducts2 from "../../../src/assets/img/featProducts/featPrd2.jpg";
import FeatProducts3 from "../../../src/assets/img/featProducts/featPrd3.jpg";
import FeatProducts4 from "../../../src/assets/img/featProducts/featPrd4.jpg";
import vidHome from "../../../src/assets/img/VideoHome.mp4";

const HomePage = () => {
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDetails = () => {
    navigate("/details");
    window.scrollTo(0, 0);
  };

  const handleBuyNow = () => {
    navigate("/pay");
    window.scrollTo(0, 0);
  };

  const Up = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };

  const Down = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const handleSizeClick = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  useEffect(() => {
    const videoElement = document.getElementById("productVideoWC5");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    // Quan sát video
    if (videoElement) {
      observer.observe(videoElement);
    }

    // Hủy bỏ observer khi component bị gỡ bỏ
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data submitted:", formData);

    emailjs
      .send(
        "service_hua7xai",
        "template_96zujt9",
        formData,
        "mzkpytI6V136WzlnF"
      )
      .then(
        (response) => {
          console.log("Message sent successfully:", response);
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("Failed to send message:", error);
          alert("Failed to send message, please try again.");
        }
      );
  };

  const settings = {
    infinite: true, // Vòng lặp vô hạn
    speed: 500, // Tốc độ chuyển đổi
    slidesToShow: 1, // Hiển thị 1 ảnh tại 1 thời điểm
    slidesToScroll: 1, // Di chuyển 1 slide mỗi lần
    autoplay: true, // Tự động chuyển
    autoplaySpeed: 2050, // Thời gian chuyển đổi ảnh
    arrows: false, // Ẩn nút mũi tên
    lazyLoad: "progressive",
  };

  const images = [Thy, Thy1, Thy2];

  return (
    <div id="main">
      <Header />

      <div className="HomePage">
        <div
          className="HomeTop"
          style={{
            position: "relative",
            width: "100%",
            height: "700px",
          }}
        >
          {/* Slider */}
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <div
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100vh",
                    transition: "background-image 0.5s ease-in-out",
                  }}
                ></div>
              </div>
            ))}
          </Slider>

          <div
            className="Welcome"
            style={{
              position: "absolute", // Đặt nội dung nằm trên slider
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              color: "white",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="WelcomeShop">
              <h3>WELCOME TO TRYST FASHION</h3>
            </div>
            <div className="Slogan">
              <h2>
                "TRY SOMETHING NOW IF YOU DON'T TRY YOU'LL MISS SOMETHING."
              </h2>
            </div>
          </div>
        </div>

        <div className="Welcome2">
          <div className="welcome-container">
            <h1 className="welcome-text">TRYST</h1>
          </div>
          <div className="welcome-dis">
            <p>
              "Sứ mệnh của chúng tôi là cung cấp quần áo thời trang chất lượng
              cao, không chỉ làm đẹp tủ đồ của bạn mà còn nuôi dưỡng cảm giác
              thân thuộc vì mỗi sản phẩm đều được tuyển chọn kỹ lưỡng để truyền
              cảm hứng tự tin và tôn vinh sự đa dạng, đồng thời đảm bảo rằng quy
              trình sản xuất của chúng tôi tôn trọng cả con người và hành tinh."
            </p>
          </div>
        </div>

        <div
          className="Welcome5"
          style={{
            backgroundImage: `url(${BG2HomePage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            width: "100%",
            zIndex: 1,
            // filter: "blur(2px)",
          }}
        >
          <div className="productVideoWC5">
            <div className="prodVideoWC5">
              <div className="vidProductWC5">
                <video id="productVideoWC5" width="350" controls muted>
                  <source src={vidHome} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="vidProduct2WC5">
                <div className="vidProduct2WC5title">
                  <h1>Sản phẩm mới</h1>
                </div>
                <div className="productWC5">
                  <div className="productWC5Img">
                    <img src={AoJacket} alt="" />
                    <div className="iconOverlay2">
                      <i
                        onClick={handleDetails}
                        class="fa-solid fa-magnifying-glass"
                      ></i>
                      <i className="fas fa-heart"></i>
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                  <div className="productWC5Content">
                    <p className="productWC5name">
                      Áo Khoác Kẻ Sọc Form Boxy BLACK WORK 71003
                    </p>
                    <p className="productWC5price">820.000đ</p>

                    <div className="productWC5size">
                      <div className="productWC5size1">
                        <p>Size</p>
                      </div>
                      <div className="productWC5size2">
                        <button
                          onClick={() => handleSizeClick("M")}
                          className={selectedSize === "M" ? "selected" : ""}
                        >
                          M
                          {selectedSize === "M" && (
                            <div className="corner-check"></div>
                          )}
                        </button>
                        <button
                          onClick={() => handleSizeClick("L")}
                          className={selectedSize === "L" ? "selected" : ""}
                        >
                          L
                          {selectedSize === "L" && (
                            <div className="corner-check"></div>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="productWC5color">
                      <div className="productWC5color1">
                        <p>Màu Sắc</p>
                      </div>
                      <div className="productWC5color2">
                        <button
                          onClick={() => handleColorClick("Trắng")}
                          className={
                            selectedColor === "Trắng" ? "selected" : ""
                          }
                        >
                          Trắng
                          {selectedColor === "Trắng" && (
                            <div className="corner-check"></div>
                          )}
                        </button>
                        <button
                          onClick={() => handleColorClick("Đen")}
                          className={selectedColor === "Đen" ? "selected" : ""}
                        >
                          Đen
                          {selectedColor === "Đen" && (
                            <div className="corner-check"></div>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="productWC5quantity">
                      <div className="productWC5quantity1">
                        <p>Số lượng</p>
                      </div>
                      <div className="productWC5quantity2">
                        <button onClick={Down}>-</button>
                        <p className="numQuantity">{count}</p>
                        <button onClick={Up}>+</button>
                      </div>
                    </div>

                    <div className="productWC5Buy">
                      <div className="productWC5BtnBuy">
                        <button className="btnAdd">Thêm Vào Giỏ Hàng</button>
                        <button onClick={handleBuyNow} className="btnBuy">
                          Mua Ngay
                        </button>
                      </div>
                    </div>

                    <div className="productWC5"></div>
                  </div>
                </div>
                <div className="productWC5description">
                  <div className="productWC5desTitle">
                    <p>Mô tả sản phẩm</p>
                  </div>

                  <div className="productWC5desContent">
                    <p>
                      * Màu sắc: Trắng, đen (do màn hình và điều kiện ánh sáng
                      khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch
                      khoảng 5 - 10%) [ Nếu bạn cần tư vấn kỹ hơn về sản phẩm,
                      cách mix-match hãy chat trực tiếp với team TRYST nhé ! ]
                    </p>

                    <p>
                      * Hướng dẫn cách giặt sản phẩm: Hãy giặt sản phẩm bằng
                      nước lạnh, lộn trái khi trước khi giặt [Khuyến khích sử
                      dụng túi giặt] Không sử dụng các loại bột/nước giặt có hàm
                      lượng chất tẩy cao. Khuyến khích sử dụng các loại nước xả
                      giữ màu và làm mềm vải. Hạn chế là/ủi trực tiếp lên hình
                      in/ thêu của sản phẩm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Welcome4">
          <div className="productPhotoSample">
            <div className="prodPhotoSample">
              <div className=" prodPSImg">
                <div className="prodPSImg1">
                  <img src={ImgPhotoSimple1} alt="" />
                </div>
                <div className="prodPSImg2">
                  <img src={ImgPhotoSimple2} alt="" />
                </div>
              </div>
              <div className="prodPSContent">
                <div className="prodPSContentTitle1">
                  <h2>AWARD-WINNING</h2>
                </div>

                <div className="prodPSContentTitle2">
                  <h2>T-shirt Revolution</h2>
                </div>
                <div className="prodPSContentPara">
                  <p>
                    "Áo T-shirt Jersey MERSHIER 6229 — một món đồ thời trang cơ
                    bản với sức hút vượt thời gian. Phiên bản mới nhất của chúng
                    tôi về chiếc áo T-shirt này kết hợp sự thoải mái bền bỉ với
                    thiết kế hiện đại, tạo nên một lựa chọn hoàn hảo cho mọi
                    dịp. Cho dù bạn kết hợp nó với trang phục dạo phố năng động
                    hay mặc dưới áo khoác sang trọng, chiếc áo này vẫn mang lại
                    phong cách thoải mái nhưng tinh tế. Với sự chăm chút đến
                    từng chi tiết và form dáng hoàn hảo, đây không chỉ là một
                    chiếc áo T-shirt mà còn là tuyên ngôn về sự tự tin và phong
                    cách cá nhân."
                  </p>
                </div>
                <div className="prodPSContentButton">
                  <div className="ButtonprodPS">
                    <button onClick={handleDetails}>
                      Xem sản phẩm
                      <div>
                        <i class="fa-solid fa-chevron-right"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="Welcome3"
          style={{
            backgroundImage: `url(${BG1HomePage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            width: "100%",

            zIndex: 1,
          }}
        >
          <div className="featuredProducts">
            <div className="featProducts">
              <div className="featProductsTitle">
                <h1>Sản phẩm nổi bật</h1>
              </div>

              <div className="featProductsList">
                <div className="featProductsContent">
                  <div className="featProductsImg">
                    <img src={FeatProducts1} alt="" />
                    <div className="iconOverlay">
                      <i class="fa-solid fa-magnifying-glass"></i>
                      <i className="fas fa-heart"></i>
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                  <div className="featProductsBody">
                    <p className="featProductsName">
                      Áo Phông EVOLVEMENT 26159
                    </p>
                    <p className="featProductsPrice">390.000đ</p>
                  </div>
                </div>

                <div className="featProductsContent">
                  <div className="featProductsImg">
                    <img src={FeatProducts2} alt="" />
                    <div className="iconOverlay">
                      <i class="fa-solid fa-magnifying-glass"></i>
                      <i className="fas fa-heart"></i>
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                  <div className="featProductsBody">
                    <p className="featProductsName">Áo SpickHead đen</p>
                    <p className="featProductsPrice">460.000đ</p>
                  </div>
                </div>

                <div className="featProductsContent">
                  <div className="featProductsImg">
                    <img src={FeatProducts3} alt="" />
                    <div className="iconOverlay">
                      <i class="fa-solid fa-magnifying-glass"></i>
                      <i className="fas fa-heart"></i>
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                  <div className="featProductsBody">
                    <p className="featProductsName">Áo SpickHead xám</p>
                    <p className="featProductsPrice">450.000đ</p>
                  </div>
                </div>

                <div className="featProductsContent">
                  <div className="featProductsImg">
                    <img src={FeatProducts4} alt="" />
                    <div className="iconOverlay">
                      <i class="fa-solid fa-magnifying-glass"></i>
                      <i className="fas fa-heart"></i>
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                  <div className="featProductsBody">
                    <p className="featProductsName">
                      Áo Phông EVOLVEMENT 26173
                    </p>
                    <p className="featProductsPrice">350.000đ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Welcome6">
          <div className="Welcome6Left">
            <div className="WC6LContent">
              <div className="WC6Ltitlte1">FASHION ESCAPE</div>
              <div className="WC6Ltitlte2">
                Treat Yourself to a Weekend of Style
              </div>
              <div className="WC6Ldescription">
                "Chào mừng đến với cửa hàng thời trang của chúng tôi, nơi bạn sẽ
                tìm thấy những phong cách được tuyển chọn cho mọi dịp và sở
                thích cá nhân! Mỗi sản phẩm được lựa chọn kỹ lưỡng để kết hợp sự
                thoải mái, thanh lịch và cá tính, đảm bảo bạn cảm thấy tự tin và
                phong cách trong cuộc sống hàng ngày. Hãy chọn tủ quần áo truyền
                cảm hứng cho việc thể hiện bản thân và tôn vinh thời trang hiện
                đại."
              </div>
            </div>
          </div>
          <div className="Welcome6Right">
            <img src={ImgPhotoSimple3} alt="Spa treatment" />
          </div>
        </div>

        <div
          className="Welcome7"
          style={{
            backgroundImage: `url(${BG7HomePage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div className="Welcome7Contact">
            <div className="WC7Contact">
              <div className="WC7ContactTitle1">
                <p>CONTACT</p>
              </div>

              <div className="WC7ContactTitle2">
                <p>TRYST FASHION STUDIO</p>
              </div>
              <div className="WC7ContactContent">
                <div className="WC7ContactContentLeft">
                  <h4>Send a Message</h4>
                  <div className="WC7Left">
                    <div className="IconWC7Left">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="ContentWC7Left">
                      <p>
                        21 Hồ Đắc Di, P. Nam Đồng, Đống Đa, Hà Nội, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="WC7Left">
                    <div className="IconWC7Left">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                    <div className="ContentWC7Left">
                      <p>096 925 31 66</p>
                    </div>
                  </div>

                  <div className="WC7Left">
                    <div className="IconWC7Left">
                      <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div className="ContentWC7Left">
                      <p>tryst.21hdd@gmail.com</p>
                    </div>
                  </div>

                  <div className="WC7LeftContent">
                    <p>
                      If you have any questions or concerns, please don't
                      hesitate to contact us. We're here to help! We want your
                      experience to be a memorable one.
                    </p>
                  </div>
                </div>
                <div className="WC7ContactContentRight">
                  <form className="FormContact" onSubmit={handleSubmit}>
                    <div className="FormContactInfo">
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="FormContactInfo">
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail Address"
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="FormContactMessage">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="ButtonSubmit">
                      <button type="submit">SUBMIT MESSAGE</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
