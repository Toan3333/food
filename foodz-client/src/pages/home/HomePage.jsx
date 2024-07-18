import React from "react";
import Hero from "./Hero";
import Popular from "./Popular";
import Special from "./Special";
import Testimonial from "./Testimonial";
import Hot from "./Hot";
import Service from "./Service";
import Drink from "./Drink";
import Blog from "./Blog";

const HomePage = () => {
  return (
    <div>
      <Hero></Hero>
      <Popular></Popular>
      <Special></Special>
      <Hot></Hot>
      <Drink></Drink>
      <Testimonial></Testimonial>
      <Blog></Blog>
      <Service></Service>
    </div>
  );
};

export default HomePage;
