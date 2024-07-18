// cach 1
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const EditMenu = () => {
//   const [data, setData] = useState({
//     name: "",
//     category: {
//       categoryId: "",
//     },
//     price: "",
//     description: "",
//     image: "",
//   });
//   const { id } = useParams();
//   useEffect(() => {
//     const getProductById = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/products/${id}`);
//         setData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getProductById();
//   }, [id]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.put(`http://localhost:3000/products/${id}`, data);
//       alert("Item updated successfully");

//       navigate("/dashboard/manage-items");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const navigate = useNavigate();
//   return (
//     <div>
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <div className="max-w-[380px] w-full bg-gray text-black min-h-screen p-4">
//           <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
//           <ul className="space-y-2">
//             <li>
//               <a href="#" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="size-6">
//                   <path
//                     fillRule="evenodd"
//                     d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="size-6">
//                   <path
//                     fillRule="evenodd"
//                     d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Add Menu
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="size-6">
//                   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
//                   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
//                 </svg>
//                 Manage Items
//               </a>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/users"
//                 className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="size-6">
//                   <path
//                     fillRule="evenodd"
//                     d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
//                     clipRule="evenodd"
//                   />
//                   <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
//                 </svg>
//                 Users
//               </Link>
//             </li>
//             <li>
//               <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
//                 Logout
//               </a>
//             </li>
//           </ul>
//         </div>
//         {/* Main Content */}
//         <div className="flex-1 bg-gray-100 p-6">
//           <h1 className="text-3xl font-bold mb-6">
//             Update A New <span className="text-primary">Menu Item</span>
//           </h1>
//           {/* Content goes here */}
//           <form className="max-w-[820px]" onSubmit={handleSubmit}>
//             <div className="mb-8">
//               <label htmlFor="productName">Product Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 className="w-full border border-neutral-300 p-3 rounded-md mt-3"
//                 value={data.name}
//                 onChange={(e) => setData({ ...data, name: e.target.value })}
//                 placeholder="Product Name"
//               />
//             </div>
//             <div className="flex gap-4 mb-8">
//               <div className="w-full">
//                 <label htmlFor="productCategory">Category</label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={data.category.categoryId}
//                   onChange={(e) => setData({ ...data, category: e.target.value })}
//                   className="w-full border border-neutral-300 p-3 rounded-md mt-3">
//                   <option value="65f50bb9d3ae70c03ccc4530">Special</option>
//                   <option value="65f9011c28564c0f6b279700">Hot</option>
//                 </select>
//               </div>
//               <div className="w-full">
//                 <label htmlFor="productPrice">Price</label>
//                 <input
//                   value={data.price}
//                   onChange={(e) => setData({ ...data, price: e.target.value })}
//                   name="price"
//                   id="productPrice"
//                   type="text"
//                   className="w-full border border-neutral-300 p-3 rounded-md mt-3"
//                   placeholder="Price"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col mb-8">
//               <label htmlFor="productDescription">Recipe Detail</label>
//               <textarea
//                 value={data.description}
//                 onChange={(e) => setData({ ...data, description: e.target.value })}
//                 name="description"
//                 id="description"
//                 className="w-full border border-neutral-300 p-3 rounded-md mt-3"
//                 placeholder="Description"
//               />
//             </div>
//             <div className="mb-8 w-full flex flex-col">
//               <label htmlFor="productImage">Product Image Url</label>
//               <input
//                 value={data.image}
//                 onChange={(e) => setData({ ...data, image: e.target.value })}
//                 type="text"
//                 name="image"
//                 className="w-full border border-neutral-300 p-3 rounded-md mt-3"
//               />
//             </div>
//             <div className="mt-5">
//               <button
//                 type="submit"
//                 className="flex items-center justify-center gap-3 text-white bg-primary px-5 py-4 rounded-lg">
//                 Update Item <i className="fa fa-cutlery" aria-hidden="true" />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditMenu;

// cach 2 react-hook-form
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBox, FaGift, FaPlusCircle, FaProductHunt, FaRegEdit, FaUser } from "react-icons/fa";

const EditMenu = () => {
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
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        const { name, category, price, description, image } = response.data;
        setValue("name", name);
        setValue("category", category.categoryId);
        setValue("price", price);
        setValue("description", description);
        setValue("image", image);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3000/products/${id}`, data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your item updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manage-items");
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
            Update A New <span className="text-primary">Menu Item</span>
          </h1>
          {/* Content goes here */}
          <form className="max-w-[820px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <label htmlFor="productName">Product Name</label>
              <input
                id="name"
                {...register("name", { required: true })}
                type="text"
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-neutral-300"
                } p-3 rounded-md mt-3`}
                placeholder="Product Name"
              />
              {errors.name && <span className="text-red-500">Product name is required</span>}
            </div>
            <div className="flex gap-4 mb-8">
              <div className="w-full">
                <label htmlFor="productCategory">Category</label>
                <select
                  id="category"
                  {...register("category", { required: true })}
                  className={`w-full border ${
                    errors.category ? "border-red-500" : "border-neutral-300"
                  } p-3 rounded-md mt-3`}>
                  <option value="65f50bb9d3ae70c03ccc4530">Special</option>
                  <option value="65f9011c28564c0f6b279700">Hot</option>
                  <option value="667e39cbd25ff75436dbb308">Drink</option>
                </select>
                {errors.category && <span className="text-red-500">Category is required</span>}
              </div>
              <div className="w-full">
                <label htmlFor="productPrice">Price</label>
                <input
                  {...register("price", { required: true })}
                  type="text"
                  className={`w-full border ${
                    errors.price ? "border-red-500" : "border-neutral-300"
                  } p-3 rounded-md mt-3`}
                  placeholder="Price"
                />
                {errors.price && <span className="text-red-500">Price is required</span>}
              </div>
            </div>
            <div className="flex flex-col mb-8">
              <label htmlFor="productDescription">Recipe Detail</label>
              <textarea
                {...register("description", { required: true })}
                className={`w-full border ${
                  errors.description ? "border-red-500" : "border-neutral-300"
                } p-3 rounded-md mt-3`}
                placeholder="Description"
              />
              {errors.description && <span className="text-red-500">Description is required</span>}
            </div>
            <div className="mb-8 w-full flex flex-col">
              <label htmlFor="productImage">Product Image Url</label>
              <input
                {...register("image")}
                type="text"
                className={`w-full border ${
                  errors.image ? "border-red-500" : "border-neutral-300"
                } p-3 rounded-md mt-3`}
              />
              {errors.image && <span className="text-red-500">Image URL is required</span>}
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="flex items-center justify-center gap-3 text-white bg-primary px-5 py-4 rounded-lg">
                Update Item <i className="fa fa-cutlery" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
