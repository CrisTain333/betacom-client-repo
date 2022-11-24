import React, { useEffect, useState } from "react";
import icon from '../../image/icons8-the-flash-sign.svg'
import CategoriesCard from "../../Shared/CategoriesCard/CategoriesCard";
const ProductCategories = () => {
    const [data,setData]=useState();
useEffect(()=>{
    fetch('Category.json')
    .then(res => res.json())
    .then(data => setData(data))
},[])


  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex items-center justify-center max-w-screen-sm md:flex-row sm:mx-auto">
    
          <div className="flex items-center justify-center w-16 h-16  rounded-full bg-primary">
           <img src={icon} className='h-14' alt="" />
          </div>
       
        <div>
          <h2 className=" font-sans text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none ml-5">
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
        data?.map((e,i)=><CategoriesCard key={i+1}  data={e}></CategoriesCard>)
    }
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default ProductCategories;
