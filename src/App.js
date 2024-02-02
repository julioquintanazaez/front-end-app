import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { ContextProvider, Context } from './context/Context';
import { ProtectedRoute } from './context/ProtectedRoute';

import Login from './auth/Login.js';
import MainDashboard from './pages/Dashboard.js';
import About from './pages/About.js';
import Admin from './pages/Admin.js';
import Manager from './pages/Manager.js';
import Projects from './pages/Projects.js';



const App = () => {	
	
	
	/*
	<Route element={<ProtectedRoute isAllowed={ isLoggedIn && isAdmin } />}>
		<Route path="/dashboard" element={<MainDashboard />} />
	</Route>
	*/
	return (
		<>		
			<ContextProvider>				
				<Routes>
					<Route index element={<Login />} />
					<Route path="/" element={<Login />} />								
					<Route path="/manager" element={<Manager />} />
					<Route path="/projects" element={<Projects />} />	
					<Route path="/admin" element={<Admin />} />					
					<Route path="/about" element={<About />} />
					<Route path="*" element={<p>There's nothing here: 404!</p>} />
				</Routes>				
			</ContextProvider>				
		</>
	);
}

export default App;