import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Context } from './../context/Context';

const Navigation = () => {
	
	const { handleLogout } = useContext(Context);
	const { token } = useContext(Context);
	
	const logoutUser = () => {
		
	}
	
	return (
		
		<div className="sidebar">						
			<nav>		
				<NavLink to="/"> Home </NavLink>
				<NavLink to="/dashboard"> Dashboard </NavLink>
				<NavLink to="/manager"> Manager </NavLink>								
				<NavLink to="/admin"> Admin </NavLink>	
				<NavLink to="/about"> About </NavLink>	
			</nav>
			<button 
				type="button" 
				className="btn btn-sm btn-secondary" 							
				onClick={(e) => logoutUser()}> 
					LogOut
			</button>
		</div>					
				
	);
}

export default Navigation