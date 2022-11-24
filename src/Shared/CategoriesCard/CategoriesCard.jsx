import React from "react";
import { Link } from "react-router-dom";

const CategoriesCard = ({ data }) => {
  const { name, img , id} = data;
  return (
    <Link to={`/category/${id}`} className='mt-5'>
        <div className="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
      <img
        alt="team"
        className="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto lg:-mt-8 rounded-full shadow-xl aboslute mt-5"
        src={img}
      />

      <div className="p-3 lg:text-center">
        <h4 className=" text-2xl text-center font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">
          {name}
        </h4>
      </div>
    </div>
    </Link>
  );
};

export default CategoriesCard;
