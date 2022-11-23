import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Category from "../Page/Category/Category";
import Home from "../Page/Home/Home";

const router =  createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/Category/:id',
                element: <Category></Category>

            }
        ]
    }

])
export default router;