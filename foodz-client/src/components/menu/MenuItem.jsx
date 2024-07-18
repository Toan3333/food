import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MenuItem = ({ item }) => {
  const { name, image, price } = item;
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(0);
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
    <div className="rounded-[40px] shadow-lg bg-white py-9 px-11 relative">
      <div className="absolute bg-primary  w-20 h-[75px] heart top-0 right-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <g clipPath="url(#clip0_4_7195)">
            <path
              d="M17.5 1.9165C16.3739 1.93402 15.2724 2.24836 14.3067 2.82778C13.341 3.40719 12.5453 4.23117 12 5.2165C11.4546 4.23117 10.6589 3.40719 9.6932 2.82778C8.7275 2.24836 7.62601 1.93402 6.49996 1.9165C4.7049 1.99449 3.01366 2.77976 1.79574 4.10074C0.577818 5.42171 -0.0677922 7.17103 -4.17093e-05 8.9665C-4.17093e-05 13.5135 4.78596 18.4795 8.79996 21.8465C9.69618 22.5996 10.8293 23.0125 12 23.0125C13.1706 23.0125 14.3037 22.5996 15.2 21.8465C19.214 18.4795 24 13.5135 24 8.9665C24.0677 7.17103 23.4221 5.42171 22.2042 4.10074C20.9863 2.77976 19.295 1.99449 17.5 1.9165Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_4_7195">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none">
            <g clipPath="url(#clip0_4_7187)">
              <path
                d="M1.32683 12.4002L4.88683 15.0002L3.53483 19.1872C3.31634 19.8366 3.31357 20.5392 3.52694 21.1903C3.7403 21.8414 4.15837 22.4061 4.71883 22.8002C5.26968 23.207 5.93722 23.4249 6.62198 23.4215C7.30674 23.418 7.97207 23.1935 8.51883 22.7812L11.9998 20.2192L15.4818 22.7782C16.0317 23.1827 16.6956 23.4023 17.3782 23.4057C18.0608 23.409 18.7268 23.1958 19.2806 22.7967C19.8344 22.3976 20.2473 21.8332 20.4601 21.1847C20.6729 20.5361 20.6746 19.8368 20.4648 19.1872L19.1128 15.0002L22.6728 12.4002C23.222 11.9987 23.6302 11.4339 23.8392 10.7866C24.0482 10.1392 24.0472 9.44238 23.8365 8.79559C23.6258 8.14879 23.2161 7.58512 22.6658 7.1851C22.1156 6.78508 21.4531 6.56917 20.7728 6.5682H16.3998L15.0728 2.4322C14.8642 1.78116 14.4541 1.21321 13.9018 0.810264C13.3495 0.407315 12.6835 0.190186 11.9998 0.190186C11.3162 0.190186 10.6502 0.407315 10.0979 0.810264C9.54556 1.21321 9.13551 1.78116 8.92683 2.4322L7.59983 6.5682H3.23083C2.55057 6.56917 1.88802 6.78508 1.33781 7.1851C0.787595 7.58512 0.377867 8.14879 0.167148 8.79559C-0.0435713 9.44238 -0.0445039 10.1392 0.164483 10.7866C0.373471 11.4339 0.781688 11.9987 1.33083 12.4002H1.32683Z"
                fill="#FFE605"
              />
            </g>
            <defs>
              <clipPath id="clip0_4_7187">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
  );
};

export default MenuItem;
