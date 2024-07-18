import React from "react";
import Heading from "../../components/heading/Heading";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";

const Service = () => {
  const serviceItem = [
    {
      id: 1,
      image: "/images/service-1.svg",
      name: "Catering",
      description: "Delight your guests with our flavors and presentation",
    },
    {
      id: 2,
      image: "/images/service-2.svg",
      name: "Fast delivery",
      description: "We deliver your order promptly to your door",
    },
    {
      id: 3,
      image: "/images/service-3.svg",
      name: "Online Ordering",
      description: "Explore menu & order with ease using our Online Ordering ",
    },
    {
      id: 4,
      image: "/images/service-4.svg",
      name: "Gift Cards",
      description: "Give the gift of exceptional dining with Foodi Gift Cards",
    },
  ];
  return (
    <div className="mt-20 mb-20">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="max-w-[652px] w-full">
            <Heading>Our Story & Services</Heading>
            <Title>Our Culinary Journey And Services</Title>
            <p className="text-2xl text-grayText ">
              Rooted in passion, we curate unforgettable dining experiences and offer exceptional
              services, blending culinary artistry with warm hospitality.
            </p>
            <div className="mt-5">
              <Button className="py-[10px] px-10 text-xl">Explore</Button>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-2 gap-9">
              {serviceItem.map((item, index) => (
                <div
                  className="bg-white rounded-[40px] shadow-lg py-6 px-10 flex items-center flex-col justify-center"
                  key={index}>
                  <img src={item.image} alt="" />
                  <h3 className="mt-5 text-green text-2xl font-bold mb-4">{item.name}</h3>
                  <p className="text-center text-greenLight text-xl font-semibold leading-normal limited-lines">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
