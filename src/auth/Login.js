import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useLocation } from "react-router";
import { Context } from './../context/Context';
import axios from 'axios';

function Login () {
	
	const navigate = useNavigate();
	const location = useLocation();

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	
	const { isLoggedIn, setToken, setIsLoggedIn } = useContext(Context);	
	 
	const authenticate_user = async () => {
		 
		const form_data = new FormData();
		form_data.append("username",  username);
		form_data.append("password", password);		
		
		await axios({
			method: 'post',
			url: 'https://app-project-jczo.onrender.com/token/',                         
			data: form_data
		}).then(response => {
			if (response.status === 200) {
				const dataUser = {
					access_token: response.data.access_token,
					token_type: response.data.token_type
				};
				console.log({"Respuesta de autenticacion": username});
				setToken(response.data.access_token);
				setIsLoggedIn(true);
				alert('User ' + username + ' status: logged');
				setUserName("");
				setPassword("");
				const origin = location.state?.from?.pathname || '/dashboard'; //To remember the last page after be bloqueted
				navigate(origin);
			}else {	
				console.log("Registration Failed, please try again");
				setToken("");
				setIsLoggedIn(false);				
				alert("Registration Failed, please try again");	
				navigate("/");				
			}
		}).catch((error) => {
			console.log(error);
			setToken("");
			setIsLoggedIn(false);	
			alert("Some error ocurring with the server");
			navigate("/");
		});		
	};		
	
	const handleSubmit = (event) => {
		event.preventDefault();	
		authenticate_user();			
	}	

	const signOut = () => {
		setToken("");
		setIsLoggedIn(false);
		setUserName("");
		setPassword("");
		navigate("/");
	};
	
	return (  		
		<div className="Auth-form-container">
			<form className="Auth-form" onSubmit={handleSubmit}>
				<div className="Auth-form-content">
					{isLoggedIn ? ( 
					
					<div>
						<p> User logged-in......</p>
						<button className="btn btn-primary" onClick={signOut}>Log-out</button>
					</div>
					
					) : (
					
					<div>
						<h3 className="Auth-form-title">
							Sign In
						</h3>
						<div className="form-group mt-3">
							<label>User name</label>
							<input
							  type="text"
							  value={username}
							  onChange={(e) => setUserName(e.target.value)}
							  className="form-control mt-1"
							  placeholder="User name"
							/>
						</div>
						<div className="form-group mt-3">
							<label>Password</label>
							<input
							  type="password"
							  value={password}
							  onChange={(e) => setPassword(e.target.value)}
							  className="form-control mt-1"
							  placeholder="Enter password"
							/>
						</div>
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary">
									Submit
							</button>					
						</div>
						<p className="forgot-password text-right mt-2">
							Forgot <a href="#">password?</a>
						</p>
					</div>
					
					)}
				</div>					
			</form>				 
		</div>
		
	);
	
}

export default Login