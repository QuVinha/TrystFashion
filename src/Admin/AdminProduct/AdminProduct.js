import React, { useEffect, useState, useContext } from "react";
import "./AdminProduct.css";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const Delete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleHome = () => {
    navigate("/");
  };

  const handleAddProduct = () => {
    navigate("/addProduct");
  };

  const handleEditProduct = () => {
    navigate("/editProduct");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleAccountUser = () => {
    navigate("/accountUser");
  };

  const handleAdminOrder = () => {
    navigate("/adminOrder");
  };

  const handleAdminProduct = () => {
    navigate("/adminProduct");
  };

  const handleAdminCategory = () => {
    navigate("/adminCategory");
  };
  return (
    <div id="main">
      <div
        style={{
          width: "100%",
          height: "15vh",
          zIndex: 1,
        }}
        className="HeaderAdmin"
      >
        <div className="LogoShopAdmin">
          <h1 onClick={handleAdmin}>TRYST </h1>
        </div>

        <div className="LogOutAdmin">
          <div onClick={handleHome} className="IconLogoutAdmin">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>

      <div className="AdminPage">
        <div className="AdminPageLeft">
          <div className="AdminLeftTitle">
            <h5>TRANG QUẢN TRỊ</h5>
          </div>

          <div className="AdminMenuHeader">
            <p>Menu Admin</p>
          </div>

          <div className="AdminMenu">
            <div onClick={handleAccountUser} className="NavAdminMenu1">
              <i class="fa-solid fa-user"></i>
              <a>Quản lý tài khoản</a>
            </div>

            <div onClick={handleAdminProduct} className="NavAdminMenu2">
              <i class="fa-solid fa-shirt"></i>
              <a>Quản lý sản phẩm</a>
            </div>

            <div onClick={handleAdminCategory} className="NavAdminMenu3">
              <i class="fa-solid fa-list"></i>
              <a>Quản lý danh mục sản phẩm</a>
            </div>

            <div onClick={handleAdminOrder} className="NavAdminMenu4">
              <i class="fa-solid fa-truck"></i>
              <a>Quản lý đơn hàng</a>
            </div>
          </div>
        </div>
        <div className="AdminPageRight">
          <div className="AdminRightProduct">
            <div>
              <h5>QUẢN LÝ SẢN PHẨM</h5>
            </div>

            <div className="ButtonAddPrd">
              <button onClick={handleAddProduct}>
                {" "}
                Thêm sản phẩm <i class="fa-solid fa-plus"></i>{" "}
              </button>
            </div>
          </div>

          <div className="TitleAdminProduct">
            <div className="AdminProduct">
              <p>ID</p>
            </div>

            <div className="AdminProduct">
              <p>Tên sản phẩm</p>
            </div>

            <div className="AdminProduct">
              <p>Đơn giá</p>
            </div>

            <div className="AdminProduct">
              <p>Số lượng</p>
            </div>

            {/* <div className="AdminProduct">
              <p>Mô tả</p>
            </div> */}

            <div className="AdminProduct">
              <p>Danh mục</p>
            </div>

            {/* <div className="AdminProduct">
              <p>Hình ảnh</p>
            </div> */}

            <div className="AdminProduct">
              <p>Sửa</p>
            </div>

            <div className="AdminProduct">
              <p>Xoá</p>
            </div>
          </div>

          <div className="ProductMap">
            {products.map((product) => (
              <div key={product?.id} className="ProductList">
                <div className="ProductItem">
                  <div className="IDProduct">
                    <p>{product?.id}</p>
                  </div>
                  <div className="NameProduct">
                    <p>{product?.name}</p>
                  </div>
                  <div className="PriceProduct">
                    <p>{product?.price}đ</p>
                  </div>
                  <div className="QuantityProduct">
                    <p>{product?.quantity}</p>
                  </div>
                  {/* <div className="DesProduct">
                    <p>{product?.description}</p>
                  </div> */}
                  <div className="CategoryProduct">
                    <p>{product?.category.name}</p>
                  </div>
                  {/* <div className="ImageProduct">
                    {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <p>Không có hình ảnh</p>
          )}
                  </div> */}
                  <div className="EditProduct">
                    <i
                      onClick={() => handleEditProduct(product?.id)}
                      className="fa-regular fa-pen-to-square"
                    ></i>
                  </div>
                  <div className="DeleteProduct">
                    <i
                      onClick={() => Delete(product.id)}
                      className="fa-solid fa-trash"
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isDeleteOpen && (
            <div className="delete-overlay">
              <div className="delete">
                <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
                <div className="ButtonDeleteProduct">
                  <button onClick={closeDelete}>Không</button>
                  <button>Chắc chắn</button>
                </div>
              </div>
            </div>
          )}

          {/* <div className="ProductList">
            <div className="IDProduct">
              <p>16</p>
            </div>
            <div className="NameProduct">
              <p>Áo EVOLVEMENT 26159</p>
            </div>
            <div className="PriceProduct">
              <p>199.000đ</p>
            </div>
            <div className="QuantityProduct">
              <p>30</p>
            </div>
            <div className="DesProduct">
              <p>Đây là mô tả</p>
            </div>
            <div className="CategoryProduct">
              <p>T-SHIRT</p>
            </div>
            <div className="ImageProduct">
              <p>Hình ảnh</p>
            </div>
            <div className="EditProduct">
              <i class="fa-regular fa-pen-to-square"></i>
            </div>
            <div className="DeleteProduct">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
