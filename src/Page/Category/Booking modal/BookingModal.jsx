import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../../../Context/Context";

const BookingModal = ({ setBookingProduct, bookingProduct }) => {
  const { user } = useContext(AuthContext);
  const { productName, ResalePrice,img } = bookingProduct;

  const handleProductBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const booking = {
      productName,
      img,
      ResalePrice,
      email: user.email,
      name: user.displayName,
      phone: form.phone.value,
      meetingLocation : form.meetingLocation.value
    };
    // axios POST request
    const options = {
      url: "https://betacom-server-cristain333.vercel.app/bookings",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: booking,
    };

    axios(options).then((response) => {
      if(response.data.acknowledged){
        toast.success('Successfully Booked')
        setBookingProduct(null);
      }
    });
  };
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
      
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-1 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{productName}</h3>
          <form
            onSubmit={handleProductBooking}
            className="grid grid-cols-1 gap-3 mt-10 "
          >
            <input
              type="text"
              name="resalePrice"
              readOnly
              value={`$ ${ResalePrice}`}
              className="input w-full input-bordered  text-lg font-medium"
            />
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input w-full input-bordered dark:border-red-50 dark:bg-gray-900 dark:text-gray-100"
              defaultValue={user?.displayName}
              readOnly
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              readOnly
              placeholder="Email Address"
              className="input w-full input-bordered dark:border-red-50 dark:bg-gray-900 dark:text-gray-100"
            />
            <input
              name="meetingLocation"
              type="text"
              placeholder="Meeting Location"
              className="input w-full input-bordered dark:border-red-50 dark:bg-gray-900 dark:text-gray-100"
            />
            <input
              name="phone"
              type="text"
              required
              placeholder="Phone Number"
              className="input w-full input-bordered dark:border-red-50 dark:bg-gray-900 dark:text-gray-100"
            />
            <br />
            <input
              className="btn btn-primary text-white w-full dark:border-red-50 dark:bg-gray-900 dark:text-gray-100"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
