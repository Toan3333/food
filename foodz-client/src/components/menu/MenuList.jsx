import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ items }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-8">
        {items.map((item) => (
          <MenuItem item={item} key={item._id}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
