
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {

  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)

  const [isLoading, setIsLoding] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Enter valid email'),
    password: Yup.string().required('password is required').matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'Enter valid password'),
  })

  const formik = useFormik({
    initialValues: {
      "email": "",
      "password": "",
    },
    onSubmit: register,
    validationSchema: validationSchema

  })

  function register() {
    setIsLoding(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formik.values)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        setIsUserLoggedIn(true);
        setIsLoding(false);
        setErrMessage('');

        if (location.pathname == '/login') {
          navigate('/');
        } else {
          navigate(location.pathname);
        }
      }).catch((error) => {
        console.log(error.response.data.message);
        setErrMessage(error.response.data.message)
        setIsLoding(false)
      })
  }
  console.log(formik.errors);

  return (
    <>
      <Helmet>
        <title>FreshCart - login</title>
      </Helmet>
      <div className=" px-16 my-12">
        <h1 className=' font-bold text-2xl'>Login</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12">
            <div className="">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Email : </label>
                  <div className="mt-2">
                    <input
                      type="email" name="email" id="email" autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset
                       ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300
                        sm:text-sm sm:leading-6 px-3"
                    />
                    {formik.errors.email && formik.touched.email && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{formik.errors.email}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password :</label>
                  <div className="mt-2">
                    <input
                      type="password" name="password" id="password" autoComplete="given password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                       ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300
                        sm:text-sm sm:leading-6 px-3"
                    />
                    {formik.errors.password && formik.touched.password && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{formik.errors.password}</p>}

                  </div>
                </div>
              </div>
            </div>
          </div>

          {errMessage && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{errMessage}</p>}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit" disabled={isLoading}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              {isLoading ? <i className='fas fa-spinner fa-spin mx-2'></i> : <span>Login</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

