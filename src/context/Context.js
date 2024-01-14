// Context.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';
import { useLocalStorage } from "./useLocalStorage";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
	
	const navigate = useNavigate();
	const location = useLocation();
	
	const [token, setToken] = useLocalStorage("token", "");
	const [user, setUser] = useLocalStorage("user", {});
	const [isAdmin, setIsAdmin] = useLocalStorage("admin", false);
	const [isLoggedIn, setIsLoggedIn] = useLocalStorage("logged", false);
	const [projects, setProjects] = useState([]);
	const [projectlabors, setProjectLabors] = useState([]);
	const [selectedproject, setSelectedProject] = useState({});
	const [selectedlabor, setSelectedLabor] = useState({});
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
			//console.log(role);
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
				handleRole(response.data.role);
				console.log({"Response user from context": response.data.role});
			}else {	
				console.log("Registration Failed from context, please try again");
				alert("Conextion failed from context, redirect to login page");	
				navigate('/');		
			}
		}).catch((error) => {
			console.log("Registration Failed from context, some error happend with server, please try again");
			alert("Conextion failed from context, redirect to login page");	
			navigate('/');	
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
