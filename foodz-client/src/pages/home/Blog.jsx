import React from "react";
import BlogList from "../../components/blog/BlogList";

const Blog = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="flex items-center flex-col justify-center">
          <h2 className="text-5xl text-secondary font-bold">OUR BLOG</h2>
          <p className="text-center text-2xl leading-normal mt-4">
            Best cooks and best delivery guys all at your service. Hot tasty <br /> food will reach
            you in 60 minutes.
          </p>
        </div>
        <BlogList></BlogList>
      </div>
    </div>
  );
};

export default Blog;
