import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../../Context/Context";
import useAdmin from "../../hooks/useAdmin";
import useNormalUser from "../../hooks/useNormalUser";
import useSellerAccount from "../../hooks/useSellerAccount";
import Navbar from "../../Shared/Navbar/Navbar";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaLuggageCart, FaUsersCog } from 'react-icons/fa';
import { IoBagAddSharp } from 'react-icons/io5';
import { TbMessageReport } from 'react-icons/tb';
import { ImUsers } from 'react-icons/im';
import { RiHeartAddFill } from 'react-icons/ri';

const DashBoardLayout = () => {
  const { user} = useContext(AuthContext);
  const [isSellerAccount] = useSellerAccount(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [NormalUser] = useNormalUser(user?.email);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mr-0 lg:mr-5 lg:ml-5 ml-0">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
         
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 bg-slate-50  rounded text-base-content">
            {/* <!-- Sidebar content here --> */}
            {isSellerAccount && (
              <>
             
                <li>
                  <Link
                    to="/dashboard/add/product"
                    aria-label="Our product"
                    title="Our product"
                    className="font-medium tracking-wide bg-primary text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                  <IoBagAddSharp></IoBagAddSharp>
                    Add A product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my/products"
                    className="font-medium tracking-wide bg-primary text-white mt-3 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                  <FaLuggageCart></FaLuggageCart>
                    My Products
                  </Link>
                </li>
              </>
            )}
            {NormalUser && (
              <>
                <li>
                  <Link
                    to="/dashboard/orders"
                    aria-label="Our product"
                    title="Our product"
                    className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400 bg-primary text-white my-3"
                  >
                  <AiOutlineShoppingCart></AiOutlineShoppingCart>
                    My Orders
                  </Link>
                </li>
              </>
            )}
            {isAdmin ? (
              <>
                <li>
                  <Link
                    to="/dashboard/sellers"
                    aria-label="About us"
                    title="About us"
                    className="font-medium tracking-wide bg-primary text-white transition-colors duration-200 hover:text-deep-purple-accent-400 my-3"
                  >
                  <FaUsersCog></FaUsersCog>
                    All Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard/buyers'
                    className="font-medium tracking-wide bg-primary text-white transition-colors duration-200 hover:text-deep-purple-accent-400 my-3"
                  >
                  <ImUsers></ImUsers>
                    All Buyers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/reports"
                    className="font-medium tracking-wide bg-primary text-white transition-colors duration-200 hover:text-deep-purple-accent-400 my-3"
                  >
                  <TbMessageReport className="text-lg"></TbMessageReport>
                    Reported Items
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
