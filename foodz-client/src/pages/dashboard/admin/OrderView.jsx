import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBox, FaGift, FaPlusCircle, FaProductHunt, FaRegEdit, FaUser } from "react-icons/fa";
const OrderView = () => {
  const { id } = useParams();
  const [orderView, setOrderView] = useState([]);

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`);
        setOrderView(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    getOrderById();
  }, [id]);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} className="relative p-2" width="350px">
          <Menu>
            <MenuItem component={<Link to="/dashboard" />}>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                Dashboard
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/add-menu" />}>
              <div className="flex items-center gap-2">
                <FaPlusCircle></FaPlusCircle>
                Add Menu
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/add-blog" />}>
              <div className="flex items-center gap-2">
                <FaPlusCircle></FaPlusCircle>
                Add Blog
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/manage-items" />}>
              <div className="flex items-center gap-2">
                <FaProductHunt></FaProductHunt>
                Manage Items
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/users" />}>
              <div className="flex items-center gap-2">
                <FaUser></FaUser>
                Users
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/manage-blogs" />}>
              <div className="flex items-center gap-2">
                <FaRegEdit />
                Manage Blog
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/manage-vouchers" />}>
              <div className="flex items-center gap-2">
                <FaGift />
                Manage Voucher
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/manage-orders" />}>
              <div className="flex items-center gap-2">
                <FaBox />
                Manage Order
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => {
                /* Logic để xử lý việc logout */ console.log("Logout clicked");
              }}>
              Logout
            </MenuItem>
          </Menu>
          <button onClick={() => setCollapsed(!collapsed)} className="absolute right-0 top-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </button>
        </Sidebar>
        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Order Details</h1>
          {/* Check if orderView is empty or loading */}
          {orderView.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <table className="table-product w-full border-collapse">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orderView.products.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="w-40">
                      <div className="flex items-center justify-center">
                        <img
                          src={item.image}
                          className="w-24 h-24 rounded-full object-cover"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderView;
