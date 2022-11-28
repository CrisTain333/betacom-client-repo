import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import Myloader from "../../../Shared/MyLoader/Myloader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const AllBuyers = () => {
  const {
    data: buyers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch("https://betacom-server-cristain333.vercel.app/users/buyers", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    const agree = window.confirm("Are You Sure You Want To Delete");
    if (agree) {
      fetch(`https://betacom-server-cristain333.vercel.app/users/${id}`, {
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
  if (isLoading) {
    return <Myloader></Myloader>;
  }

  return (
    <div>
      <Toaster></Toaster>
      <h2 className="text-3xl text-center lg:text-start">
        All buyers : {buyers.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>image</th>
              <th>Name</th>
              <th>email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <th>
                  <PhotoProvider>
                    <PhotoView src={seller.img}>
                    <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={seller.img} alt="userImage" />
                    </div>
                  </div>
                    </PhotoView>
                  </PhotoProvider>
                </th>
                <th>{seller.name}</th>
                <td>{seller.email}</td>
                <td>
                  <button
                    className="btn btn-circle btn-outline bg-primary text-white"
                    onClick={() => handleDelete(seller._id)}
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
