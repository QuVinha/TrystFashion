import React from "react";
import "./AboutUs.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ImgPhotoSimple4 from "../../../src/assets/img/proDPSample/4.jpg";

const AboutUs = () => {
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
        className="HeaderAboutUs"
      ></div>
      <div className="AboutUs">
        <div className="AboutUsTitle">
          <div className="AboutUsTitle1">About</div>
          <div className="AboutUsTitle2">TRYST FASHION STUDIO</div>
        </div>

        <div className="AboutUsContent1 ">
          <p>
            Chào mừng bạn đến với TRYST FASHION, nơi phong cách và chất lượng
            hòa quyện cùng nhau! Chúng tôi tự hào là một cửa hàng quần áo hiện
            đại, mang đến cho bạn những bộ sưu tập thời trang mới nhất, phù hợp
            với mọi phong cách và sở thích cá nhân.
          </p>
        </div>

        <div className="AboutUsContent2">
          <div className="AboutUsContent2Left">
            <h4>Sứ Mệnh</h4>

            <p>
              Sứ mệnh của chúng tôi là cung cấp quần áo thời trang chất lượng
              cao, không chỉ làm đẹp tủ đồ của bạn mà còn nuôi dưỡng cảm giác
              thân thuộc vì mỗi sản phẩm đều được tuyển chọn kỹ lưỡng để truyền
              cảm hứng tự tin và tôn vinh sự đa dạng, đồng thời đảm bảo rằng quy
              trình sản xuất của chúng tôi tôn trọng cả con người và hành tinh.
            </p>

            <h4>Tầm Nhìn</h4>

            <p>
              Chúng tôi mong muốn trở thành lựa chọn hàng đầu trong lĩnh vực
              thời trang, mang đến những trải nghiệm mua sắm dễ dàng và tiện lợi
              cho mọi người. Với tầm nhìn xa hơn, TRYST sẽ không ngừng đổi mới
              để mang đến những sản phẩm đẳng cấp nhất với giá cả hợp lý.
            </p>

            <h4>Dịch Vụ Và Khách Hàng</h4>

            <p>
              Chúng tôi tin rằng mỗi khách hàng đều đặc biệt và xứng đáng nhận
              được dịch vụ tận tình nhất. Đội ngũ của chúng tôi luôn sẵn sàng hỗ
              trợ bạn trong việc lựa chọn trang phục phù hợp, từ size đến màu
              sắc và kiểu dáng. Sự hài lòng của bạn chính là niềm tự hào lớn
              nhất của chúng tôi.
            </p>

            <h4>Cam Kết Bền Vững</h4>

            <p>
              Bên cạnh việc chú trọng vào thời trang, TRYST cũng luôn quan tâm
              đến môi trường và tính bền vững. Chúng tôi không ngừng tìm kiếm
              các giải pháp để giảm thiểu tác động của ngành công nghiệp thời
              trang đối với thiên nhiên, sử dụng các chất liệu thân thiện với
              môi trường, và thúc đẩy các quy trình sản xuất bền vững.
            </p>

            <h4>Kết Nối Với Chúng Tôi</h4>

            <p>
              Hãy kết nối với TRYST qua các kênh mạng xã hội hoặc ghé thăm
              website của chúng tôi để khám phá những bộ sưu tập mới nhất, ưu
              đãi đặc biệt và nhiều chương trình thú vị khác. Chúng tôi luôn
              mong chờ được phục vụ và làm bạn hài lòng.
            </p>
          </div>

          <div className="AboutUsContent2Right">
            <img src={ImgPhotoSimple4} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
