import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const UserInsert = ( props ) => {
	
	const { token } = useContext(Context);	
	const [fullname, setFullName] = useState("");
	const [username, setUserName] = useState("");
	const [useremail, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [password1, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	
	const registerUser = () => {
		 
		if (username != "" && password1 != "" &&  password2 == password2) { 
			axios({
				method: 'post',
				url: '/create_user/',
				data: {
					full_name: fullname,
					username: username,
					email: useremail,				
					role: role,
					disable: true,
					hashed_password: password1
				}
			}).then(response => {
				if (response.status === 201) {
					console.log("Registration Successful, you can now login", response.data);
					alert({'Registration Successful': username});
				}else {
					console.log("Registration Failed, please try again");
					alert({'Registration Failed, please try again': username});
				}
			}).catch((error) => {
				console.log(error)
				alert({'Something happend with server': username});
			});	
		}else{
			alert("Something goes rong with password or user name...")
		}
		
	 }
	
	const handleSubmit = (event) => {
		event.preventDefault();
		registerUser();		
	}
	 
	return (     
		<form className="form" onSubmit={handleSubmit}>
		
			<label>User Full Name</label>
			<input
			  type="text"
			  value={fullname}
			  onChange={(e) => setFullName(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Enter name (e.g: Peter Crouch)"
			/>	
			
			<label>User name</label>
			<input
			  type="text"
			  value={username}
			  onChange={(e) => setUserName(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Enter nickname (e.g: peter87)"
			/>	
			
			<label>Email address</label>
			<input
			  type="email"
			  value={useremail}
			  onChange={(e) => setEmail(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Enter email (e.g peter@gmail.com)"
			/>		
			
			<label>User role</label>
			<input
			  type="text"
			  value={role}
			  onChange={(e) => setRole(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Enter a role (e.g: admin, manager or user)"
			/>		
			
			<label>Password</label>
			<input
			  type="password"
			  value={password1}
			  onChange={(e) => setPassword(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Enter password"
			/>		
			
			<label>Confirm Password</label>
			<input
			  type="password"
			  value={password2}
			  onChange={(e) => setPassword2(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Re-enter password"
			/>				
			<div className="d-grid gap-2 mt-3">
				<button type="submit" className="btn btn-primary"> CREATE USER </button>
			</div>
			
		</form>		
		
	);
}



export default UserInsert;