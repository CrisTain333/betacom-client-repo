import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Category from "../Page/Category/Category";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import SingUp from "../Page/Login/SingUp";
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
]);
export default router;
