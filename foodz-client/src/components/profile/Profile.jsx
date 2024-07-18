import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const defaultAvatar =
    "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8";

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="drawer-end z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Example of avatar button */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle btn-ghost avatar">
          <div className="w-20 rounded-full">
            {user.photoURL ? (
              <img alt="User avatar" src={user.photoURL} />
            ) : (
              <img alt="Default avatar" src={defaultAvatar} />
            )}
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <Link to="/update-profile">Profile</Link>
          </li>
          <li>
            <a href="/orders">Orders</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          {user.role === "admin" && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
