// Context.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
	
	const navigate = useNavigate();
	const location = useLocation();
	
	const [token, setToken] = useState(window.localStorage.getItem("PROJECT_APP_TOKEN")); 
	const [user, setUser] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [projects, setProjects] = useState([]);
	const [projectlabors, setProjectLabors] = useState([]);
	const [selectedproject, setSelectedProject] = useState({});
	const [selectedlabor, setSelectedLabor] = useState({});
	const [controlUpdates, setControlUpdates] = useState(false);	
	const [messages, setMessages] = useState("");	
	
	
	const handleLogout = () => {
		setToken("");
		setUser({});
		setIsLoggedIn(false);
		setProjects([]);
		setProjectLabors([]);
		setSelectedProject({});
		setSelectedLabor({});
		window.localStorage.removeItem("PROJECT_APP_TOKEN");
		navigate('/');
	}
	
	useEffect(()=> {
		if (token){	
			try {
				window.localStorage.setItem("PROJECT_APP_TOKEN", token);	
				handleGetCurrentUser();
			}catch(err){}
		}else{
			try {
				window.localStorage.removeItem("PROJECT_APP_TOKEN");
			}catch(err){}
		}
	}, [token]);	
	
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
				setIsLoggedIn(true);
				handleRole(response.data.role);
				console.log({"Response user from context": response.data.role});
				setMessages("User logged-in successfully");
			}else {	
				console.log("Registration Failed from context, please try again");				
				alert("Conextion failed from context something happend with response, redirect to login page");					
				handleLogout();		
			}
		}).catch((error) => {
			console.log("Registration Failed from context, some error happend with server, please try again");			
			alert("Conextion failed from context some thing happend with server, redirect to login page");	
			handleLogout();
		});			
	}
	
	const fetchProjects = async (email) => {				
		await axios({
			method: 'get',
			url: '/read_projects_by_user_email/' + email,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response projects ":response.data});	
				setProjects(response.data);
				console.log({"Load projects from context successfuly ": projects});
			}else {
				console.log("Load from server Failed in nav routing, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur in nav routing": error});
			handleLogout();
		});								
	}	
	
	useEffect(()=> {
		if (isLoggedIn){
			fetchProjects(user.email);
		}
    }, [, messages]);	 

	const handleControlUpdate = () => {			
		return controlUpdates ? false : true;
	}
	
	const handleRole = (role) => {	
		let res = false;
		role.forEach(function(role, index){
			if (role == "admin"){
				setIsAdmin(true);				
			}						
		});	
		return res;
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
							controlUpdates, setControlUpdates, handleControlUpdate,
							messages, setMessages
						 }}>
			{children}
		</Context.Provider>
	);
};
