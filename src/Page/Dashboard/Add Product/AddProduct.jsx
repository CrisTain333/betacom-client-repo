import axios from "axios";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import AuthContext from "../../../Context/Context";

const AddProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const current = new Date();
    const time = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const today  = new Date();
    const options = {  year: 'numeric', month: 'short', day: 'numeric' };

    const date = today.toLocaleDateString("en-US", options)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        
        
        

    const productName = form.productName.value;
    const productPrice = form.productPrice.value;
    const brandName = form.brandName.value;
    const phoneNumber = form.phoneNumber.value;
    const location = form.location.value;
    const yearOfPurchase = form.yearOfPurchase.value;
    const originalPrice = form.originalPrice.value;
    const conditionType = form.conditionType.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const description = form.description.value;
    const uri = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgKey}`;
    let categoryId;
    if(brandName === 'Apple'){
        categoryId = '01'
    }
    if(brandName === 'HP'){
        categoryId = '02'
    }
    if(brandName === 'DELL'){
        categoryId = '03'
    }


    setLoading(true)
    fetch(uri, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const product = {
            categoryId,
            img: data.data.display_url,
            brandName,
            productName,
            ResalePrice:productPrice,
            originalPrice,
            YearsOfUse:yearOfPurchase,
            location,
            sellerName:user.displayName,
            publishTime:`${date} ${time}`,
            isVerifyed: false,
            isReported: false,
            email: user?.email,
          };

          const options = {
            url: "http://localhost:5000/product",
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
            data: product,
          };
          axios(options).then((response) => {
            if(response.data.acknowledged){
                toast.success('Successfully Product Added');
                setLoading(false)
            }
          });
        }
      })
      .catch(err =>{
        setLoading(false);
      })
  };

  return (
    <div>
    <Toaster></Toaster>
      <div className="max-w-screen-md mx-auto p-5">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Add A <span className="text-primary">Product</span>
          </h3>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-first-name"
              >
                Product Name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="productName"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-last-name"
              >
                Product Price
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="productPrice"
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
          {/* <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-password"
              >
                Product Image
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                name="image"
              />
            </div> */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-first-name"
              >
                Brand Name
              </label>
              <select
                name="brandName"
                className=" block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                <option value="Apple">Apple</option>
                <option value="HP">HP</option>
                <option value="DELL">DELL</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-last-name"
              >
                Phone Number
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="phoneNumber"
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-first-name"
              >
                Location
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="location"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-last-name"
              >
                Year of purchase
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="yearOfPurchase"
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-first-name"
              >
                Original Price
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="originalPrice"
                type="number"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-last-name"
              >
                Condition Type
              </label>
              <select
                name="conditionType"
                id=""
                className=" block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-password"
              >
                Product Image
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                name="image"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
               htmlFor="grid-password"
              >
                Description
              </label>
              <textarea
                rows="3"
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="description"
              ></textarea>
            </div>
            <div className="flex justify-center w-full px-3">
              <button
                className="shadow bg-primary hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
              {
                isLoading?<>
                <ThreeCircles
                height="45"
                width="45"
                color="#ffffff"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />

                </>: 'Submit'
              }
               
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
