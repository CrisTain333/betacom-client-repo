import React from 'react';
import image from '../../image/dashb.jpg'
const DafaultDashboard = () => {
    return (
        <div className='w-[85%] mx-auto'>
        <h2 className='text-3xl text-center font-semibold mt-2'>Welcome To DashBoard</h2>
        <img src={image} className='' alt="" />
       
            
        </div>
    );
};

export default DafaultDashboard;