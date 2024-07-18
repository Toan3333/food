import React from "react";
import Heading from "../../components/heading/Heading";
import Title from "../../components/title/Title";
import SpecialList from "../../components/special/SpecialList";

const Hot = () => {
  return (
    <div className="mt-20 mb-20">
      <div className="container">
        <Heading>Hot Dishes</Heading>
        <div className="flex justify-between">
          <Title>
            Standout Dishes <br /> From Our Menu
          </Title>
          <div className="flex items-center gap-12">
            <span className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8">
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="w-20 h-20 rounded-full bg-primary flex items-center justify-center cursor-pointer text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8">
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        <SpecialList type="hot"></SpecialList>
      </div>
    </div>
  );
};
export default Hot;
