import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashboardLayout/DashBoardLayout";
import MainLayout from "../Layout/MainLayout";
import Category from "../Page/Category/Category";
import AddProduct from "../Page/Dashboard/Add Product/AddProduct";
import AllUsers from "../Page/Dashboard/All Users/AllUsers";
import MyOrders from "../Page/Dashboard/My Orders/MyOrders";
import MyProducts from "../Page/Dashboard/My Products/MyProducts";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import SingUp from "../Page/Login/SingUp";
import Payment from "../Page/Payment/Payment";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/category/${params.id}`),
        element: <PrivateRoute><Category></Category> </PrivateRoute>,
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path:'/singup',
        element: <SingUp></SingUp>

      }
    ],
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[
      {
        path :'/dashboard',
        element:<MyOrders></MyOrders>
      },
      {
        path:'/dashboard/users',
        element: <AllUsers></AllUsers>
      },
      {
        path:'/dashboard/my/products',
        element: <MyProducts></MyProducts>
      },
      {
        path:'/dashboard/payment/:id',
        loader: async({params})=> fetch(`http://localhost:5000/bookings/${params.id}`),
        element: <Payment></Payment>

      },{
        path:'/dashboard/add/product',
        element : <AddProduct></AddProduct>
      }
    ]

  }
]);
export default router;
