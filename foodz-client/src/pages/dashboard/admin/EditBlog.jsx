import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBox, FaGift, FaPlusCircle, FaProductHunt, FaRegEdit, FaUser } from "react-icons/fa";
const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const getBlogById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`);
        const { name, description, image } = response.data;
        setValue("name", name);
        setValue("description", description);
        setValue("image", image);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogById();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3000/blogs/${id}`, data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your item updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manage-blogs");
    } catch (error) {
      console.log(error);
    }
  };
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
          <h1 className="text-3xl font-bold mb-6">
            Update A New <span className="text-primary">Blog</span>
          </h1>
          {/* Content goes here */}
          <form className="max-w-[820px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <label htmlFor="productName">Title</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Title"
                // onChange={(e) => setValues({ ...values, name: e.target.value })}
                {...register("name", { required: true })}
                className={`w-full border border-neutral-300 p-3 rounded-md mt-3 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && <span className="text-red-500">Title is required</span>}
            </div>
            <div className="mb-8">
              <label htmlFor="productName">description</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Description"
                // onChange={(e) => setValues({ ...values, name: e.target.value })}
                {...register("description", { required: true })}
                className={`w-full border border-neutral-300 p-3 rounded-md mt-3 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && <span className="text-red-500">Title is required</span>}
            </div>
            <div className="mb-8 w-full flex flex-col">
              <label htmlFor="productImage">Blog Image Url</label>
              <input
                type="text"
                name="image"
                {...register("image", { required: true })}
                className={`w-full border border-neutral-300 p-3 rounded-md mt-3 ${
                  errors.image ? "border-red-500" : ""
                }`}
              />
              {errors.image && <span className="text-red-500">Image URL is required</span>}
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="flex items-center justify-center gap-3 text-white bg-primary px-5 py-4 rounded-lg">
                Update Blog <i className="fa fa-cutlery" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
