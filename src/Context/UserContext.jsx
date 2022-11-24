import React from 'react';
import AuthContext from './Context';

const UserContext = ({children}) => {



    
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;