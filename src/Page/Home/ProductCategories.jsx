import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoriesCard from "../../Shared/CategoriesCard/CategoriesCard";
const ProductCategories = () => {
      
const {data:category = []} = useQuery({
  queryKey:['category'],
  queryFn: async()=>{
    const res = await fetch('https://betacom-server-cristain333.vercel.app/category')
    const data = await res.json()
    return data;
  }
})


  return (
    <div>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div className="flex items-center justify-center max-w-screen-sm md:flex-row sm:mx-auto">
       
        <div>
          <h2 className=" font-sans text-3xl text-center font-bold tracking-tight sm:text-4xl sm:leading-none ml-5">
            Product Categories
          </h2>
        </div>
      </div>
    </div>
    <section>
  <div className="relative px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
    <div className="relative mx-auto max-w-7xl">
      <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-3 lg:max-w-none">
    {
      category?.map((e,i)=><CategoriesCard key={i+1}  data={e}></CategoriesCard>)
    }
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default ProductCategories;
