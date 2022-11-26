import { useQuery } from "@tanstack/react-query";
import React from "react";
import Advertised from "./Advertised";
import ProductCategories from "./ProductCategories";
import brnadImage from "../../image/top-view-freelance-asian-lady-using-laptop-shopping-online-with-credit-card-table.jpg";

const Home = () => {
  const { data: advertisedProduct = [] } = useQuery({
    queryKey: ["advertisedProduct"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/product/advertisedProduct"
      );
      const data = res.json();
      return data;
    },
  });
  console.log(advertisedProduct);

  return (
    <div>
      <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          <svg
            className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none slice"
          >
            <path d="M50 0H100L50 100H0L50 0Z" />
          </svg>
          <img
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src={brnadImage}
            alt=""
          />
        </div>
        <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none">
              Betacom <br />
              <span className="inline-block text-deep-purple-accent-400 text-gray-700">
                is The Best Second-Hand Laptops Buy Sale Online Market
              </span>
            </h2>
            <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
              " Your Trust Is Our Future Path "
            </p>
          </div>
        </div>
      </div>

      {/* Product Categories Section */}
      <div className="my-16">
        <ProductCategories></ProductCategories>
      </div>

      {/* Advertised Section */}
      <div>
        {advertisedProduct && (
          <Advertised data={advertisedProduct}></Advertised>
        )}
      </div>
    </div>
  );
};

export default Home;
