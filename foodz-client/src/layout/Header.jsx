import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import Modal from "../components/modal/Modal";
import Profile from "../components/profile/Profile";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [cartQuantity, setCartQuantity] = useState(0);

  const updateUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const updateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
  };

  useEffect(() => {
    updateCartQuantity();

    const handleStorageChange = () => {
      updateUser();
      updateCartQuantity();
      window.location.reload();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const menuList = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Menu", link: "/menu" },
    { id: 3, name: "About Us", link: "/about-us" },
    { id: 4, name: "Contact Us", link: "/contact-us" },
  ];

  return (
    <header className="p-10">
      <div className="container">
        <div className="flex justify-between">
          <div className="">
            <img src="./images/logo.png" alt="Logo-img" />
          </div>
          <ul className="flex items-center gap-16">
            {menuList.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "hover:text-primary text-[18px]"
                  }>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-11">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <Link to="/cart">
              <span className="relative">
                <FaCartArrowDown className="h-8 w-8" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                    {cartQuantity}
                  </span>
                )}
              </span>
            </Link>
            {user ? (
              <Profile userEmail={user.email} />
            ) : (
              <Link onClick={() => document.getElementById("my_modal_5").showModal()}>
                <span className="py-4 px-8 rounded-[40px] flex items-center gap-2 bg-primary text-white">
                  <FaUser className="w-6 h-6" />
                  Login
                </span>
              </Link>
            )}
            <Modal />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
