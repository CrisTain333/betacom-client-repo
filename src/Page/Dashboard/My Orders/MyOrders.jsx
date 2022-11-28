import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/Context";
import Myloader from "../../../Shared/MyLoader/Myloader";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const {
    data: bookings = [],
    isLoading,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://betacom-server-cristain333.vercel.app/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Myloader></Myloader>;
  }

  return (
    <div>
      <h2 className="text-3xl text-center  lg:text-start">
        MY Orders : {bookings?.length}
      </h2>
      

      <div className="overflow-x-auto mt-5 w-[95%] mx-auto  lg:w-full">
        <table className="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row --> */}

            {bookings &&
              bookings.map((booking, i) => (
                <tr key={booking?._id}>
                  <th>{i + 1}</th>
                  <td>
                    <img
                      className="w-10 h-10 rounded"
                      src={booking?.img}
                      alt="ProductImage"
                    />
                  </td>
                  <td>{booking?.productName}</td>
                  <td>
                    <strong>${booking?.ResalePrice}</strong>
                  </td>
                  <td>
                    {booking.ResalePrice && !booking.paid && (
                      <>
                        <Link to={`/dashboard/payment/${booking._id}`}>
                          <button className="btn bg-blue-500 text-white btn-sm" disabled={booking.paid === true}>
                            Pay
                          </button>
                        </Link>
                      </>
                    )}
                    {booking.ResalePrice && booking.paid && (
                      <span className="text-white btn hover:bg-green-600  bg-green-500 ">
                        Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
