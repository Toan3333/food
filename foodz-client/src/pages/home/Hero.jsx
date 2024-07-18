import React from "react";
import Button from "../../components/button/Button";

const Hero = () => {
  return (
    <div className="mt-14">
      <div className="container">
        <div className="flex justify-between items-center gap-20">
          <div className="max-w-[596px] w-full">
            <h1 className="text-[62px] font-extrabold leading-[90px] mb-14">
              Dive into Delights Of Delectable <span className="text-primary">Food</span>
            </h1>
            <p className="text-text text-[26px] leading-10 font-medium">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
            </p>
            <div className="flex items-center gap-9 mt-16">
              <Button>Order Now</Button>
              <div className="flex items-center gap-7">
                <span className="text-textPrimary text-secondary2">Watch Video</span>
                <span className="play flex items-center justify-center w-20 h-20 rounded-full bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7">
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <img src="/images/hero.png" className="w-full object-cover'" alt="Hero-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
