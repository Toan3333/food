// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// // Import các phương thức xác thực từ Firebase Auth và cấu hình Firebase
// // import {
// //   GoogleAuthProvider,
// //   getAuth,
// //   onAuthStateChanged,
// //   signInWithPopup,
// //   signOut,
// //   updateProfile,
// // } from "firebase/auth";
// // import app from "../firebase/firebase.config";

// // Tạo AuthContext
// export const AuthContext = createContext();

// // Khởi tạo Firebase Auth và GoogleAuthProvider
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Trạng thái người dùng
//   const [loading, setLoading] = useState(true); // Trạng thái tải

//   // Hàm đăng nhập bằng email và password sử dụng API của bạn
//   const login = async (email, password) => {
//     try {
//       setLoading(true); // Bắt đầu quá trình đăng nhập

//       // Gửi yêu cầu POST đến server để đăng nhập
//       const response = await axios.post("http://localhost:3000/users/login", {
//         email: email,
//         password: password,
//       });

//       // Lưu trữ token vào localStorage
//       localStorage.setItem("access-token", response.data.token);

//       // Cập nhật trạng thái người dùng sau khi đăng nhập thành công
//       const currentUser = response.data.user;
//       setUser(currentUser);

//       setLoading(false); // Kết thúc quá trình đăng nhập
//     } catch (error) {
//       setLoading(false); // Dừng quá trình đăng nhập
//       console.error("Đăng nhập không thành công", error);
//       throw error; // Ném lỗi để component có thể xử lý hiển thị thông báo lỗi
//     }
//   };

//   // Đăng xuất người dùng
//   const logOut = () => {
//     localStorage.removeItem("access-token"); // Xóa token từ localStorage
//     return signOut(auth); // Đăng xuất từ Firebase Auth (nếu sử dụng)
//   };

//   // Cập nhật thông tin người dùng
//   const updateUserProfile = (name, photoURL) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photoURL,
//     });
//   };

//   // Kiểm tra trạng thái xác thực khi ứng dụng tải lên
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // Cập nhật trạng thái người dùng từ Firebase Auth (nếu sử dụng)
//       setLoading(false); // Kết thúc quá trình tải
//     });

//     return () => {
//       unsubscribe(); // Hủy đăng ký lắng nghe khi component bị hủy
//     };
//   }, []);

//   // Thông tin xác thực được cung cấp cho toàn bộ ứng dụng
//   const authInfo = {
//     user,
//     loading,
//     login,
//     logOut,
//     updateUserProfile,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {/* Hiển thị spinner hoặc loading screen khi đang tải */}
//       {loading ? <div>Loading...</div> : children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
