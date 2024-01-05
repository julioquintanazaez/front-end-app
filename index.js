//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from "react-router-dom";
import axios from 'axios';
//import App from './src/App.js';

//axios.defaults.baseURL =  "http://localhost:8000"; 
axios.defaults.baseURL =  "https://app-project-jczo.onrender.com";

const App1 = () => {
	
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
			<h1> Hello world from App1 .....</h1>
			
		</>
	);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
	
        <BrowserRouter>
            <App1 />			
        </BrowserRouter>
    
	);
