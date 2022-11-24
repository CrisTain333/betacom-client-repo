import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Context";
import googlelogo from "../../image/ggl.png";
import brandLogo from '../../image/nav.png'

const Login = () => {
    const [error,setError]=useState('');
    const {singInUser , googleLogin} = useContext(AuthContext);
    let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
    console.log(singInUser)
    const handleLogin = (e)=>{
        e.preventDefault()
        const form = e.target;
        const email =  form.email.value;
        const password = form.password.value;
        singInUser(email,password)
        .then(result => {
            navigate(from, { replace: true });
        })
        .catch(err =>{
            setError(err.message)
        })
    }

    const handleGoogleLogin = () =>{
        googleLogin()
        .then(result=>{
            navigate(from, { replace: true });
        })
        .catch(err =>{
            setError(err.message)
        })
    }


  return (
    <div>
      <section class="">
        <div class=" items-center px-5 lg:px-20">
          <div class="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div class="">
              <div class="">
                <span className="flex justify-center items-center  w-full text-xl uppercase font-bold mb-4 text-center">
                  <img src={brandLogo} alt="brandImage" className="w-8 mr-2" />
                  Login
                </span>
                <form onSubmit={handleLogin} class="space-y-6">
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div class="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required=""
                        placeholder="Your Email"
                        class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label
                      for="password"
                      class="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <div class="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required=""
                        placeholder="Your Password"
                        class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="text-sm">
                      <Link
                        href="#"
                        class="font-medium text-blue-600 hover:text-blue-500"
                      >
                        {" "}
                        Forgot your password?{" "}
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-primary rounded-xl"
                    >
                      Login
                    </button>
                    <p className="text-red-500">{error}</p>
                  </div>
                </form>
                <div class="relative my-4">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 text-neutral-600 bg-white">
                      {" "}
                      Or continue with{" "}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={handleGoogleLogin}
                  >
                    <div class="flex items-center justify-center">
                      <img src={googlelogo} className="h-10" alt="" />
                      <span class="ml-4"> Log in with Google</span>
                    </div>
                  </button>
                </div>
              </div>
             
              <p className="text-center mt-5">New To Website <Link to='/singup' className="text-red underline text-primary">
                    Create Account
              </Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
