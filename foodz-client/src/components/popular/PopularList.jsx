import React from "react";
import PopularItem from "./PopularItem";

const PopularList = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-8 mt-10">
        <PopularItem></PopularItem>
        <PopularItem></PopularItem>
        <PopularItem></PopularItem>
        <PopularItem></PopularItem>
      </div>
    </div>
  );
};

export default PopularList;
