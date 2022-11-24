import React from "react";

const BookingModal = ({setBookingProduct,bookingProduct}) => {
    console.log(bookingProduct)
    const {productName , ResalePrice} = bookingProduct
    const handleProductBooking =(e)=>{
        e.preventDefault()
        const form = e.target

    }
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
          <h3 className="text-lg font-bold">
            {productName}
          </h3>
          <form
            onSubmit={handleProductBooking}
            className="grid grid-cols-1 gap-3 mt-10 "
          >
            <input
              type="text"
              disabled
              value= {`$ ${ResalePrice}`}
              className="input w-full input-bordered  text-lg font-medium"
            />
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input w-full input-bordered dark:border-red-50 dark:bg-gray-900 dark:text-gray-100"
            //   defaultValue={user?.displayName}
              readOnly
            />
            <input
              name="email"
              type="email"
            //   defaultValue={user?.email}
              readOnly
              placeholder="Email Address"
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
              className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full dark:border-red-50 dark:bg-gray-900 dark:text-gray-100"
              type="submit"
              value="Book"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
