
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UserAddress() {

    let { cartId } = useParams();
    console.log(cartId);
    const [isLoading, setIsLoding] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        details: Yup.string().min(3, 'Name min length is 3').max(20, 'Name length must be less than 20 characters or equil').required('Name is required'),
        city: Yup.string().min(3, 'city min length is 3').max(40).required('City is required'),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter valid number'),
    })

    const formik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": ""
        },
        onSubmit: payNow,
        validationSchema: validationSchema
    })

    function payNow() {
        setIsLoding(true);
        console.log(formik.values);
        checkOut(formik.values);
    }

    async function checkOut(address) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
            "shippingAddress": address
        }, {
            params: {
                url: 'http://localhost:5173'
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setIsLoding(false)
        console.log(data);
        open(data.session.url, '_self');
    }


    return (
        <>
            <div className=" px-16 my-12">
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-12">
                        <div className="">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name :</label>
                                    <div className="mt-2">
                                        <input
                                            type="text" name="details" id="details" autoComplete="given details"
                                            value={formik.values.details}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300
                                               sm:text-sm sm:leading-6 px-3"
                                        />

                                        {formik.errors.details && formik.touched.details && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{formik.errors.details}</p>}
                                    </div>
                                </div>
                                {/* ---------------------------- phone */}
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

                                {/* ------------------------------- city */}
                                <div className="col-span-full">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City :</label>
                                    <div className="mt-2">
                                        <input
                                            type="text" name="city" id="city" autoComplete="given city"
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                             ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300
                                               sm:text-sm sm:leading-6 px-3"
                                        />
                                        {formik.errors.city && formik.touched.city && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{formik.errors.city}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {errMessage && <p className=' bg-red-200 text-red-700 px-3 rounded-md border-0 mt-3 py-3 text-sm'>{errMessage}</p>}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit" disabled={isLoading}
                            className=" block w-1/2 mx-auto rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            {isLoading ? <i className='fas fa-spinner fa-spin mx-2'></i> : <span>Pay Now</span>}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
