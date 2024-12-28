import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Product.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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
  const [likedProducts, setLikedProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State để lưu category đã chọn
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Hàm lọc theo danh mục
  const handleProductChange = (category) => {
    setSelectedCategory(category); // Cập nhật category đã chọn
    // Lọc sản phẩm theo category.name
    const filtered = products.filter(
      (product) => product.category.name === category.name
    );
    setFilteredProducts(filtered); // Lưu các sản phẩm lọc được vào state
  };

  // Hàm xử lý thay đổi giá
  const handlePriceChange = (priceOrder) => {
    setSelectedPrice(priceOrder); // Lưu giá trị chọn lọc theo giá (thấp đến cao / cao đến thấp)
  };

  // Tính toán danh sách sản phẩm hiển thị
  const productsToDisplay = () => {
    let displayedProducts = selectedCategory ? filteredProducts : products;

    // Lọc theo từ khóa tìm kiếm (nếu có)
    if (searchTerm) {
      displayedProducts = displayedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp theo giá nếu có lựa chọn sắp xếp giá
    if (selectedPrice === "low-to-high") {
      displayedProducts = [...displayedProducts].sort(
        (a, b) => a.price - b.price
      );
    } else if (selectedPrice === "high-to-low") {
      displayedProducts = [...displayedProducts].sort(
        (a, b) => b.price - a.price
      );
    }

    return displayedProducts;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Tìm kiếm:", searchTerm); // In ra từ khóa tìm kiếm khi nhấn Enter
      handleSubmit({ preventDefault: () => {} }); // Gọi hàm handleSubmit để xử lý tìm kiếm
    }
  };

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

  const handleNavigate = (id) => {
    navigate("/details", { state: { id } });
    window.scrollTo(0, 0);
  };

  const navigateAddProduct = () => {
    navigate("/addProduct");
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Cập nhật từ khóa tìm kiếm

    // Lọc sản phẩm theo tên chứa từ khóa tìm kiếm
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered); // Cập nhật state filteredProducts
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm đã lọc
  };

  const handleIconClick = () => {
    // Gọi hàm handleSubmit để xử lý tìm kiếm khi click vào biểu tượng
    handleSubmit({ preventDefault: () => {} });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  useEffect(() => {
    fetch("http://192.168.10.164:8080/api/v1/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Categories:", data);
        setCategories(data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Có lỗi khi tải dữ liệu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://192.168.10.164:8080/api/v1/products")
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

  // Sau các useEffect, xử lý điều kiện để hiển thị
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
                  onKeyDown={handleKeyDown}
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
                      {categories.map((category) => (
                        <li
                          key={category.id}
                          onClick={() => handleProductChange(category)}
                        >
                          {category.name}
                        </li>
                      ))}
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
              </div>
            </div>
          </div>
        </div>

        <div className="Product">
          <div className="ProductsList">
            {productsToDisplay().map((product) => (
              <div key={product.id} className="ProductsContent">
                <div
                  onClick={() => handleNavigate(product.id)}
                  className="ProductsImg"
                >
                  <img
                    src={`data:image/jpeg;base64,${product.url}`}
                    alt={product.name}
                  />
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
      </div>
      <Footer />
    </div>
  );
};

export default Product;
