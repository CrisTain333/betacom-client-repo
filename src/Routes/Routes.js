import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashboardLayout/DashBoardLayout";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Page/404 Page/ErrorPage";
import Blog from "../Page/Blog/Blog";
import Category from "../Page/Category/Category";
import AddProduct from "../Page/Dashboard/Add Product/AddProduct";
import AllBuyers from "../Page/Dashboard/All Buyers/AllBuyers";
import AllSellers from "../Page/Dashboard/All Sellers/AllSellers";
import DafaultDashboard from "../Page/Dashboard/DafaultDashboard";
import MyOrders from "../Page/Dashboard/My Orders/MyOrders";
import MyProducts from "../Page/Dashboard/My Products/MyProducts";
import Reports from "../Page/Dashboard/Reported/Reports";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import SingUp from "../Page/Login/SingUp";
import Payment from "../Page/Payment/Payment";
import DisplayError from "../Shared/Display Error/DisplayError";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";
import UserRoute from "./UserRoute";








const router = createBrowserRouter([


  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        loader: async ({ params }) =>
          fetch(`https://betacom-server-cristain333.vercel.app/category/${params.id}`),
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/singup",
        element: <SingUp></SingUp>,
      },
      {
        path:'/blog',
        element: <Blog></Blog>
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path:'/dashboard',
        element: <DafaultDashboard></DafaultDashboard>

      },

      {
        path: "/dashboard/orders",
        element:<UserRoute><MyOrders></MyOrders> </UserRoute>
      },
      {
        path: "/dashboard/my/products",
        element: <SellerRoute><MyProducts></MyProducts> </SellerRoute>
      },
      {
        path: "/dashboard/payment/:id",
        loader: async ({ params }) =>
          fetch(`https://betacom-server-cristain333.vercel.app/bookings/${params.id}`),
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/add/product",
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path:'/dashboard/sellers',
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
      },
      {
        path:'/dashboard/buyers',
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>

      },
      {
        path:'/dashboard/reports',
        element:<AdminRoute> <Reports></Reports></AdminRoute>

      }
    ],
  },
  {
    path:'*',
    element: <ErrorPage></ErrorPage>
  }
]);
export default router;
