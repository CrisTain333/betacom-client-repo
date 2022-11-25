import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../../Context/Context";
import useAdmin from "../../hooks/useAdmin";
import Navbar from "../../Shared/Navbar/Navbar";

const DashBoardLayout = () => {
    const { user, singOutUser , setUser} = useContext(AuthContext);
  const isBuyer = false ;
  const isSellers = false;
  const [isAdmin] = useAdmin(user?.email);
  console.log(isAdmin)
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 bg-gray-50 rounded text-base-content">
            {/* <!-- Sidebar content here --> */}
            {
      isSellers&&<> 
      <li>
        <Link
          href="/"
          aria-label="Our product"
          title="Our product"
          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 bg-gray-200"
        >
        Add A product
        </Link>
      </li>
      <li>
        <Link
          href="/"
          aria-label="Product pricing"
          title="Product pricing"
          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
         My Products
        </Link>
      </li>
      
      </>
    }
    {
      isBuyer&&<>
      <li>
        <Link
          href="/"
          aria-label="Our product"
          title="Our product"
          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          My Orders
        </Link>
      </li>
      </>
    }
    {
      isAdmin?<>
        
   
      <li>
        <Link
          href="/"
          aria-label="About us"
          title="About us"
          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          All Sellers
        </Link>
      </li>
      <li>
        <Link
          href="/"
          aria-label="About us"
          title="About us"
          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          All Buyers
        </Link>
      </li>
      <li>
        <Link
          href="/"
          aria-label="About us"
          title="About us"
          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          Reported Items
        </Link>
      </li>
      </>:''
    }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
