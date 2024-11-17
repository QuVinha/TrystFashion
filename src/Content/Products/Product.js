import React, { useEffect, useState, useContext } from "react";
import "./Product.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FeatProducts1 from "../../../src/assets/img/featProducts/featPrd1.jpg";
import FeatProducts2 from "../../../src/assets/img/featProducts/featPrd2.jpg";
import FeatProducts3 from "../../../src/assets/img/featProducts/featPrd3.jpg";
import FeatProducts4 from "../../../src/assets/img/featProducts/featPrd4.jpg";
import { CartContext } from "../CartContext/CartContext";
import BGR5 from "../../../src/assets/img/BGHomepage/5.jpg";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Trạng thái loading để xử lý khi dữ liệu đang tải
  const [error, setError] = useState(null);

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
  const handleProductChange = (product) => {
    setSelectedProduct(product);
    console.log("Sản phẩm đã chọn: ", product);
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    console.log("Giá đã chọn: ", price);
  };

  useEffect(() => {
    fetch("http://192.168.1.24:8080/api/v1/products?page=0&limit=12")
      .then((res) => res.json()) // Phân tích dữ liệu trả về
      .then((data) => {
        console.log("Received data:", data); // Kiểm tra dữ liệu trả về
        if (Array.isArray(data)) {
          setProducts(data); // Nếu dữ liệu là mảng, gán cho state products
        } else if (data.products) {
          // Nếu dữ liệu là đối tượng chứa mảng products
          setProducts(data.products); // Gán mảng products từ response vào state
        } else {
          setError("Không có dữ liệu sản phẩm");
        }
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
        setError("Lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false); // Set loading false khi fetch xong
      });
  }, []);

  // Hiển thị trạng thái loading hoặc error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
              <div className="Dropdown">
                <button className="DropdownButton">
                  SẢN PHẨM <span>▼</span>
                </button>
                <div className="DropdownContent">
                  <ul>
                    <li onClick={() => handleProductChange("Jacket")}>
                      Jacket
                    </li>
                    <li onClick={() => handleProductChange("T-Shirt")}>
                      T-Shirt
                    </li>
                    <li onClick={() => handleProductChange("Jeans")}>Jeans</li>

                    <li onClick={() => handleProductChange("Baby-Tee")}>
                      Baby-Tee
                    </li>
                    <li onClick={() => handleProductChange("Tank-Top")}>
                      Tank-Top
                    </li>
                    <li onClick={() => handleProductChange("Sweater")}>
                      Sweater
                    </li>
                  </ul>
                </div>
              </div>

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
            </div>
          </div>
        </div>

        <div className="Product">
          <div className="ProductsList">
            {products.map((product) => (
              <div key={product.id} className="ProductsContent">
                <div className="ProductsImg">
                  <div className="iconOverlay">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <i className="fas fa-heart"></i>
                    <i
                      onClick={() => addToCart(product)}
                      className="fas fa-shopping-cart"
                    ></i>
                  </div>
                </div>
                <div className="ProductsBody">
                  <p className="ProductsName">{product.name}</p>
                  <p className="ProductsPrice">
                    {product.price.toLocaleString()} đ
                  </p>
                  {/* <p className="ProductsCategory">
                    Danh mục: {product.category.name}{" "}
                    
                  </p>
                  <p className="ProductsColor">Màu sắc: {product.color}</p>
                  <p className="ProductsDescription">
                    {product.description.length > 100
                      ? `${product.description.slice(0, 100)}...`
                      : product.description}{" "}
                   
                  </p>
                  <p className="ProductsQuantity">
                    Số lượng: {product.quantity}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
