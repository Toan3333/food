// import React, { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { AuthContext } from "../../context/AuthProvider";
// import axios from "axios";

// const Modal = () => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/";
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // const handleLogin = () => {
//   //   signUpWithGmail()
//   //     .then(() => {
//   //       alert("Login successful!");
//   //       if (user && user.role === "admin") {
//   //         navigate("/dashboard", { replace: true });
//   //       } else {
//   //         navigate(from, { replace: true });
//   //       }
//   //     })
//   //     .catch(console.error);
//   // };

//   const onSubmit = async (data) => {
//     console.log(data);
//     try {
//       const response = await axios.post("http://localhost:3000/users/login", data);
//       localStorage.setItem("id", response.data._id);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("email", response.data.email);
//       localStorage.setItem("photoURL", response.data.photoURL);
//       localStorage.setItem("name", response.data.name);
//       const role = response.data.role;

//       if (role === "admin") {
//         navigate("/dashboard", { replace: true });
//       } else {
//         window.location.reload();
//         alert("Login successful!");
//         navigate(from, { replace: true });
//       }

//       document.getElementById("my_modal_5").close();
//     } catch (error) {
//       setErrorMessage("Login failed: " + error.response.data.message || error.message);
//       console.error("Đăng nhập không thành công", error);
//     }
//   };

//   return (
//     <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//       <div className="modal-box">
//         <div className="modal-action mt-0 flex flex-col justify-center">
//           <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
//             <h3 className="font-bold text-lg">Please Login!</h3>
//             {errorMessage && <span className="text-red-500 mb-2">{errorMessage}</span>}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="input input-bordered"
//                 {...register("email", { required: true })}
//               />
//               {errors.email && <span className="text-red-500">This field is required</span>}
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 id="pass"
//                 name="pass"
//                 placeholder="Password"
//                 className="input input-bordered"
//                 {...register("pass", { required: true })}
//               />
//               {errors.pass && <span className="text-red-500">This field is required</span>}
//               <label className="label mt-1">
//                 <a href="#" className="label-text-alt link link-hover">
//                   Forgot password?
//                 </a>
//               </label>
//             </div>
//             <div className="form-control mt-6">
//               <input type="submit" value="Login" className="btn btn-primary" />
//             </div>
//             <p className="text-center my-2">
//               Don't have an account?{" "}
//               <Link to="/signup" className="underline text-red-500 ml-1">
//                 Signup Now
//               </Link>
//             </p>
//             <button
//               onClick={() => document.getElementById("my_modal_5").close()}
//               className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//               ✕
//             </button>
//           </form>
//           <div className="text-center space-x-4 mb-5">
//             <button
//               // onClick={handleLogin}
//               className="bg-gray-300 shadow-md w-12 h-12 text-black rounded-full">
//               <i className="fa fa-google" aria-hidden="true"></i>
//             </button>
//             <button className="bg-gray-300 shadow-md w-12 h-12 text-black rounded-full">
//               <i className="fa fa-facebook" aria-hidden="true"></i>
//             </button>
//             <button className="bg-gray-300 shadow-md w-12 h-12 text-black rounded-full">
//               <i className="fa fa-github" aria-hidden="true"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//     </dialog>
//   );
// };

// export default Modal;

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
        window.location.reload();
        alert("Login successful!");
        navigate(from, { replace: true });
      }

      document.getElementById("my_modal_5").close();
    } catch (error) {
      setErrorMessage("Login failed: " + error.response.data.message || error.message);
      console.error("Đăng nhập không thành công", error);
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-lg">Please Login!</h3>
            {errorMessage && <span className="text-red-500 mb-2">{errorMessage}</span>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("pass", { required: true })}
              />
              {errors.pass && <span className="text-red-500">This field is required</span>}
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
            <p className="text-center my-2">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-red-500 ml-1">
                Signup Now
              </Link>
            </p>
            <button
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="text-center space-x-4 mb-5">
            <button className="bg-gray-300 shadow-md w-12 h-12 text-black rounded-full">
              <i className="fa fa-google" aria-hidden="true"></i>
            </button>
            <button className="bg-gray-300 shadow-md w-12 h-12 text-black rounded-full">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </button>
            <button className="bg-gray-300 shadow-md w-12 h-12 text-black rounded-full">
              <i className="fa fa-github" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
