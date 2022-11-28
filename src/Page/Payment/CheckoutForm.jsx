import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import "./payment.css";
import logo from '../../image/nav.png'

const CheckoutForm = ({ data , success ,  setSuccess}) => {
  const { ResalePrice, _id ,productName ,productId } = data;
  console.log(productId);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  // const [success, setSuccess] = useState(true);
  const [transactionId, setTransactionId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch("https://betacom-server-cristain333.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ResalePrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [ResalePrice]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
    }
console.log(paymentMethod)
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
            address: address,
          },
        },
      });
    if (confirmError) {
      setErrorMessage(confirmError.message);
      setProcessing(false);
    }
    if (paymentIntent.status === "succeeded") {
      // store payment info in the database
      const payment = {
        ResalePrice,
        transactionId: paymentIntent.id,
        email,
        name,
        address,
        bookingId: _id,
        productName,
      };
      fetch("https://betacom-server-cristain333.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Congrats! your payment completed");
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };

  return (
    <div>
    {
      success?<>
      <section className="flex flex-col justify-center antialiased text-gray-600 min-h-fit p-4">
        <div className="h-full">
          {/* <!-- Card --> */}
          <div className="max-w-[360px] mx-auto">
            <div className="bg-white shadow-lg rounded-lg mt-9">
              {/* <!-- Card header --> */}
              <header className="text-center px-5 pb-5">
                {/* <!-- Avatar --> */}
                <img
                  className="inline-flex -mt-9 w-[72px] h-[72px] fill-current rounded-full border-4 border-white box-content shadow mb-3"
                  viewBox="0 0 72 72"
                  src={logo}
                  alt="brand"
                />
                {/* <!-- Card name --> */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Invoice from <span>Betacom</span>
                </h3>
                <p className="text-green-500 text-xl">{success}</p>
                <div className="text-sm font-medium text-gray-500">
                Your TransactionId : <span className="font-bold">{transactionId}</span>
                </div>
              </header>
              {/* <!-- Card body --> */}
              <div className="bg-gray-100 text-center px-5 py-6">
                <div className="text-sm mb-6">
                  <h3 className="text-2xl">Payment Completed For</h3>
                  <strong className="text-xl font-bold text-gray-700">{productName}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </>:<>

      <Toaster></Toaster>
      <form onSubmit={handleSubmit}  className="ml-5 mr-5">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Your Email"
          required
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="address">Address</label>
        <textarea
          name="address"
          className="textarea textarea-bordered"
          rows="2"
          cols="45"
          required
          placeholder="Your Address"
        ></textarea>
       
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
                width: "100%",
                marginTop : "10px"
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-red-500 text-lg mt-5">{errorMessage}</p>
        <div className="w-full mx-auto">
          <div className="mx-auto">
          <button
            type="submit"
            className="btn btn-primary text-white mx-auto"
            disabled={!stripe}
          >
            {processing ? (
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
            ) : (
             `Pay $${ResalePrice}`
            )}
          </button>

          </div>
        </div>
      </form>

      </>
    }
    
    

      {/* {success && (
        <div className="mx-10 my-10">
          
          <p>
            Your transactionId:{" "}
            
          </p>
        </div>
      )} */}
    </div>
  );
};

export default CheckoutForm;
