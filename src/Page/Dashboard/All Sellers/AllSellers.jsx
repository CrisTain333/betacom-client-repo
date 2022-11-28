import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { VscUnverified, VscVerified } from "react-icons/vsc";
import Myloader from "../../../Shared/MyLoader/Myloader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
const AllSellers = () => {
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("https://betacom-server-cristain333.vercel.app/users/sellers", {
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

  const handleUpdate = (email) => {
    fetch(`https://betacom-server-cristain333.vercel.app/users/verify/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Verified SuccessFull");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Myloader></Myloader>;
  }

  return (
    <div>
      <Toaster></Toaster>
      <h2 className="text-3xl text-center lg:text-start">
        All Sellers : {sellers.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((seller) => (
              <tr key={seller._id}>
                <th>
                  {" "}
                  <button
                    className="btn btn-circle btn-outline"
                    onClick={() => handleDelete(seller._id)}
                  >
                    <AiFillDelete className="text-2xl"></AiFillDelete>
                  </button>
                </th>
                <th>
                  <PhotoProvider>
                    <PhotoView src={seller.img}>
                    <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={seller.img} alt="userImage" />
                    </div>
                  </div>
                    </PhotoView>
                  </PhotoProvider>
                  
                </th>
                <th>{seller.name}</th>
                <td>{seller.email}</td>
                <td className=" text-base font-semibold ">
                  {seller.isVerifyed ? (
                    <div className="flex items-center text-green-500 ">
                      <VscVerified className="mr-1 text-blue-500"></VscVerified>{" "}
                      verified
                    </div>
                  ) : (
                    <div className="flex items-center  text-primary">
                      <VscUnverified className="mr-1"></VscUnverified>{" "}
                      unverified
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm bg-blue-500 text-white"
                    disabled={seller.isVerifyed === true}
                    onClick={() => handleUpdate(seller.email)}
                  >
                    {seller.isVerifyed ? "verified" : "verify"}
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

export default AllSellers;
