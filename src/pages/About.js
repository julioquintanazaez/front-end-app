import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';
import Navigation from './../components/MainNavbar.js'; 

const Contact = () => {
	
	const { setToken, setUser, token } = useContext(Context);
	const navigate = useNavigate();
	
	return (
		<div>
			<div className="container-fluid-md">			
				<div className="row">				
					<div className="col-sm">
					
						<Navigation />	
											
					</div>
				</div>
			</div>			
		</div>
	);
}

export default Contact
