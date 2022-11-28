import React, { useContext } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Context/Context';
import useSellerAccount from '../hooks/useSellerAccount';

const SellerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isSellerAccount,isSellerAccountLoading] = useSellerAccount(user?.email);


    const location = useLocation();
    if (loading || isSellerAccountLoading) {
        return <div className="h-1/2 w-full flex justify-center items-center mt-20">
        <ThreeCircles
                          height="150"
                          width="150"
                          color="#f82c38"
                          wrapperStyle={{}}
                          wrapperclassName=""
                          visible={true}
                          ariaLabel="three-circles-rotating"
                          outerCircleColor=""
                          innerCircleColor=""
                          middleCircleColor=""
                        />
      </div>
    }

    if (user && isSellerAccount) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;