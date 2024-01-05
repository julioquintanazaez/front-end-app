import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Context } from './../context/Context';

const Navigation = () => {
	
	const { onLogout } = useContext(Context);
	const { token } = useContext(Context);
	
	return (
		
		<div className="sidebar">						
			<nav>		
				<NavLink to="/"> Home </NavLink>
				<NavLink to="/dashboard"> Dashboard </NavLink>
				<NavLink to="/manager"> Manager </NavLink>
				<NavLink to="/projects"> Projects </NavLink>
				<NavLink to="/labors"> Labors </NavLink>
				<NavLink to="/tasks"> Tasks </NavLink>
				<NavLink to="/equipments"> Equipments </NavLink>
				<NavLink to="/materials"> Materials </NavLink>				
				<NavLink to="/admin"> Admin </NavLink>	
				<NavLink to="/about"> About </NavLink>	
			</nav>									
		</div>					
				
	);
}

export default Navigation