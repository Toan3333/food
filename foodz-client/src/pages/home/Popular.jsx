import React from "react";
import Heading from "../../components/heading/Heading";
import Title from "../../components/title/Title";
import PopularList from "../../components/popular/PopularList";

const Popular = () => {
  return (
    <div className="mt-28">
      <div className="flex flex-col justify-center items-center">
        <Heading>Customer Favorites</Heading>
        <Title>Popular Catagories</Title>
      </div>
      <PopularList></PopularList>
    </div>
  );
};

export default Popular;
