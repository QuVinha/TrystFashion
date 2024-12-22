import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Product.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FeatProducts1 from "../../../src/assets/img/featProducts/featPrd1.jpg";
import FeatProducts2 from "../../../src/assets/img/featProducts/featPrd2.jpg";
import FeatProducts3 from "../../../src/assets/img/featProducts/featPrd3.jpg";
import FeatProducts4 from "../../../src/assets/img/featProducts/featPrd4.jpg";
import { CartContext } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleBuyNow = (productId) => {
    navigate("/pay", { state: { productId } });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const roleName = localStorage.getItem("roleName");
    const token = localStorage.getItem("token");
    if (roleName === "ADMIN" && token) {
      setIsAdmin(true);
    }
  }, []);

  const handleLikeClick = (productId) => {
    // Kiểm tra xem sản phẩm đã được yêu thích chưa
    if (likedProducts.includes(productId)) {
      // Nếu đã yêu thích, bỏ yêu thích
      setLikedProducts(likedProducts.filter((id) => id !== productId));
    } else {
      // Nếu chưa yêu thích, thêm vào danh sách yêu thích
      setLikedProducts([...likedProducts, productId]);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [productData, setProductData] = useState({
    name: "",
    category_id: "",
    price: "",
    quantity: "",
    color: "",
    color2: "",
    code: "",
    description: "",
  });

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gửi dữ liệu sản phẩm mới lên API
  const handleAddProduct = async () => {
    if (!isAdmin) {
      alert("Bạn không có quyền thêm sản phẩm.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await fetch(
        "http://192.168.10.226:8080/api/v1/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
          body: JSON.stringify({
            name: productData.name,
            price: parseFloat(productData.price), // Đảm bảo giá trị giá là số
            quantity: parseInt(productData.quantity, 10), // Đảm bảo số lượng là số nguyên
            category_id: parseInt(productData.category_id, 10), // Đảm bảo category_id là số nguyên
            color: productData.color,
            code: productData.code,
            color2: productData.color2,
            description: productData.description,
            url: "", // Nếu bạn có trường này, có thể thêm URL ở đây.
          }),
        }
      );

      if (response.ok) {
        alert("Thêm sản phẩm thành công!");
        // Reset form nếu cần
        setProductData({
          name: "",
          category_id: "",
          price: "",
          quantity: "",
          color: "",
          color2: "",
          code: "",
          description: "",
        });
        setIsModalOpen(false); // Đóng modal sau khi thêm sản phẩm
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleNavigate = (id) => {
    navigate("/details", { state: { id } });
    window.scrollTo(0, 0);
  };

  const navigateAddProduct = () => {
    navigate("/addProduct");
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tìm kiếm:", searchTerm);
  };

  const handleIconClick = () => {
    console.log("Tìm kiếm:", searchTerm);

    handleSubmit({ preventDefault: () => {} });
  };

  const handleProductChange = (category) => {
    setSelectedCategory(category);
    console.log("Danh mục đã chọn: ", category);
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    console.log("Giá đã chọn: ", price);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  useEffect(() => {
    fetch("http://192.168.10.226:8080/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dữ liệu nhận được:", data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products) {
          setProducts(data.products);
        } else {
          setError("Không có dữ liệu sản phẩm");
        }
      })
      .catch((error) => {
        console.log("Lỗi khi tải sản phẩm:", error);
        setError("Lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        className="HeaderProduct"
      ></div>
      <div className="ProductPage">
        <div className="SearchProduct">
          <div className="Search">
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ position: "relative", width: "360px" }}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{
                    padding: "15px",
                    width: "100%",
                    border: "1px solid #ccc",
                    paddingRight: "40px",
                    fontSize: "16px",
                  }}
                />
                <i
                  onClick={handleIconClick}
                  className="fa-solid fa-magnifying-glass"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                    cursor: "pointer",
                  }}
                ></i>
              </div>
            </form>

            <div className="FilterContainer">
              <div className="DropdownAdmin">
                <div className="Dropdown">
                  <button className="DropdownButton">
                    SẢN PHẨM <span>▼</span>
                  </button>
                  <div className="DropdownContent">
                    <ul>
                      <li
                        onClick={() =>
                          handleProductChange({ id: 1, name: "Jacket" })
                        }
                      >
                        Jacket
                      </li>
                      <li
                        onClick={() =>
                          handleProductChange({ id: 2, name: "T-Shirt" })
                        }
                      >
                        T-Shirt
                      </li>
                      <li
                        onClick={() =>
                          handleProductChange({ id: 3, name: "Jeans" })
                        }
                      >
                        Jeans
                      </li>
                      <li
                        onClick={() =>
                          handleProductChange({ id: 4, name: "Baby-Tee" })
                        }
                      >
                        Baby-Tee
                      </li>
                      <li
                        onClick={() =>
                          handleProductChange({ id: 5, name: "Tank-Top" })
                        }
                      >
                        Tank-Top
                      </li>
                      <li
                        onClick={() =>
                          handleProductChange({ id: 6, name: "Sweater" })
                        }
                      >
                        Sweater
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="DropdownAdmin">
                <div className="Dropdown">
                  <button className="DropdownButton">
                    GIÁ <span>▼</span>
                  </button>
                  <div className="DropdownContent">
                    <ul>
                      <li onClick={() => handlePriceChange("low-to-high")}>
                        Thấp đến cao
                      </li>
                      <li onClick={() => handlePriceChange("high-to-low")}>
                        Cao đến thấp
                      </li>
                    </ul>
                  </div>
                </div>

                {/* {isAdmin && (
                  <div className="IconEditDropdown">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                )} */}

                <div onClick={handleAdmin} className="IconEditDropdown">
                  <i className="fa-regular fa-pen-to-square"></i>
                </div>
              </div>
            </div>
          </div>

          {isAdmin && (
            <div onClick={openModal} className="IconAddProduct">
              <p>Thêm sản phẩm</p>
              <i className="fa-solid fa-plus"></i>
            </div>
          )}

          {/* <div onClick={openModal} className="IconAddProduct">
            <p>Thêm sản phẩm</p>
            <i className="fa-solid fa-plus"></i>
          </div> */}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modals">
              <div className="modal-header">
                <h5>THÊM SẢN PHẨM</h5>
                <i onClick={closeModal} className="fa-solid fa-xmark"></i>
              </div>

              <div className="modal-body">
                <div className="modal-body-flex">
                  <input
                    type="text"
                    placeholder="Tên Sản Phẩm"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Danh Mục"
                    name="category_id"
                    value={productData.category_id}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-body-flex">
                  <input
                    type="number"
                    placeholder="Đơn Giá"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    placeholder="Số lượng"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-body-flex">
                  <input
                    type="text"
                    placeholder="Màu 1"
                    name="color"
                    value={productData.color}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Màu 2"
                    name="color2"
                    value={productData.color2}
                    onChange={handleInputChange}
                  />
                </div>

                <p>Thêm hình ảnh sản phẩm</p>

                <div className="modal-body-flex">
                  <input
                    type="text"
                    placeholder="Mã sản phẩm"
                    name="code"
                    value={productData.code}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Mô tả"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleAddProduct} className="pay-btn">
                  THÊM MỚI
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="Product">
          <div className="ProductsList">
            {products.map((product) => (
              <div key={product.id} className="ProductsContent">
                <div className="ProductsImg">
                  <img
                    src={`data:image/jpeg;base64,${product.url}`}
                    alt={product.name}
                  />
                  <div className="iconOverlay">
                    <i
                      onClick={() => handleNavigate(product.id)}
                      className="fa-solid fa-magnifying-glass"
                    ></i>
                    <i
                      onClick={() => {
                        handleLikeClick(product.id);
                        addToCart(product);
                        alert("Thêm giỏ hàng thành công!");
                      }}
                      className={`fas fa-heart ${
                        likedProducts.includes(product.id) ? "liked" : ""
                      }`}
                      style={{
                        color: likedProducts.includes(product.id)
                          ? "red"
                          : "#999",
                        cursor: "pointer",
                      }}
                    ></i>
                    <i
                      onClick={() => handleBuyNow(product.id)}
                      className="fas fa-shopping-cart"
                    ></i>
                  </div>
                </div>
                <div className="ProductsBody">
                  <p className="ProductsName">{product.name}</p>
                  <p className="ProductsPrice">
                    {product.price.toLocaleString()} đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="Product">
          <div className="ProductsList">
            <div className="ProductsContent">
              <div className="ProductsImg">
                <img src={FeatProducts1} />
                <div className="iconOverlay">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <i className="fas fa-heart"></i>
                  <i className="fas fa-shopping-cart"></i>
                </div>
              </div>
              <div className="ProductsBody">
                <p className="ProductsName">Áo Phông EVOLVEMENT 26159</p>
                <p className="ProductsPrice">199.000đ</p>
              </div>
            </div>

            <div className="ProductsContent">
              <div className="ProductsImg">
                <img src={FeatProducts2} />
                <div className="iconOverlay">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <i className="fas fa-heart"></i>
                  <i className="fas fa-shopping-cart"></i>
                </div>
              </div>
              <div className="ProductsBody">
                <p className="ProductsName">Áo thun SpickHead Black</p>
                <p className="ProductsPrice">200.000đ</p>
              </div>
            </div>

            <div className="ProductsContent">
              <div className="ProductsImg">
                <img src={FeatProducts3} />
                <div className="iconOverlay">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <i className="fas fa-heart"></i>
                  <i className="fas fa-shopping-cart"></i>
                </div>
              </div>
              <div className="ProductsBody">
                <p className="ProductsName">Áo thun SpickHead White</p>
                <p className="ProductsPrice">185.000đ</p>
              </div>
            </div>

            <div className="ProductsContent">
              <div className="ProductsImg">
                <img src={FeatProducts4} />
                <div className="iconOverlay">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <i className="fas fa-heart"></i>
                  <i className="fas fa-shopping-cart"></i>
                </div>
              </div>
              <div className="ProductsBody">
                <p className="ProductsName">Áo Phông Enonement YHT0574</p>
                <p className="ProductsPrice">209.000đ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
