import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';

//Pages
import ResetPassword from './../auth/ResetPassword.js';
import Dashboard from './../pages/Dashboard.js';
import About from './../pages/About.js';
import Projects from './../pages/Projects.js';
import Labors from './../pages/Labors.js';
import Tasks from './../pages/Tasks.js';
import Equipments from './../pages/Equipments.js';
import Materials from './../pages/Materials.js';

//Components
import Navigation from './../components/MainNavbar.js'; //<Navigation />


const MainDashboard = () => {
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn } = useContext(Context);
	const navigate = useNavigate();
	
	//Esto hay que sustituirlo por un Fetch y useEffect conecting the API
	//Si no se puede autenticar se va al Login de lo contrario actualiza la variable del contexto
	//URL: e.g: https://copyprogramming.com/howto/javascript-react-js-login-context-localstorage-code-example
	
	const flag = isLoggedIn ? "SI" : "NO";
	
	const signOut = () => {
		setToken("");
		setUser({});
		setIsLoggedIn(false)
		navigate("/");
	};
	
	return (
	
		<div className="container-fluid-md">			
			<div className="row">
			
				<div className="col-sm">											
					<Navigation />											
				</div>
				
				<div className="col-sm-10">	
				
					<div className="row">
						<div className="col-sm-10"><br/>
							<div>
								<button onClick={signOut}>sign out</button>
							</div>
							<p className="h2">Dashboard {token} {flag}</p>
						</div>								
					</div> 

					<div className="row">
						<div className="col-sm-10"><br/>							
							<div className="container-fluid"> 

								<div className="row">

									<div className="col">
										<div className="card">
											<div className="card-header">Projects Tasks</div>
											<div className="card-body">
												<h5 className="card-title">Special title treatment</h5>
												<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
												<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
											</div>
										</div>
									</div>

									<div className="col-sm">
										<div className="card bg-success text-white">
											<div className="card-header">Projects Equipments</div>
											<div className="card-body">
												<h5 className="card-title">Special title treatment</h5>
												<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
												<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
											</div>
										</div>
									</div>

									<div className="col-sm">
										<div className="card bg-primary text-white">
											<div className="card-header">Projects Materials</div>
											<div className="card-body">
												<h5 className="card-title">Special title treatment</h5>
												<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
												<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
											</div>
										</div>
									</div>		

								</div>						
															
							</div>	
						</div>	
					</div> 
					
					<div className="row">						
						<div className="col-sm-10"><br/>							
							<div className="container-fluid"> 								
								<p className="h2">Projects</p>	
								
								
								
								
							</div><br/>
						</div>								
					</div> 
					
					<div className="row bg-info">
						<div className="col-sm-10">
							<p className="h2">Charts & Statistics</p>
						</div>								
					</div> 
					
				</div>
				
			</div> 
			<div className="row bg-success">
				<div className="col-sm-12">Footer (.col-sm-12)</div>				
			</div> 
			
		</div>
	);
  
}

export default MainDashboard;
