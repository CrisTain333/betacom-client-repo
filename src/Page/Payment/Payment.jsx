import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const data = useLoaderData();

    const {ResalePrice,productName} = data

    const stripePromise = loadStripe(process.env.REACT_APP_payment);
    return (
        <div>
        <h2 className='text-xl mx-10'>Confirm Your  Payment For {productName}</h2> 
        <p className='text-lg  mx-10'>Price: $<strong>{ResalePrice}</strong></p>
            



        <div className="w-3/4 mt-10">
        <Elements stripe={stripePromise}>
          <CheckoutForm data={data} />
        </Elements>
      </div>
        </div>
    );
};

export default Payment;