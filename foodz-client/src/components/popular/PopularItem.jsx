import React from "react";

const PopularItem = () => {
  return (
    <div className="bg-white shadow-lg rounded-[40px] p-12 flex items-center justify-center flex-col">
      <div className="rounded-full w-[153px] h-[153px] bg-roundPopular flex items-center justify-center mb-3">
        <img src="./images/popular-1.png" alt="popular-img" />
      </div>
      <h3 className="text-3xl font-semibold mb-3">Main Dish</h3>
      <p className="text-[22px] font-medium leading-normal">(86 dishes)</p>
    </div>
  );
};

export default PopularItem;
