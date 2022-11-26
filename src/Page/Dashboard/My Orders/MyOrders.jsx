import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/Context";
import Myloader from "../../../Shared/MyLoader/Myloader";

const MyOrders = () => {
    const {user} = useContext(AuthContext); 

    const {data: bookings = [ ],refetch , isLoading} = useQuery({
        queryKey:['bookings',user?.email],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`,{
                headers:{

                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            const data = await res.json()
            return data;
        }
        
    })
    if(isLoading){
       return <Myloader></Myloader>
    }
  

  return (
    <div>
      <h2 className="text-3xl">MY Orders : {bookings?.length}</h2>

      <div className="overflow-x-auto">
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
          
            {
                
             bookings&&bookings.map((booking,i) => <tr key={booking?._id}>
              <th>{i+1}</th>
              <td><img className="w-10 h-10 rounded" src={booking?.img} alt="ProductImage"/></td>
              <td>{booking?.productName}</td>
              <td><strong>${booking?.ResalePrice}</strong></td>
              <td>
               {booking.ResalePrice && !booking.paid && (
                      <>
                        <Link to={`/dashboard/payment/${booking._id}`}>
                          <button className="btn bg-red-500 text-white btn-sm">
                            Pay
                          </button>
                        </Link>
                      </>
                    )}
                    {booking.ResalePrice && booking.paid && (
                      <span className="text-white btn btn-sm hover:bg-green-600  bg-green-500 ">
                        Paid
                      </span>
                    )}
              </td>
            </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
