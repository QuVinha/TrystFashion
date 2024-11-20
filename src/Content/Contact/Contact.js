import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MapComponent from "./Map";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
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

  const validateForm = () => {
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin."); // Thông báo lỗi
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email không hợp lệ."); // Kiểm tra định dạng email
      return false;
    }

    return true; // Không có lỗi
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Dừng nếu form không hợp lệ
    }

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
        className="HeaderContact"
      ></div>
      <div className="Contact">
        <div className="PageContact">
          <div className="ContactDiv">
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
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="ContentWC7Left">
                    <p>21 Hồ Đắc Di, P. Nam Đồng, Đống Đa, Hà Nội, Việt Nam</p>
                  </div>
                </div>

                <div className="WC7Left">
                  <div className="IconWC7Left">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="ContentWC7Left">
                    <p>096 925 31 66</p>
                  </div>
                </div>

                <div className="WC7Left">
                  <div className="IconWC7Left">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="ContentWC7Left">
                    <p>tryst.21hdd@gmail.com</p>
                  </div>
                </div>

                <div className="WC7LeftContent">
                  <p>
                    If you have any questions or concerns, please don't hesitate
                    to contact us. We're here to help! We want your experience
                    to be a memorable one.
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

      <div className="Map">
        <MapComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
