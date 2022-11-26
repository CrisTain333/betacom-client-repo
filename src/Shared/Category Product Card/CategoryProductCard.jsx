import React from "react";
import verifyLogo from "../../image/verify.png";
import { MdReport } from 'react-icons/md';



const CategoryProductCard = ({ data ,setBookingProduct }) => {
  const {
    img,
    productName,
    publishTime,
    sellerName,
    originalPrice,
    location,
    isVerifyed,
    ResalePrice,
    YearsOfUse,
  } = data;
  const options = { year: "numeric", month: "short", day: "numeric" };
  const current = new Date();
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = current.toLocaleDateString("en-US", options);





  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img className="object-cover w-full h-60" src={img} alt="" />
      </div>
      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
        <div className="flex-1">
            <p className="text-xl font-semibold text-neutral-600">
              {productName}
            </p>
            <p className="mt-3 text-md text-gray-600">
              Resale Price : ${ResalePrice}{" "}
            </p>
            <p className="mt-3 text-md text-gray-600">
              Original Price : ${originalPrice}
            </p>
            <p className="mt-3 text-md text-gray-600">
              Years Of Use : {YearsOfUse}
            </p>
            <p className="mt-3 text-md text-gray-600">Location : {location}</p>
         
        </div>
        <div className="flex items-center mt-6">
          <div className="flex-shrink-0">
            <span className="sr-only">Michael Andreuzza</span>
          </div>
          <div className="">
            <p className="text-lg font-medium text-neutral-600 flex items-center ">
              {sellerName}{" "}
              {isVerifyed && (
                <img
                  src={verifyLogo}
                  className="h-4 ml-1"
                  title=" User verified"
                  alt=""
                />
              )}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <p>{publishTime}</p>
            </div>
          </div>
        </div>
        <label htmlFor="my-modal-3" className="btn bg-primary text-white mt-5" onClick={()=>setBookingProduct(data)}>
          Book now
        </label>
        <button className="flex items-center font-bold text-lg mt-5 hover:text-blue-500 w-20"><MdReport></MdReport>Report</button>
      </div>
    </div>
  );
};

export default CategoryProductCard;
