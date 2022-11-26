import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import AuthContext from '../../Context/Context';
import UserContext from '../../Context/UserContext';

const DisplayError = () => {
    const {singOutUser} =UserContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        singOutUser()
            .then(() => {
                navigate('/login');
             })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl"> Please <button onClick={handleLogOut}>Sign out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;