//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from "react-router-dom";
import axios from 'axios';
//import App from './src/App.js';

//axios.defaults.baseURL =  "http://localhost:8000"; 
axios.defaults.baseURL =  "https://app-project-jczo.onrender.com";
basenameURL = "https://my-app-4bad.onrender.com";

const App1 = () => {	
	
	return (
		<>		
			<h1> Hello world from App1 .....</h1>
			
		</>
	);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
		<BrowserRouter basename=basenameURL >					
			<App />				
		</BrowserRouter>
    
	);
