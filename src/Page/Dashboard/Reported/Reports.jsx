import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

const Reports = () => {
  const { data: reportedItem = [] , refetch} = useQuery({
    queryKey: ["reportedItem"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reports", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });
  const handleDelete =(reports)=>{
    fetch(`http://localhost:5000/report/${reports.productId}`,{
        method:'DELETE',
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body:JSON.stringify(reports)
    })
    .then(res => res.json())
    .then(data =>{
        if(data.deletedCount){
            toast.success('Product Deleted SuccessFull')
            refetch()
        }
    })





  }

  return (
    <div>
      <h2 className="text-3xl">All Reports By Users</h2>
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
                <td>  <button
                    className="btn text-white btn-primary"
                    onClick={() => handleDelete(reports)}
                  >
                    <AiFillDelete className="text-2xl text-white"></AiFillDelete>Delete
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
