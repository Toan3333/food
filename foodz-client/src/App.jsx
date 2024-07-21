import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Main from "./layout/Main";
import Menu from "./pages/Menu";
import ProductDetail from "./pages/ProductDetail";
import DashBoard from "./pages/dashboard/admin/DashBoard";
import Users from "./pages/dashboard/admin/Users";
import ManageItems from "./pages/dashboard/admin/ManageItems";
import Cart from "./pages/Cart";
import AddMenu from "./pages/dashboard/admin/AddMenu";
import EditMenu from "./pages/dashboard/admin/EditMenu";
import SignUp from "./components/signup/SignUp";
import Checkout from "./pages/Checkout";
import ManageBlogs from "./pages/dashboard/admin/ManageBlogs";
import AddBlog from "./pages/dashboard/admin/AddBlog";
import EditBlog from "./pages/dashboard/admin/EditBlog";
import ManageOrder from "./pages/dashboard/admin/ManageOrder";
import OrderView from "./pages/dashboard/admin/OrderView";
import Login from "./components/login/Login";
import UpdateProfile from "./pages/dashboard/UpdateProfile";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ManageVoucher from "./pages/dashboard/admin/ManageVoucher";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/food/" element={<HomePage></HomePage>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>

          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route
            path="/product-detail/:productId"
            element={<ProductDetail></ProductDetail>}></Route>
        </Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        {/* admin */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard></DashBoard>
            </PrivateRoute>
          }></Route>
        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute>
              <Users></Users>
            </PrivateRoute>
          }></Route>
        <Route path="/dashboard/manage-blogs" element={<ManageBlogs></ManageBlogs>}></Route>
        <Route path="/dashboard/manage-items" element={<ManageItems></ManageItems>}></Route>
        <Route path="/dashboard/manage-vouchers" element={<ManageVoucher></ManageVoucher>}></Route>
        <Route path="/dashboard/manage-orders" element={<ManageOrder></ManageOrder>}></Route>
        <Route path="/dashboard/add-menu" element={<AddMenu></AddMenu>}></Route>
        <Route path="/dashboard/add-blog" element={<AddBlog></AddBlog>}></Route>
        <Route path="/dashboard/edit-menu/:id" element={<EditMenu></EditMenu>}></Route>
        <Route path="/dashboard/order-view/:id" element={<OrderView></OrderView>}></Route>
        <Route path="/dashboard/edit-blog/:id" element={<EditBlog></EditBlog>}></Route>
      </Routes>
    </Fragment>
  );
};

export default App;
