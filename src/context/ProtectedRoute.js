import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Context } from './../context/Context';
import { Navigate, useNavigate, useLocation, Outlet } from 'react-router-dom';


export const ProtectedRoute = ({  
								isAllowed,
								redirectPath = '/',
								children, }) => {
	
	const location = useLocation();	
	
	console.log({IsAllowed: isAllowed});

	if (!isAllowed) {
		return (
			<Navigate to={ redirectPath } replace state={{ from: location }} />
		);
	}
	
	return children ? children : <Outlet />;
};
