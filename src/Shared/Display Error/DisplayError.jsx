import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import AuthContext from '../../Context/Context';
import UserContext from '../../Context/UserContext';
import errorImage from '../../image/funny-404-design-with-cyclist-falling-from-bicycle_556049-34.webp'

const DisplayError = () => {
    const {singOutUser} =useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        singOutUser()
      
                navigate('/login');
            
    }

    return (
        <div className='text-center w-3/4 mx-auto'>
        <img src={errorImage} className='h-96' alt="" />
            <h4 className="text-3xl"> Please <button onClick={handleLogOut} className='btn btn-primary text-white'>Sign out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;