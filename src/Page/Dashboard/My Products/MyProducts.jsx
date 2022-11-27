import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import AuthContext from "../../../Context/Context";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { IoIosDoneAll } from "react-icons/io";
import { ThreeCircles } from "react-loader-spinner";
const MyProducts = () => {
  const { user, singOutUser } = useContext(AuthContext);
  const {
    data: sellerProduct = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellerProduct", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res.status === 401 || res.status === 403) {
        return singOutUser();
      }
      const data = await res.json();
      return data;
    },
  });





  const handleUpdateAdvertise = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("advertised SuccessFull");
          refetch();
        }
      });
  };
  const handleDelete = (id) => {
    const agree = window.confirm('Are You Sure You Want To Delete')
    if(agree){
      fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Deleted SuccessFull");
            refetch();
          }
        });
    }
  
  };


 if(isLoading){
  <div className="h-1/2 w-full flex justify-center items-center mt-20">
        <ThreeCircles
                          height="150"
                          width="150"
                          color="#f82c38"
                          wrapperStyle={{}}
                          wrapperclassName=""
                          visible={true}
                          ariaLabel="three-circles-rotating"
                          outerCircleColor=""
                          innerCircleColor=""
                          middleCircleColor=""
                        />
      </div>
 }




  return (
    <div>
      <h2 className="text-3xl text-center  lg:text-start">
        My Products {sellerProduct?.length}
      </h2>
      <div className="overflow-x-auto mt-5 w-[95%] mx-auto  lg:w-full">
        <Toaster></Toaster>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Delete</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellerProduct?.map((p, i) => (
              <tr key={p._id}>
                <th>
                  <button
                    className="btn btn-circle btn-outline"
                    onClick={() => handleDelete(p._id)}
                  >
                    <AiFillDelete className="text-2xl"></AiFillDelete>
                  </button>
                </th>
                <td>
                  <div className="avatar">
                    <div className="w-20 rounded">
                      <img src={p.img} alt="Tailwind-CSS-Avatar-component" />
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-lg font-semibold">{p.productName}</p>
                </td>
                <td>
                  <strong>${p.ResalePrice}</strong>
                </td>
                <td>
                
                  {!p.paid && (
                      <>
                      <div className="badge badge-primary p-3 text-white">
                    available
                  </div>
                      </>
                    )}
                    {p.paid && (
                     
                  <div className="badge bg-green-500 p-3 text-white">
                    Sold
                  </div>
                    )}
                
               
                </td>
                <td>
                  <button
                    className="btn  btn-active text-white"
                    disabled={p.advertise || p.paid === true }
                    onClick={() => handleUpdateAdvertise(p._id)}
                  >
                    {p.advertise && p.advertise === true && (
                      <>
                        <label className="flex justify-center items-center text-blue-500 font-semibold">
                          {" "}
                          advertised <IoIosDoneAll className="text-2xl" />
                        </label>
                      </>
                    )}
                    {p?.advertise !== true && "advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
