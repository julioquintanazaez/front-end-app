import React, {useState, useEffect} from 'react';
import axios from 'axios';


 function Register (props) {
	 
	 const [fullname, setFullName] = useState("");
	 const [username, setUserName] = useState("");
	 const [email, setEmail] = useState("");
	 const [role, setRole] = useState("");
	 const [password, setPassword] = useState("");
	 const [password2, setPassword2] = useState("");
	 
	 
	 const registerUser = () => {
		 
		axios({
			method: 'post',
			url: '/create_user/',
			data: {
				full_name: fullname,
				username: username,
				email: email,				
				role: role,
				disable: true,
				hashed_password: password
			}
		}).then(response => {
			if (response.status === 200) {
				alert('The name you entered was: ' + fullname)
				console.log("Registration Successful, you can now login", response.data)			
			}else {
				console.log("Registration Failed, please try again")			
			}
		}).catch((error) => {
			console.log(error)
		});	
		
	 }
	
	const handleSubmit = (event) => {
		event.preventDefault();
		registerUser();		
	}
	 
	return (     
		 <div className="Auth-form-container">
			
			<form className="Auth-form" onSubmit={handleSubmit}>
			
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">
						Project maneger user registration
					</h3>
					<div className="form-group mt-3">
						<label>User Full Name</label>
						<input
						  type="text"
						  value={fullname}
						  onChange={(e) => setFullName(e.target.value)}
						  className="form-control mt-1"
						  placeholder="Enter name (e.g: Peter Crouch)"
						/>
					</div>
					<div className="form-group mt-3">
						<label>User name</label>
						<input
						  type="text"
						  value={username}
						  onChange={(e) => setUserName(e.target.value)}
						  className="form-control mt-1"
						  placeholder="Enter nickname (e.g: peter87)"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
						  type="email"
						  value={email}
						  onChange={(e) => setEmail(e.target.value)}
						  className="form-control mt-1"
						  placeholder="Enter email (e.g peter@gmail.com)"
						/>
					</div>
					<div className="form-group mt-3">
						<label>User role</label>
						<input
						  type="text"
						  value={role}
						  onChange={(e) => setRole(e.target.value)}
						  className="form-control mt-1"
						  placeholder="Enter a role (e.g: admin, maneger or user)"
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
					<div className="form-group mt-3">
						<label>Confirm Password</label>
						<input
						  type="password"
						  value={password2}
						  onChange={(e) => setPassword2(e.target.value)}
						  className="form-control mt-1"
						  placeholder="Re-enter password"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary"> Submit </button>
					</div>
				
				</div>
				
			</form>
			
			
		</div>	 
	)
}

export default Register