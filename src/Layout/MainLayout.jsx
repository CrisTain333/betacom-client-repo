import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import './mainlayout.css'

const MainLayout = () => {
    return (
        <>

        <Navbar></Navbar>
        <div className='mainLayout'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </>
    );
};

export default MainLayout;