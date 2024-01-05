import React, {useState, useEffect} from 'react';
import axios from 'axios';


function ResetPassword (props) {
	 
	 const [username, setUserName] = useState("");
	 const [password, setPassword] = useState("");
	 const [password2, setPassword2] = useState("");
	 
	 
	const resetPasswordUser = () => {
		 
		axios({
			method: 'post',
			url: '/reset_password/' + username,
			data:{
				hashed_password: password
			}
		}).then(response => {
			if (response.status === 200) {
				alert('Password of user : ' + username + ' was updated successfully')	
				console.log("Reset password Successful, you can now login", response.data)			
			}else {
				console.log("Reset password Failed, please try again")			
			}
		}).catch((error) => {
			console.log(error)
		});	
		
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		resetPasswordUser();
	}
	 
	return (     
		 <div className="Auth-form-container">
			
			<form className="Auth-form" onSubmit={handleSubmit}>
			
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">
						Project maneger reset password
					</h3>
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
	);
}

export default ResetPassword