import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
        }).then(() => {
          const updatedCart = [...cartItems];
          updatedCart.splice(index, 1); // Remove the item at index
          setCartItems(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          window.location.reload(); // Reload the page after deleting
        });
      }
    });
  };

  return (
    <div className="m-20">
      <div className="flex items-center justify-center mt-16 mb-16">
        <h2 className="text-5xl font-bold">
          Items Added to the <span className="text-primary">Cart</span>
        </h2>
      </div>
      <div className="container">
        <table className="table-cart w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item._id} className="mb-7">
                <td>{index + 1}</td>
                <td className="w-28 h-28 rounded-full object-cover">
                  <img src={item.image} alt={item.name} className="w-full h-full" />
                </td>
                <td>{item.name}</td>
                <td className="w-[200px] quantity">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <div
                    className="flex items-center justify-center text-red-500"
                    onClick={() => handleDelete(index)}>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6">
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-8">
            <a href="/menu">
              <span className="text-white text-[18px] bg-primary py-4 px-5 rounded-md">
                Continue Shopping
              </span>
            </a>
            <span className="text-white text-[18px] bg-primary py-4 px-6 rounded-md">
              Total Price: $
              {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
          <div className="">
            <Link to="/checkout">
              <span className="text-white text-[18px] bg-primary py-4 px-6 rounded-md">
                Checkout
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
