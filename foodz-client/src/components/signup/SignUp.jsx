// components/signup/SignUp.js
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Modal from "../modal/Modal";
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
import useAxiosPublic from "../../hook/useAxiosPublic";
import axios from "axios";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/users/register", data);
      window.location.reload();
      alert("Signup successful!");
    } catch (error) {
      setErrorMessage("Login failed: " + error.response.data.message || error.message);
      console.error("Đăng nhập không thành công", error);
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center">
        <div className="modal-action w-full mt-0 flex flex-col justify-center">
          <form className="px-6 py-6" method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Create An Account!</h3>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email is not valid",
                  },
                })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("pass", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className="form-control mt-6">
              <input type="submit" value="Sign Up" className="btn btn-primary" />
            </div>

            <p className="text-center my-2">
              Have an account?
              <button
                onClick={() => document.getElementById("my_modal_5").showModal()}
                className="underline text-red-500 ml-1">
                Login
              </button>
            </p>

            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </Link>
            <div className="text-center space-x-3 p-4">
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaGoogle />
              </button>
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaFacebookF />
              </button>
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaGithub />
              </button>
            </div>
          </form>
        </div>
        <Modal />
      </div>
    </div>
  );
};

export default SignUp;
