import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaBox,
  FaEdit,
  FaGift,
  FaPlusCircle,
  FaProductHunt,
  FaRegEdit,
  FaUser,
} from "react-icons/fa";
import { BsTrash3, BsTrash3Fill } from "react-icons/bs";
import axios from "axios";
const ManageVoucher = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [voucherItem, setVoucherItem] = useState([]);
  useEffect(() => {
    const fetchDataVoucher = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vouchers");
        const data = response.data.Vouchers;
        setVoucherItem(data);
      } catch (error) {
        console.log("Lỗi không thấy danh sách voucher");
      }
    };
    fetchDataVoucher();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/vouchers/${id}`);
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
            window.location.reload(); // Reload the page after deleting
          });
        }
      });
    } catch (error) {
      console.log("Lỗi không xóa được voucher");
    }
  };
  return (
    <div>
      <div className="flex min-h-screen">
        {/* Hello world */}
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
          <h1 className="text-3xl font-bold mb-6">All Vouchers</h1>
          {/* Content goes here */}
          <table className="table-product w-full border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Discountpercentage</th>
                <th>Maxuses</th>
                <th>Currentuses</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {voucherItem.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.discountPercentage}</td>
                  <td>{item.maxUses}</td>
                  <td>{item.currentUses}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/dashboard/edit-menu/${item._id}`}>
                      <div className="inline-flex p-2 items-center justify-center bg-edit rounded-lg text-white bg-orange-400 cursor-pointer">
                        <FaEdit className="w-5 h-5" />
                      </div>
                    </Link>
                  </td>
                  <td>
                    <div
                      className="flex items-center justify-center text-secondary cursor-pointer"
                      onClick={(e) => handleDelete(item._id)}>
                      <BsTrash3Fill className="w-7 h-7"></BsTrash3Fill>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageVoucher;
