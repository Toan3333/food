import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", data);

      const user = {
        id: response.data._id,
        token: response.data.token,
        email: response.data.email,
        photoURL: response.data.photoURL,
        name: response.data.name,
        role: response.data.role,
      };

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        alert("Login successful!");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage("Login failed: " + error.response.data.message || error.message);
      console.error("Đăng nhập không thành công", error);
    }
  };

  return (
    <div className="p-20">
      <div className="max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center">
        <div className="modal-action w-full mt-0 flex flex-col justify-center">
          <form className="px-6 py-6" method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-xs text-error">Email is required</span>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("pass", { required: true })}
              />
              {errors.password && <span className="text-xs text-error">Password is required</span>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Show Errors */}
            {errorMessage && <p className="text-red text-xs italic">{errorMessage}</p>}

            {/* Submit Button */}
            <div className="form-control mt-4">
              <input type="submit" className="btn bg-green text-white" value="Login" />
            </div>

            {/* Close Button */}
            <Link to="/">
              <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</div>
            </Link>

            <p className="text-center my-2">
              Don’t have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
