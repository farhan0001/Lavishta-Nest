import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = ({ isAdmin, element}) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user)
    if (loading)
        return <Loader />;
    if (isAuthenticated === false) {
        return <Navigate to='/login' />;
    }
    if(!user.role)
        return <Loader />
    if(isAdmin === true && user.role !== "admin"){
        return <Navigate to='/login' />
    }
    return element;
}

export default ProtectedRoute