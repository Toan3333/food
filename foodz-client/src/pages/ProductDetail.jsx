import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import SpecialItem from "../components/special/SpecialItem";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductDetail();
  }, [productId]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const { image, name, price, description } = productData;

  return (
    <div className="mt-20 mb-20">
      <div className="container">
        <div className="flex items-center justify-between gap-14">
          <div className="max-w-[560px] w-full shadow-2xl flex flex-col items-center justify-center rounded-3xl p-6">
            <img src={image} alt={name} className="h-72 rounded-lg object-contain" />
          </div>
          <div className="w-full">
            <h3 className="text-5xl font-normal mb-5">{name}</h3>
            <div className="text-4xl text-secondary font-normal">${price}</div>
            <div className="flex items-center gap-2 my-5">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      d="M11.0821 3.12771C11.4295 2.32266 12.571 2.32266 12.9184 3.12771L15.0984 8.1796C15.2455 8.52048 15.5694 8.75181 15.9395 8.78042L21.5302 9.21241C22.4272 9.28172 22.7836 10.4078 22.0898 10.9806L17.8854 14.4518C17.5889 14.6967 17.459 15.0899 17.5514 15.4632L18.8453 20.6916C19.0581 21.5514 18.1306 22.2429 17.3673 21.7935L12.5076 18.9326C12.1944 18.7482 11.806 18.7482 11.4929 18.9326L6.63317 21.7935C5.86987 22.2429 4.94234 21.5514 5.15513 20.6916L6.44907 15.4632C6.54146 15.0899 6.41158 14.6967 6.11503 14.4518L1.91064 10.9806C1.21688 10.4078 1.57329 9.28172 2.47027 9.21241L8.06092 8.78042C8.43109 8.75181 8.75494 8.52048 8.90204 8.1796L11.0821 3.12771Z"
                      fill="#FF6868"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-xl text-secondary">4.9</span>
            </div>
            <div className="mt-2">
              <h4>Description</h4>
              <p className="text-xl text-gray-500 mt-2 mb-4">{description}</p>
            </div>
            <div className="mt-5">
              <h4 className="m-2">Note:</h4>
              <textarea
                name="orderNote"
                id="orderNote"
                className="w-full rounded-xl border-top p-5"
                placeholder="More spicy, more sauce, ..."></textarea>
            </div>
            <div className="m-5">
              <Button className="px-6 py-3 text-xl">ORDER NOW</Button>
            </div>
          </div>
        </div>
        <div className="">
          <ProductSimilar productId={productId}></ProductSimilar>
        </div>
      </div>
    </div>
  );
};

function ProductSimilar({ productId }) {
  const [productSimilar, setProductSimilar] = useState(null);

  useEffect(() => {
    const getProductSimilar = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/related/${productId}`);
        const data = response.data.RelatedProducts;
        setProductSimilar(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    getProductSimilar();
  }, [productId]);
  return (
    <div className="mt-16">
      <h2 className="text-center text-black text-5xl mb-11">Product Similar</h2>
      <div className="grid grid-cols-3 gap-8">
        {productSimilar &&
          productSimilar.map((item) => <SpecialItem item={item} key={item._id}></SpecialItem>)}
      </div>
    </div>
  );
}

export default ProductDetail;
