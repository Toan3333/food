import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
const BlogList = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get("https://food-1-izah.onrender.com/blogs");
      const data = response.data.Blogs;
      setBlogData(data);
    };
    fetchBlog();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-8 mt-10">
        {blogData.map((item) => (
          <BlogItem item={item} key={item._id}></BlogItem>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
