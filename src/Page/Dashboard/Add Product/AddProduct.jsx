import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";

const AddProduct = () => {
  const [isLoading, setLoading] = useState(false);

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

    setLoading(true)
    fetch(uri, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const product = {
            productName,
            productPrice,
            brandName,
            phoneNumber,
            location,
            yearOfPurchase,
            originalPrice,
            conditionType,
            description,
            img: data.data.display_url,
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
      <div class="max-w-screen-md mx-auto p-5">
        <div class="text-center mb-16">
          <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Add A <span class="text-primary">Product</span>
          </h3>
        </div>

        <form class="w-full" onSubmit={handleSubmit}>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Product Name
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="productName"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Product Price
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="productPrice"
                type="number"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
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
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Phone Number
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="phoneNumber"
                type="number"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Location
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="location"
                type="text"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Year of purchase
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="yearOfPurchase"
                type="number"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Original Price
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="originalPrice"
                type="number"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
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
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
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

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Description
              </label>
              <textarea
                rows="3"
                class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="description"
              ></textarea>
            </div>
            <div class="flex justify-center w-full px-3">
              <button
                class="shadow bg-primary hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
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
