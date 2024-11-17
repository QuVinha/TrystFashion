import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MapComponent from "./Map";
import "./Contact.css";

const Contact = () => {
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
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="ContentWC7Left">
                    <p>21 Hồ Đắc Di, P. Nam Đồng, Đống Đa, Hà Nội, Việt Nam</p>
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
                    If you have any questions or concerns, please don't hesitate
                    to contact us. We're here to help! We want your experience
                    to be a memorable one.
                  </p>
                </div>
              </div>
              <div className="WC7ContactContentRight">
                <div className="FormContact">
                  <div className="FormContactInfo">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <div className="FormContactInfo">
                    <input type="email" placeholder="E-mail Address" />
                    <input type="text" placeholder="Phone" />
                  </div>
                  <div className="FormContactMessage">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <div className="ButtonSubmit">
                    <button>SUBMIT MESSAGE</button>
                  </div>
                </div>
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
