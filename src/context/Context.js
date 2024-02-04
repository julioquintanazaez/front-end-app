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
		setIsAdmin(false);
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
				console.log(response.data);
				setUser(response.data);	
				setIsLoggedIn(true);
				handleRole(response.data.role);
				console.log("Update data from current user");
				setMessages("User logged-in successfully" + Math.random());				
			}else {	
				console.log("Registration Failed from context, please try again");				
				handleLogout();		
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});			
	}
	 
	//!!user && user.roles.includes('admin')
	const handleRole = (role) => {	
		if (role.includes('admin')){
			setIsAdmin(true);				
		}	
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
							messages, setMessages
						 }}>
			{children}
		</Context.Provider>
	);
};
