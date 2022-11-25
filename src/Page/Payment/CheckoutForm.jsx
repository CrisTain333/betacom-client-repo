import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import "./payment.css";

const CheckoutForm = ({ data }) => {
  const { ResalePrice, _id } = data;
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
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

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

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
      };
      fetch("http://localhost:5000/payments", {
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
     <Toaster></Toaster>
      <form onSubmit={handleSubmit}  className="ml-5 mr-5 w-full">
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
            className="btn btn-primary text-white mx-auto "
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
              "Pay"
            )}
          </button>

          </div>
        </div>
      </form>

      {success && (
        <div className="mx-10 my-10">
          <p className="text-green-500 text-xl">{success}</p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
