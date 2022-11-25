import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import AuthContext from "../../../Context/Context";
import { AiFillDelete } from "react-icons/ai";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
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
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-3xl">My Products {sellerProduct?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sellerProduct?.map((p, i) => (
              <tr key={p._id}>
                <th>
                  <button className="btn btn-circle btn-outline"><AiFillDelete className="text-2xl"></AiFillDelete></button>
                </th>
                <td>
                  <div className="avatar">
                    <div className="w-20 rounded">
                      <img src={p.img} alt="Tailwind-CSS-Avatar-component" />
                    </div>
                  </div>
                </td>
                <td>
                  <strong>${p.productPrice}</strong>
                </td>
                <td>
                  <div className="badge badge-primary p-3 text-white">
                    available
                  </div>
                </td>
                <td><button className="btn btn-accent">advertise</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
