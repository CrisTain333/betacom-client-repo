import React, { useEffect, useState } from "react";
import AuthContext from './Context';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const UserContext = ({children}) => {
  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const singInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const singOutUser = () => {
      localStorage.removeItem('authToken')
      setLoading(true);
      signOut(auth)
        .then(() => {})
        .catch((error) => {});
    };
  
    const updateUser = (name,photo) => {
     return  updateProfile(auth.currentUser, {
        displayName: name,photoURL: photo
      })
    };

    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, provider);
    };
    
  
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (userinfo) => {
        setUser(userinfo);
        setLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, []);


    
    return (
        <AuthContext.Provider value={{
            createUser,
            googleLogin,
            updateUser,
            user,
            singOutUser,
            singInUser,
            setUser,
            loading,
          }}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;