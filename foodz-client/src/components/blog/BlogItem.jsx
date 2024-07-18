import React from "react";
import "./Blog.css";
const BlogItem = ({ item }) => {
  const { name, image, description } = item;
  return (
    <div>
      <div className="">
        <div className="w-full">
          <img className="w-full" src={image} alt="" />
        </div>
        <div className="border px-8 py-8">
          <h3 className="text-xl mb-4 cursor-pointer hover:text-primary  transition-all delay-75">
            {name}
          </h3>
          <p className="text-[16px] line-clamp-2 text-grayText leading-normal mb-3">
            {description}
          </p>
          <button className="py-3 px-5 rounded-lg text-white bg-primary">READ MORE</button>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
