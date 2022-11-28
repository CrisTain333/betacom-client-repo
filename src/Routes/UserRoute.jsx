import React, { useContext } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Context/Context';
import useNormalUser from '../hooks/useNormalUser';

const UserRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [NormalUser, isNormalUserLoading] = useNormalUser(user?.email);
    const location = useLocation();

    if (loading || isNormalUserLoading) {
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

    if (user && NormalUser) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default UserRoute;