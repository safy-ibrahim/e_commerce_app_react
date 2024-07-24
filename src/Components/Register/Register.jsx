
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Register() {

  const [isLoading, setIsLoding] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name min length is 3').max(20, 'Name length must be less than 20 characters or equil').required('Name is required'),
    email: Yup.string().required('Email is required').matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Enter valid email'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter valid number'),
    password: Yup.string().required('password is required').matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'Enter valid password') ,
    rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'password and rePassword must be matched')
  })

  const formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    },
    onSubmit: register,
    validationSchema: validationSchema
  })

  function register() {
    setIsLoding(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values)
    .then((response) => {

      setIsLoding(false);
      setErrMessage('');
      navigate('/login');
    }).catch((error) => {

      setErrMessage(error.response.data.message)
      setIsLoding(false)
    })
  }


  console.log(formik.errors);
  return (
    <>
      <Helmet>
        <title>FreshCart - register</title>
      </Helmet>
      <div className=" px-16 my-12">
        <h1 className=' font-bold text-2xl'>Register Now</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12">
            <div className="">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name :</label>
                  <div className="mt-2">
                    <input
                      type="text" name="name" id="name" autoComplete="given name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                       ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300
                        sm:text-sm sm:leading-6 px-3"
                    />

                    {formik.errors.name && formik.touched.name && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{formik.errors.name}</p>}
                  </div>
                </div>

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

                <div className="col-span-full">
                  <label htmlFor="re-password" className="block text-sm font-medium leading-6 text-gray-900">Re-password : </label>
                  <div className="mt-2">
                    <input
                      type="password" name="rePassword" id="re-password" autoComplete="given password"
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                       ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300
                        sm:text-sm sm:leading-6 px-3"
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{formik.errors.rePassword}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="phone-num" className="block text-sm font-medium leading-6 text-gray-900">Phone : </label>
                  <div className="mt-2">
                    <input
                      type="tel" name="phone" id="phone-num" autoComplete="given phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset
                       ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300
                        sm:text-sm sm:leading-6 px-3"
                    />
                    {formik.errors.phone && formik.touched.phone && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{formik.errors.phone}</p>}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {errMessage && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{errMessage}</p>}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit" disabled = {isLoading}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              {isLoading ? <i className='fas fa-spinner fa-spin mx-2'></i> : <span>Register Now</span> } 
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
