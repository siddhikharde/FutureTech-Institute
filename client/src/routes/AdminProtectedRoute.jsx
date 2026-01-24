import { Navigate, Outlet } from "react-router";
import { isTokenExpired } from "../Utils";
import React from 'react'

function AdminProtectedRoute() {
    const token=localStorage.getItem("JwtToken");
    const user=JSON.parse(localStorage.getItem("UserData"));
    if(!token || isTokenExpired(token)){
        localStorage.clear();
        return <Navigate to="/login" replace/>
    }

     if(user?.role !== "admin"){
        return <Navigate to="/" replace/>
     }

     return <Outlet/>
}

export default AdminProtectedRoute
