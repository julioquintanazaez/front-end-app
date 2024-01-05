// Context.js
import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
	
	const [token, setToken] = useState("");
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);	
	
	/*
	const handleLogin = async () => {
		const token = await fakeAuth();
		setToken(token);
	};
	*/
	
	//Here, also, we can insert a logging proccess instead a Logging page
	const handleLogout = () => {
		setToken(null);
	};	
	
	//useEffect to fetch the current user, if the proccess goes rong clean the token and redirect ro login
	const handleGetCurrentUser = async () => {
		//const actual_user = await fakeAuth();
		setUser({ id: '1', name: 'julio', role: 'admin' });
	};	
	
	const handleCleanCurrentUser = () => {
		setToken({});
		navigate('/');
	};
	
	return (
		<Context.Provider value={{
							token, setToken,
							user, setUser,
							isLoggedIn, setIsLoggedIn
						 }}>
			{children}
		</Context.Provider>
	);
};
