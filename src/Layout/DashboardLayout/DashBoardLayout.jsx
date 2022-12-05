import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../../Context/Context";
import useAdmin from "../../hooks/useAdmin";
import useNormalUser from "../../hooks/useNormalUser";
import useSellerAccount from "../../hooks/useSellerAccount";
import Navbar from "../../Shared/Navbar/Navbar";
import { AiOutlineShoppingCart  , AiOutlineHome} from "react-icons/ai";
import { FaLuggageCart, FaUsersCog } from "react-icons/fa";
import { IoBagAddSharp } from "react-icons/io5";
import { TbMessageReport } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import { ImUsers } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import verifyLogo from "../../image/verify.png";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const DashBoardLayout = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isSellerAccount] = useSellerAccount(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [NormalUser] = useNormalUser(user?.email);


  const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await fetch(`https://betacom-server-cristain333.vercel.app/users/${user?.email}`);
      const data = res.json();
      return data;
    },
  });

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
          <ul className="menu p-4 w-64 bg-slate-50  rounded text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <div className="flex flex-col justify-center   rounded-xl  dark:bg-gray-900 dark:text-gray-100">
                <PhotoProvider>
                  <PhotoView src={user?.photoURL}>
                  <div className="avatar online">
                  <div className="w-24 rounded-full">
                    <img src={user?.photoURL} alt="" />
                  </div>
                </div>
                  </PhotoView>
                </PhotoProvider>
                
                <div className="space-y-4 text-center divide-y">
                  <div className="">
                    <h2 className="text-xl font-semibold  flex items-center justify-center">
                      {user?.displayName}{" "}
                      {users[0]?.isVerifyed && (
                        <img
                          src={verifyLogo}
                          className="h-4 ml-1"
                          title=" User verified"
                          alt=""
                        />
                      )}
                    </h2>
                    <p className="px-5 font-semibold text-md text-gray-400">
                      {isSellerAccount && <>Account Type : Seller</>}
                      {isAdmin && <>Admin</>}
                    </p>

                    <span className="flex items-center space-x-2">
                      <HiOutlineMailOpen className="text-gray-400"></HiOutlineMailOpen>
                      <span className="text-gray-400">{user?.email}</span>
                    </span>
                  </div>
                </div>
              </div>
            </li>

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
                    to="/dashboard/buyers"
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
