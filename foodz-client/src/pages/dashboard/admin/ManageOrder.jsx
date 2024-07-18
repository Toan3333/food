import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBox, FaGift, FaPlusCircle, FaProductHunt, FaRegEdit, FaUser } from "react-icons/fa";

const ManageOrder = () => {
  const [order, setOrder] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrder(response.data.Orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrder();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/orders/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
            icon: "success",
          }).then(() => {
            setOrder((prevOrders) => prevOrders.filter((order) => order._id !== id));
          });
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen">
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
        <h1 className="text-3xl font-bold mb-6">All Orders</h1>
        <table className="table-product w-full border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Name</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Order Total</th>
              <th>Address</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.orderId}</td>
                <td>{item.orderName}</td>
                <td>{item.orderDate}</td>
                <td>{item.orderDateTime}</td>
                <td>
                  <p className="line-clamp-1">${item.totalPrice}</p>
                </td>
                <td>{item.address}</td>
                <td>
                  <Link to={`/dashboard/order-view/${item._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </td>
                <td>
                  <div
                    className="flex items-center justify-center text-secondary cursor-pointer"
                    onClick={() => handleDelete(item._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6">
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
