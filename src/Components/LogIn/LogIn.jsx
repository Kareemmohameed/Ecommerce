import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const [isSuccess, setIsSuccess]=useState(false);
    let {setToken}=useContext(AuthContext)
    useEffect(()=>{},[])
    let navigate=useNavigate();
   async function handelLogin(values){
     let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
     .then((res)=>{
      setToken(res.data.token)
      localStorage.setItem('token',res.data.token)
      navigate('/')
     })
    
 
     console.log('Login')
     console.log(data)
    }
    let validationSchema=Yup.object().shape({
      email:Yup.string().email('Email is Invalid').required('Email is Required'),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'Password starts with capital letter and min lenght 6 ').required('Password is Required'),
    })

    const formik= useFormik(
      {
        initialValues:{
          email:'',
          password:'',
        },
        validationSchema
        ,
        onSubmit:handelLogin
      }
    )
  return<>
  <form className="max-w-xl mx-auto py-5 h-screen" onSubmit={formik.handleSubmit}>
  <h1 className="text-green-700 text-3xl font-bold text-center">Login Now</h1>
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="email"
      value={formik.values.email}
      id="email"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                 border-0 border-b-2 border-gray-300 appearance-none 
                 focus:outline-none focus:ring-0 focus:border-green-700 peer"
      placeholder=" " required
    />
    {formik.touched.email && formik.errors.email && (
  <div className="text-red-500 text-sm">{formik.errors.email}</div>
)}
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-green-700 peer-placeholder-shown:scale-100 
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">
      Email address
    </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="password"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="password"
      value={formik.values.password}
      id="password"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                 border-0 border-b-2 border-gray-300 appearance-none 
                 focus:outline-none focus:ring-0 focus:border-green-700 peer"
      placeholder=" " required
    />
    {formik.touched.password && formik.errors.password && (
  <div className="text-red-500 text-sm">{formik.errors.password}</div>
)}
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-green-700 peer-placeholder-shown:scale-100 
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">
      Password
    </label>
  </div>

 <h3
        className="text-green-600 cursor-pointer hover:underline mb-3 font-bold"
        onClick={() => navigate("/ForgetPassword")}
      >
        Forget My Password
      </h3>  

  <button
    type="submit"
    className="cursor-pointer text-white bg-green-700 hover:bg-green-800 
               focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
               rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
  >
    Log In
  </button>
</form>

  
    </>
  
}
