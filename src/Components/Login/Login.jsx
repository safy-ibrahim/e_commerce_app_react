import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { Axios } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, "Enter valid password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: register,
    validationSchema: validationSchema,
  });

  function register() {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formik.values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setIsUserLoggedIn(true);
        setIsLoading(false);
        setErrMessage("");

        if (location.pathname == "/login") {
          navigate("/");
        } else {
          navigate(location.pathname);
        }
      })
      .catch((error) => {
        setErrMessage(error.response.data.message);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>FreshCart - login</title>
      </Helmet>
      <div className="my-5  flex justify-center w-full">
        <div className="w-full max-w-lg px-8 py-4 hover:bg-gray-100 hover:rounded-sm ">
          {errMessage && (
            <p className=" bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm">
              {errMessage}
            </p>
          )}
          <h1 className=" text-2xl font-bold text-green-600">Login Now: </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4 mx-auto">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address:
                  </label>
                  <div className="mt-2">
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="email"
                      name="email"
                      type="email "
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className=" bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password :
                  </label>
                  <div className="mt-2">
                    <input
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                      id="password"
                      type="password"
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <p className=" bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-1 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-green-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin mx-2"></i>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
            <p>
              Did’nt have acount yet ?{" "}
              <span className="text-blue-600">
                <Link to={"/register"}>Register Now</Link>{" "}
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
