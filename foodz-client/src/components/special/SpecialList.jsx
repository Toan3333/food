import React, { useEffect, useState } from "react";
import SpecialItem from "./SpecialItem";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

const SpecialList = ({ type = "special" }) => {
  const [specialFood, setSpecialFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSpecialProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${type}`);
        const data = response.data.Products;

        if (Array.isArray(data) && data.length > 0) {
          setSpecialFood(data);
        } else {
          setSpecialFood([]);
        }
      } catch (err) {
        console.error("Error fetching special products:", err);
        setError("Failed to load special products.");
      } finally {
        setLoading(false);
      }
    };
    getSpecialProduct();
  }, [type]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (specialFood.length === 0) {
    return <div className="no-products">No special products available.</div>;
  }

  return (
    <div className="container">
      <div className="special-list mt-10">
        <Swiper
          modules={[Grid]}
          spaceBetween={30}
          slidesPerView={3}
          grid={{
            rows: 2,
            fill: "row", // Ensure the grid fills rows first
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="mySwiper">
          {specialFood.map((item) => (
            <SwiperSlide key={item._id}>
              <SpecialItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SpecialList;
