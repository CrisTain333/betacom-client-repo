import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";

const AllBuyers = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ["buyers"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/users/buyers", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
    
          const data = await res.json();
          return data;
        },
      });




    return (
        <div>
        <Toaster></Toaster>
        <h2 className="text-3xl text-center lg:text-start">
          All Sellers : {buyers.length}
        </h2>
  
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buyers?.map((seller ,i) => (
                <tr key={seller._id}>
                  <th>
                  
                    {i+1}
                  </th>
                  <th>{seller.name}</th>
                  <td>{seller.email}</td>
                  <td>
                  <button
                      className="btn btn-circle btn-outline bg-primary text-white"
                    //   onClick={() => handleDelete(seller._id)}
                    >
                      <AiFillDelete className="text-2xl"></AiFillDelete>
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

export default AllBuyers;