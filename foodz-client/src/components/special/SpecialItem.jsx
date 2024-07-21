import React, { useContext, useEffect, useState } from "react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaHeart, FaStar } from "react-icons/fa";
const SpecialItem = ({ item }) => {
  const { name, image, price, _id } = item;
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(0); // State để lưu số lượng giỏ hàng

  // Function để thêm sản phẩm vào giỏ hàng
  const addToCart = async () => {
    // Hiển thị hộp thoại thông báo
    await Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your item has been added to the cart",
      showConfirmButton: false,
      timer: 1500,
    });

    // Thực hiện reload trang sau khi hiển thị hộp thoại
    window.location.reload();

    // Lấy danh sách sản phẩm từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((cartItem) => cartItem._id === _id);

    // Tăng số lượng sản phẩm trong giỏ hàng nếu sản phẩm đã tồn tại, ngược lại thêm mới sản phẩm vào giỏ hàng
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    // Cập nhật giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Tính toán tổng số lượng sản phẩm trong giỏ hàng và cập nhật lại state
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
  };

  // Effect để cập nhật số lượng giỏ hàng ban đầu
  useEffect(() => {
    const updateCartQuantity = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      setCartQuantity(totalQuantity);
    };

    // Cập nhật số lượng khi component được mount
    updateCartQuantity();

    // Lắng nghe sự kiện thay đổi của localStorage để cập nhật số lượng giỏ hàng
    const handleStorageChange = () => {
      updateCartQuantity();
      window.location.reload(); // Load lại trang khi có thay đổi
    };

    window.addEventListener("storage", handleStorageChange);

    // Xóa sự kiện listener khi component bị unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className="py-4">
      <div className="rounded-[40px] mr-1 shadow-lg bg-white py-9 px-11 relative">
        <div className="absolute bg-primary w-20 h-[75px] heart top-0 right-0 flex items-center justify-center">
          <FaHeart className="w-7 h-7 text-white"></FaHeart>
        </div>
        <div className="flex items-center flex-col">
          <img
            onClick={() => navigate(`/product-detail/${item._id}`)}
            src={image}
            className="w-64 h-64 object-cover cursor-pointer"
            alt="Special-food"
          />
        </div>
        <h2 className="text-2xl font-semibold leading-normal my-3 hover:text-primary cursor-pointer transition delay-75 ease-linear">
          {name}
        </h2>
        <div className="flex items-center justify-between mb-5">
          <p className="text-[16px] text-grayText font-semibold">Description of the item</p>
          <span className="flex items-center gap-3 text-2xl">
            <FaStar className="text-yellow-300"></FaStar>
            4.9
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl text-secondary leading-normal font-semibold">$ {price}</span>
          <Button onClick={addToCart} className="rounded-lg py-[12px] px-7 text-xl">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialItem;
