import React from "react";
import { Link } from "react-router-dom";
import icon from "../../image/icons8-the-flash-sign.svg";
import { GoLocation } from 'react-icons/go';
import { GiCampfire, GiSmallFire } from 'react-icons/gi';
import gif from '../../image/f62095e1-2bc1-49b0-b3e8-90fb9d3c1f46.gif'
const Advertised = ({ data }) => {
  console.log(data[0]);
  // const {img , productName , sellerName , publishTime , categoryId} = advertisedProduct
  return (
    <div className="my-20">
     {
      data[0]?.advertise === true&&<>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex items-center justify-center max-w-screen-sm md:flex-row sm:mx-auto">
         

          <div>
            <h2 className=" font-sans text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none ml-5 flex items-center">
            <GiSmallFire className="text-red-500 mr-2 "></GiSmallFire>
              Flash Deals For You
              <GiSmallFire className="text-red-500 ml-2 "></GiSmallFire>
            </h2>
          </div>
        </div>
      </div>

        <div className="pb-4 border-b border-gray-600">
          <h3 className="text-xl font-semibold leading-6 text-gray-800 text-center mt-5">
            Latest Products
          </h3>
         
        </div>
        <div className="flex items-center">
            <h1><img src={gif} alt="" className="h-24" /></h1>
            <h1><img src={gif} alt="" className="h-24" /></h1>
            <h1><img src={gif} alt="" className="h-24" /></h1>
          </div>
      </>
     }

        <div className="relative mx-auto max-w-7xl">
          <div className="grid max-w-lg gap-8 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
            {data[0]?.advertise === true && (
              <>
                {data.map((p) => (
                 
                    <Link to={`/category/${p.categoryId}`} key={p._id}>
                      <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex space-x-4">
                          <div className="flex flex-col space-y-1">
                            <p className="text-base font-semibold">
                              {p.sellerName}
                            </p>
                            <span className="text-md dark:text-gray-400">
                              {p.publishTime}
                            </span>
                          </div>
                        </div>
                        <div>
                          <img
                            src={p.img}
                            alt=""
                            className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                          />
                          <div className="flex items-center justify-between"> 
                          <div>
                          <h2 className="mb-1 inline-block text-xl font-semibold">
                            {p.productName}
                          </h2>
                          </div>

                         <div className="flex items-center justify-end">
                         <p className="text-md dark:text-gray-400">Price : <strong>${p.ResalePrice}</strong></p>
                          <p className="text-md text-gray-400 line-through ml-3"> <strong>{p.originalPrice}</strong></p>
                         </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-between">
                          <div className="space-x-2 ">
                            <p
                              aria-label="Share this post"
                              className="p-2 text-center flex items-center"
                            >
                              <GoLocation></GoLocation>.  {p.location}
                            </p>
                          </div>
                          <div className="flex space-x-2 text-sm dark:text-gray-400">
                            <p
                              
                              className="flex items-center p-1 space-x-1.5"
                            >
                            Used
                            
                              <span className="ml-2"><strong>{p.YearsOfUse} </strong></span>  Year
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  
                ))}
              </>
            )}
          </div>
        </div>
    </div>
  );
};

export default Advertised;
