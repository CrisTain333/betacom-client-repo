import React, { useContext } from "react";
import verifyLogo from "../../image/verify.png";
import AuthContext from "../../Context/Context";
import toast, { Toaster } from "react-hot-toast";
import { MdReport } from 'react-icons/md';



const CategoryProductCard = ({ data, setBookingProduct }) => {
  const {user}=useContext(AuthContext);
  const {
    _id,
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

  const handleReport = id =>{
    const agree = window.confirm('Are You Sure You Want To Report')
   

    const reportedItem = {
      productId:id,
      name: user?.displayName,
      email:user.email,
      img,
      productName,
      sellerName,
      originalPrice,
      location,
    }


    if(agree){
      fetch(`https://betacom-server-cristain333.vercel.app/report/${id}`,{
      method:'POST',
      headers:{
        'content-type':'application/json '
      },
      body:JSON.stringify(reportedItem)
    })
    .then(res=>res.json())
    .then(data => {
      if(data.acknowledged){
        toast.success('Reported Successfully');
      }
    }) 
    }
    
  }



  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
    <Toaster></Toaster>
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
            <div className="flex justify-between items-center w-full  space-x-16 text-sm text-gray-500">
              <p>{publishTime}</p>
              <button
                className="flex  items-center  font-bold text-lg  hover:text-blue-500  "
                onClick={()=>handleReport(_id)}
              >
              <MdReport></MdReport>
                {" "}
                Report
               
              </button>
            </div>
          </div>
        </div>
        <label
          htmlFor="my-modal-3"
          className="btn bg-primary text-white mt-5"
          onClick={() => setBookingProduct(data)}
        >
          Book now
        </label>
      </div>
    </div>
  );
};

export default CategoryProductCard;
