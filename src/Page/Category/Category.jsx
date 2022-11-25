import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import CategoryProductCard from "../../Shared/Category Product Card/CategoryProductCard";
import BookingModal from "./Booking modal/BookingModal";

const Category = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const data =  useLoaderData();
  const [bookingProduct,setBookingProduct]=useState(null);

  return (
    <div>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <h1 className="text-3xl text-center">BetaCom is offering the best Second-hand  Laptops For You</h1>
      <section>
        <div className="relative  py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-3 lg:max-w-none">
               {
                data?.map(product => <CategoryProductCard key={product._id} data={product} setBookingProduct={setBookingProduct}/>)
               }
            </div>
          </div>
        </div>
      </section>
      {
        bookingProduct&&  <BookingModal bookingProduct={bookingProduct} setBookingProduct={setBookingProduct}></BookingModal>
      }
    
    </div>
  );
};

export default Category;
