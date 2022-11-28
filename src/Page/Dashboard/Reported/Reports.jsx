import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import Myloader from "../../../Shared/MyLoader/Myloader";

const Reports = () => {
  const [errorMessage,setErrorMessage]=useState('');
  const { data: reportedItem = [], refetch , isLoading } = useQuery({
    queryKey: ["reportedItem"],
    queryFn: async () => {
      const res = await fetch("https://betacom-server-cristain333.vercel.app/reports", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });
  const handleDelete = (reports) => {
    setErrorMessage('');
    const agree = window.confirm("Are You Sure You Want To Delete");
    if (agree) {
      fetch(`https://betacom-server-cristain333.vercel.app/report/${reports.productId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(reports),
      })
        .then((res) =>{
          if(res.status === 403){
            setErrorMessage(`You Don't Have Permission To Delete Product `)
          };
          return res.json()
        })
        .then((data) => {
          if (data.deletedCount) {
            toast.success("Product Deleted SuccessFull");
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
      <h2 className="text-3xl">All Reports By Users</h2>
      <p className="text-red-500">{errorMessage}</p>
      <Toaster></Toaster>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Reported By</th>
              <th>Delete Product</th>
            </tr>
          </thead>
          <tbody>
            {reportedItem?.map((reports) => (
              <tr>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={reports?.img} alt="img" />
                    </div>
                  </div>
                </td>
                <td>{reports?.productName}</td>
                <td>{reports?.name}</td>
                <td>
                  {" "}
                  <button
                    className="btn text-white btn-primary"
                    onClick={() => handleDelete(reports)}
                  >
                    <AiFillDelete className="text-2xl text-white"></AiFillDelete>
                    Delete
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

export default Reports;
