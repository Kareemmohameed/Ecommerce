import React, { useEffect, useState } from 'react'
import Style from './ProdectedRoute.module.css'
import { Navigate } from 'react-router-dom'
export default function ProdectedRoute(props) {
  
  
  if (localStorage.getItem('token')!==null){
    return props.children
    
  }else{
    return <Navigate to="/LogIn" replace />
  }
  
}
