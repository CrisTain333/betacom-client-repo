import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GiPriceTag } from "react-icons/gi";
import { BiUserCircle, BiTimeFive } from "react-icons/bi";
import { AiFillPhone } from "react-icons/ai";
import verifyLogo from "../../image/verify.png";
import AuthContext from "../../Context/Context";

const Advertised = ({ data }) => {
const {user} = useContext(AuthContext)
console.log(data)

  // const {img , productName , sellerName , publishTime , categoryId} = advertisedProduct
  return (
    <div className="my-20">
      {data.length !== 0 && (
        <>
          <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen md:px-24 lg:px-8 ">
            <div className="flex items-center justify-center max-w-screen-sm md:flex-row sm:mx-auto">
              <div>
                <h2 className=" font-sans text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none  flex items-center justify-center">
                  Flash Deals For You
                </h2>
              </div>
            </div>
          </div>

          <div className="pb-4 border-b border-gray-600">
            <h3 className="text-xl font-semibold leading-6 text-gray-800 text-center mt-5">
              Latest Products
            </h3>
          </div>
        </>
      )}

      <div className="relative mx-auto max-w-7xl">
        <div className="grid max-w-full gap-8 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none ">
          {data && (
            <>
              {data.map((p) => (
                
                <>

                  <div key={p._id} className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
                <Link to={`/category/${p.categoryId}`} >
                    <img
                      className="object-cover object-center w-full h-56"
                      src={p.img}
                      alt="avatar"
                    />

                    <div className="flex items-center px-6 py-3 bg-gray-900">
                      <BiUserCircle className="text-white text-2xl"></BiUserCircle>

                      <h1 className=" ml-1 text-lg font-semibold text-white flex items-center">
                        {p.sellerName}{" "}
                        {p?.isVerifyed === true && (
                          <>
                            <img
                              src={verifyLogo}
                              className="h-4 ml-1"
                              title=" User verified"
                              alt=""
                            />
                          </>
                        )}{" "}
                      </h1>
                    </div>

                    <p className="text-base px-6 py-3 text-gray-400 flex items-center">
                      <BiTimeFive className="mr-1"></BiTimeFive>
                      {p.publishTime}
                    </p>
                    <div className="px-6 pb-5">
                      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {p?.productName?.slice(0, 30)}
                      </h1>

                      <p className="py-2 text-gray-700 dark:text-gray-400">
                        {p.description?.slice(0, 100)}...
                      </p>
                      <p className="py-2 text-gray-700 dark:text-gray-400">
                        Condition : {p.conditionType}
                      </p>

                      <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <GiPriceTag className="text-2xl"></GiPriceTag>

                        <h1 className="px-2 text-lg font-medium">
                          ${p.ResalePrice}{" "}
                          <span className="text-gray-400 line-through">
                            {p.originalPrice}
                          </span>
                        </h1>
                      </div>

                      <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg
                          aria-label="location pin icon"
                          className="w-6 h-6 fill-current"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                          />
                        </svg>

                        <h1 className="px-2 text-sm">{p.location}</h1>
                      </div>

                      <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <AiFillPhone className="text-2xl"></AiFillPhone>

                        <h1 className="px-2 text-sm">{p.phoneNumber}</h1>
                      </div>
                    </div>
                </Link>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Advertised;
