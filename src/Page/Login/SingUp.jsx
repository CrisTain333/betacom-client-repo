import axios from "axios";
import React, { useContext, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Context";
import googlelogo from "../../image/ggl.png";
import brandLogo from "../../image/nav.png";

const SingUp = () => {
  const [error, setError] = useState("");
  const [isLoadin, setIsLoading] = useState(false);
  const { createUser, googleLogin, updateUser } = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const handleAccountCreate = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const accountType = form.accountType.value;
    const password = form.password.value;
    if (password.length < 6) {
      setError("Password Must Be > 6");
      return;
    }
    if (password === "123456") {
      setError("Very Week Password");
      return;
    }

    setIsLoading(true);
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const userEmail = {
          email: user.email,
        };

        const usersInfo = {
          email: user.email,
          name,
          accountType,
          isVerifyed: false,
        };
        updateUser(name)
          .then((res) => {
            // axios POST request
            const options = {
              url: "http://localhost:5000/users",
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: usersInfo,
            };

            axios(options).then((response) => {
              if (response.data.acknowledged){
                const options = {
                  url: "http://localhost:5000/jwt",
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                  data: userEmail,
                };
                axios(options).then((response) => {
                  if (response.status === 200) {
                    const token = response.data;
                    localStorage.setItem("authToken", token);
                    setIsLoading(false);
                    navigate(from, { replace: true });
                  }
                });
              }
            });
          })
          .catch((err) => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const userEmail = {
          email: user.email,
        };

        const usersInfo = {
          email: user.email,
          name : user.displayName,
          accountType:'normalUser',
          isVerifyed: false,
        };

        const options = {
          url: "http://localhost:5000/users",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: usersInfo,
        };

        axios(options).then((response) => {
          if (response){
            const options = {
              url: "http://localhost:5000/jwt",
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: userEmail,
            };
            axios(options).then((response) => {
              if (response.status === 200) {
                const token = response.data;
                localStorage.setItem("authToken", token);
                setIsLoading(false);
                navigate(from, { replace: true });
              }
            });
          }
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <section className="">
        <div className=" items-center px-5 lg:px-20">
          <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div className="">
              <div className="">
                <span className="flex justify-center items-center  w-full text-xl uppercase font-bold mb-4 text-center">
                  <img src={brandLogo} alt="brandImage" className="w-8 mr-2" />
                  Login
                </span>
                <form onSubmit={handleAccountCreate} className="">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Name{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        required
                        placeholder="Your Name"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Your Email"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required=""
                        placeholder="Your Password"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-neutral-600"
                    >
                      {" "}
                      Account Type{" "}
                    </label>
                    <select
                      required
                      name="accountType"
                      className="select select-bordered py-3 w-full max-w-xs"
                    >
                      <option value="normalUser" className="p-5">
                        Normal User
                      </option>
                      <option value="sellerAccount">Seller Account</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-red-500 text-lg">{error}</p>
                    </div>
                  </div>

                  <div className="py-5">
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-primary rounded-xl"
                    >
                      {isLoadin ? (
                        <ThreeCircles
                          height="50"
                          width="50"
                          color="#ffffff"
                          wrapperStyle={{}}
                          wrapperclassName=""
                          visible={true}
                          ariaLabel="three-circles-rotating"
                          outerCircleColor=""
                          innerCircleColor=""
                          middleCircleColor=""
                        />
                      ) : (
                        "Sing Up"
                      )}
                    </button>
                  </div>
                </form>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-neutral-600 bg-white">
                      {" "}
                      Or continue with{" "}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={handleGoogleLogin}
                  >
                    <div className="flex items-center justify-center">
                      <img src={googlelogo} className="h-10" alt="" />
                      <span className="ml-4"> Log in with Google</span>
                    </div>
                  </button>
                </div>
              </div>
              <p className="text-center mt-5">
                All Ready Have A Account{" "}
                <Link to="/login" className="text-red underline text-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingUp;
