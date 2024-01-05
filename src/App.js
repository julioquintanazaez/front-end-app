//https://www.robinwieruch.de/react-router-private-routes/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { ContextProvider, Context } from './context/Context';
import { ProtectedRoute } from './context/ProtectedRoute';

import axios from 'axios';

import Login from './auth/Login.js';
import ResetPassword from './auth/ResetPassword.js';
import MainDashboard from './pages/Dashboard.js';
import About from './pages/About.js';
import Projects from './pages/Projects.js';
import Labors from './pages/Labors.js';
import Tasks from './pages/Tasks.js';
import Equipments from './pages/Equipments.js';
import Materials from './pages/Materials.js';
import NoPage from './pages/NoPage.js';
import Admin from './pages/Admin.js';
import Manager from './pages/Manager.js';

const App = () => {
	
	const [token, setToken] = useState("");
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	const user_logged = { id: '1', name: 'julio', role: 'admin' };	
	//&& user_logged.role.includes('admin')
	/*
	<Route element={<ProtectedRoute isAllowed={ isLoggedIn } />}>
		<Route path="/dashboard" element={<MainDashboard />} />
	</Route>
	*/
	return (
		<>		
			<ContextProvider>				
				<Routes>
					<Route index element={<Login />} />
					<Route path="/" element={<Login />} />					
					<Route path="/dashboard" element={<MainDashboard />} />						
					<Route path="/manager" element={<Manager />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/labors" element={<Labors />} />
					<Route path="/tasks" element={<Tasks />} />					
					<Route path="/equipments" element={<Equipments />} />
					<Route path="/materials" element={<Materials />} />				
					<Route path="/admin" element={<Admin />} />					
					<Route path="/about" element={<About />} />
					<Route path="*" element={<p>There's nothing here: 404!</p>} />
				</Routes>				
			</ContextProvider>		
		</>
	);
}

export default App