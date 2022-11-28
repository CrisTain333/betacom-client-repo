import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { RiSecurePaymentLine } from 'react-icons/ri';
import payPng from '../../image/kindpng_480088.png'
const Payment = () => {
  const data = useLoaderData();
  const [success, setSuccess] = useState('');

  const { productName } = data;

  const stripePromise = loadStripe(process.env.REACT_APP_payment);

  return (
    <div>
    {
      success?"":<><h2 className="text-xl ml-5">Confirm Your Payment For {productName}</h2>
      <p className="text-base flex items-center text-gray-300 ml-20 mt-10">Secure Payment By <RiSecurePaymentLine className='text-gray-300 text-base'></RiSecurePaymentLine> </p>
       <img src={payPng} className='h-20' alt="" /></>

    }
      
      <div className="w-3/4 mt-10">
        <Elements stripe={stripePromise}>
          <CheckoutForm data={data} success={success} setSuccess={setSuccess}  />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
