import React from "react";
import Heading from "../../components/heading/Heading";
import Title from "../../components/title/Title";

const Testimonial = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between gap-40">
        <div className="max-w-[506px] w-full">
          <img src="./images/testimonial.png" alt="" />
        </div>
        <div className="w-full">
          <Heading>Special Dishes</Heading>
          <Title>What Our Customers Say About Us</Title>
          <p className="text-2xl font-normal leading-[42px]">
            “I had the pleasure of dining at Foodi last night, and I'm still raving about the
            experience! The attention to detail in presentation and service was impeccable”
          </p>
          <div className="flex items-center gap-7 mt-5">
            <div className="flex items-center gap-2">
              <span className="w-20 h-20px bg-white rounded-full shadow-lg flex items-center p-2 justify-center">
                <img
                  src="./images/avatar.png"
                  className="w-16 h-16 rounded-full object-cover"
                  alt=""
                />
              </span>
              <span className="w-20 h-20px bg-white rounded-full shadow-lg flex items-center p-2 justify-center">
                <img
                  src="./images/avatar.png"
                  className="w-16 h-16 rounded-full object-cover"
                  alt=""
                />
              </span>
              <span className="w-20 h-20px bg-white rounded-full shadow-lg flex items-center p-2 justify-center">
                <img
                  src="./images/avatar.png"
                  className="w-16 h-16 rounded-full object-cover"
                  alt=""
                />
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-2xl font-medium">Customer Feedback</div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-3 text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none">
                    <g clipPath="url(#clip0_4_7187)">
                      <path
                        d="M1.32683 12.4002L4.88683 15.0002L3.53483 19.1872C3.31634 19.8366 3.31357 20.5392 3.52694 21.1903C3.7403 21.8414 4.15837 22.4061 4.71883 22.8002C5.26968 23.207 5.93722 23.4249 6.62198 23.4215C7.30674 23.418 7.97207 23.1935 8.51883 22.7812L11.9998 20.2192L15.4818 22.7782C16.0317 23.1827 16.6956 23.4023 17.3782 23.4057C18.0608 23.409 18.7268 23.1958 19.2806 22.7967C19.8344 22.3976 20.2473 21.8332 20.4601 21.1847C20.6729 20.5361 20.6746 19.8368 20.4648 19.1872L19.1128 15.0002L22.6728 12.4002C23.222 11.9987 23.6302 11.4339 23.8392 10.7866C24.0482 10.1392 24.0472 9.44238 23.8365 8.79559C23.6258 8.14879 23.2161 7.58512 22.6658 7.1851C22.1156 6.78508 21.4531 6.56917 20.7728 6.5682H16.3998L15.0728 2.4322C14.8642 1.78116 14.4541 1.21321 13.9018 0.810264C13.3495 0.407315 12.6835 0.190186 11.9998 0.190186C11.3162 0.190186 10.6502 0.407315 10.0979 0.810264C9.54556 1.21321 9.13551 1.78116 8.92683 2.4322L7.59983 6.5682H3.23083C2.55057 6.56917 1.88802 6.78508 1.33781 7.1851C0.787595 7.58512 0.377867 8.14879 0.167148 8.79559C-0.0435713 9.44238 -0.0445039 10.1392 0.164483 10.7866C0.373471 11.4339 0.781688 11.9987 1.33083 12.4002H1.32683Z"
                        fill="#FFE605"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4_7187">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  4.9
                </span>
                <div className="text-grayText">(18.6k Reviews)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
