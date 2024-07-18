import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [giftCardCode, setGiftCardCode] = useState(""); // State for gift card code
  const [discountedPrice, setDiscountedPrice] = useState(0); // State for discounted price

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
    setDiscountedPrice(total); // Initialize discounted price
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateOrderId = () => {
    return "FOOD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  const handleApplyGiftCard = async () => {
    try {
      const response = await axios.post("http://localhost:3000/vouchers/apply", {
        code: giftCardCode,
        totalPrice,
      });
      setDiscountedPrice(response.data.discountedPrice);
      Swal.fire({
        icon: "success",
        title: "Gift Card Applied!",
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid Gift Card",
        text: error.response.data.message,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const newOrderId = generateOrderId();
      const orderDate = getCurrentDate();
      const orderDateTime = getCurrentDateTime();
      const orderData = {
        orderDateTime: orderDateTime,
        orderId: newOrderId,
        orderDate: orderDate,
        orderName: data.orderName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        email: data.email,
        products: cartItems.map((item) => ({
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: discountedPrice,
      };

      const response = await axios.post("http://localhost:3000/orders", orderData);
      console.log("Order created:", response.data.NewOrder);

      setOrderId(newOrderId);

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Order Placed Successfully!",
        html: `<p>Your order has been placed successfully.</p>
               <p><strong>Order ID:</strong> ${newOrderId}</p>
               <p><strong>Order Date:</strong> ${orderDate}</p>
               <p>Thank you for your purchase!</p>`,
        showConfirmButton: true,
        confirmButtonText: "OK",
        timer: 6000,
      });

      localStorage.removeItem("cart");
      setCartItems([]);
      setTotalPrice(0);
      setDiscountedPrice(0);
    } catch (error) {
      console.error("Error creating order:", error);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Order Failed",
        text: "There was an error placing your order. Please try again.",
        showConfirmButton: true,
        confirmButtonText: "OK",
        timer: 4000,
      });
    }

    window.location.reload();
  };

  return (
    <div>
      <div className="container">
        <div className="flex justify-between gap-12">
          <div className="w-full max-w-[580px]">
            <h1 className="text-5xl font-normal mb-3">Order Confirmation and Payment</h1>
            <p className="text-x font-normal leading-normal text-secondary2">
              The final step before <br /> enjoying your meal.
            </p>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Order Name</span>
                </label>
                <input
                  type="text"
                  {...register("orderName", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
                {errors.orderName && (
                  <span className="text-red-500">Please enter the order name</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">Please enter phone number</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.address && <span className="text-red-500">Please enter address</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
                {errors.email && <span className="text-red-500">Please enter email</span>}
              </div>
              <div className="form-control mt-6">
                <input type="submit" value="Pay Now" className="btn btn-primary" />
              </div>
            </form>
          </div>
          <div className="w-full">
            <div className="border rounded-2xl p-6 bg-white">
              <h2 className="text-2xl font-normal leading-normal mb-4">Summary</h2>
              <div className="flex flex-col gap-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div className="border rounded-lg p-6 relative" key={item._id}>
                    <div className="flex items-center gap-10">
                      <img className="w-[120px] h-[120px] object-cover" src={item.image} alt="" />
                      <div className="flex flex-col gap-3">
                        <h3>{item.name}</h3>
                        <p className="text-secondary">$ {item.price}</p>
                        <div className="">Quantity: {item.quantity}</div>
                      </div>
                    </div>
                    <button className="btn btn-circle absolute right-0 top-0 m-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <h3 className="text-xl my-3">Gift Card</h3>
              <div className="flex justify-between items-center gap-4">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Enter gift card code"
                    value={giftCardCode}
                    onChange={(e) => setGiftCardCode(e.target.value)}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="">
                  <button onClick={handleApplyGiftCard} className="btn btn-success">
                    Apply
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl my-3">Total: </div>
                <div className="text-xl my-3">${discountedPrice.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
