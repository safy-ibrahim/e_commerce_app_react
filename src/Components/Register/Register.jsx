import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";

export default function Register() {
  const [apiError, setApiError] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  const navigateFun = useNavigate();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name length must be 3 charcters or more")
      .max(25, "name length must be less than 25")
      .required("Your name is required"),
    email: Yup.string()
      .required("Your email is required")
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Enter valied email"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter valid number"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, "Enter valid password"),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "password and rePassword must be matched"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    validationSchema: validationSchema,
  });

  // -------------------------------- register function
  function register() {
    setIsLoding(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formik.values)
      .then((response) => {
        if (response?.data?.message === "success") {
          localStorage.setItem("token", response.data.token);
          setIsLoding(false);
          setIsUserLoggedIn(true);
          setApiError("");
          navigateFun("/login");
        }
      })
      .catch((response) => {
        setIsLoding(false);
        setApiError(response?.response?.data?.message);
      });
  }

  return (
    <>
      <div className="my-5  flex justify-center w-full">
        <div className="w-full px-8 py-4 hover:bg-gray-100 hover:rounded-sm max-w-lg">
          {apiError && (
            <p className=" bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm">
              {apiError}
            </p>
          )}
          <h1 className=" text-2xl font-bold text-green-600">Register Now: </h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4 mx-auto">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className=" col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name :
                  </label>
                  <div className="mt-2 w-full">
                    <input
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="name"
                      type="text"
                      name="name"
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.name && formik.touched.name && (
                      <p className=" bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                </div>

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

                <div className="col-span-6">
                  <label
                    htmlFor="rePassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Re-Password :
                  </label>
                  <div className="mt-2">
                    <input
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="rePassword"
                      type="password"
                      name="rePassword"
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && (
                      <p className=" bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm">
                        {formik.errors.rePassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone number :
                  </label>
                  <div className="mt-2">
                    <input
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="phone"
                      name="phone"
                      type="tel"
                      className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <p className=" bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-green-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                {isLoding ? (
                  <i className="fas fa-spinner fa-spin mx-2"></i>
                ) : (
                  <span>Register Now</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
