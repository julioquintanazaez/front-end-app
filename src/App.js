import './App.css';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from './context/Context';
import { ProtectedRoute } from './context/ProtectedRoute';

import Login from './auth/Login.js';
import MainDashboard from './pages/Dashboard.js';
import About from './pages/About.js';
import Admin from './pages/Admin.js';
import Manager from './pages/Manager.js';
import Projects from './pages/Projects.js';


const App = () => {	
	
	const { isLoggedIn, isAdmin } = useContext(Context);
	
	return (
		<div>							
			<Routes>
				<Route index element={<Login />} />
				<Route path="/" element={<Login />} />	
				<Route element={<ProtectedRoute isAllowed={ isLoggedIn } />}>
					<Route path="/manager" element={<Manager />} />
				</Route>
				<Route element={<ProtectedRoute isAllowed={ isLoggedIn && isAdmin } />}>
					<Route path="/projects" element={<Projects />} />
					<Route path="/admin" element={<Admin />} />
				</Route>
				<Route element={<ProtectedRoute isAllowed={ isLoggedIn } />}>
					<Route path="/about" element={<About />} />
				</Route>
				<Route path="*" element={<p>There's nothing here: 404!</p>} />
			</Routes>						
		</div>
	);
}

export default App;