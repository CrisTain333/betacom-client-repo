import React from "react";
import { useLoaderData } from "react-router-dom";
import CategoryProductCard from "../../Shared/Category Product Card/CategoryProductCard";

const Category = () => {
  const data =  useLoaderData();
  return (
    <div>
    <h1 className="text-3xl text-center">BetaCom is offering the best Second-hand  Laptops For You</h1>
      <section>
        <div className="relative  py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-3 lg:max-w-none">
               {
                data?.map(product => <CategoryProductCard key={product._id} data={product}/>)
               }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
