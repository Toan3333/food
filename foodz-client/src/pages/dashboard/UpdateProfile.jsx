import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    // Đặt giá trị cho các trường input nếu dữ liệu tồn tại
    if (storedUser.name) {
      setValue("name", storedUser.name);
    }
    if (storedUser.photoURL) {
      setValue("photoURL", storedUser.photoURL);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      // Thực hiện gửi dữ liệu cập nhật lên server
      const response = await axios.put(`http://localhost:3000/users/${userId}`, data);
      console.log("Update response:", response.data);
      navigate("/");
      window.location.reload();
      // Đặt lại giá trị vào localStorage sau khi cập nhật thành công
      const updatedUser = { ...JSON.parse(localStorage.getItem("user")), ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Optionally handle success feedback or redirection
    } catch (error) {
      console.log("Update error:", error);
      // Handle error feedback to the user
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your name"
              className="input input-bordered"
            />
            {errors.name && <span className="text-xs text-error">Name is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              {...register("photoURL")}
              placeholder="Photo URL"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
