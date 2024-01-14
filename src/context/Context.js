// Context.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
	
	const navigate = useNavigate();
	const location = useLocation();
	
	const [token, setToken] = useState("");
	const [tokentype, setTokenType] = useState("");
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [projects, setProjects] = useState([]);
	const [projectlabors, setProjectLabors] = useState([]);
	const [selectedproject, setSelectedProject] = useState({});
	const [selectedlabor, setSelectedLabor] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [controlUpdates, setControlUpdates] = useState(false);
	
	const handleLogout = () => {
		setToken("");
		setUser({});
		setIsLoggedIn(false);
		setProjects([]);
		setProjectLabors([]);
		setSelectedProject({});
		setSelectedLabor({});
		navigate('/');
	}
	
	const handleControlUpdate = () => {			
		return controlUpdates ? false : true;
	}
	
	const handleRole = (role) => {	
		let res = false;
		role.forEach(function(role, index){
			console.log(role);
			if (role == "admin"){
				setIsAdmin(true);				
			}						
		});	
		return res;
	}
	
	//useEffect to fetch the current user, if the proccess goes rong clean the token and redirect ro login
	const handleGetCurrentUser = async () => {
		await axios({
			method: 'get',
			url: '/get_user_status/',                         
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 200) {
				console.log("Authentication successfully");
				setUser(response.data);
				console.log({"Response user from context": response.data.role});
				handleRole(response.data.role);
				//console.log({"Response user role from context": isAdmin});
			}else {	
				console.log("Registration Failed from context, please try again");
				alert("Conextion failed from context, redirect to login page");	
				handleLogout();			
			}
		}).catch((error) => {
			console.log("Registration Failed from context, some error happend with server, please try again");
			alert("Conextion failed from context, redirect to login page");	
			handleLogout();			
		});			
	}	
	
	const handleCleanCurrentUser = () => {
		handleLogout();
	}
	
	return (
		<Context.Provider value={{
							token, setToken,
							user, setUser,
							isLoggedIn, setIsLoggedIn,
							projects, setProjects,
							selectedproject, setSelectedProject,
							projectlabors, setProjectLabors,
							selectedlabor, setSelectedLabor,
							handleGetCurrentUser, handleCleanCurrentUser,
							handleLogout, isAdmin,
							controlUpdates, setControlUpdates, handleControlUpdate
						 }}>
			{children}
		</Context.Provider>
	);
};
