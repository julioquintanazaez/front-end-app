import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const UserResetPass = (props) => {
	
	const { token } = useContext(Context);	
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	
	const updateUserPassword = async () => {
		
		if (props.selecteduser.username != null && password != null && password == password2){
			await axios({
				method: 'put',
				url: "/reset_password/" + props.selecteduser.username,
				data:{
					hashed_password: password
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					alert({"User Successfuly handle": props.selecteduser.username});								
				}else {
					console.log({"Update goes rongs": response.data});	
					alert({"User reset password Failed, please try again": props.selecteduser.username});
				}
				
			}).catch((error) => {
				console.log({"An error ocur": error});
			});		
		}else{
			alert("Please select a user...");
		}			
	}
	
	const handleUpdateUser = (event) => {
		event.preventDefault();
		updateUserPassword();		
	}
	
	return (
		<form className="form" onSubmit={handleUpdateUser}>			
			 <label> User Name: {props.selecteduser.full_name} </label><br/>
			<label> User Nickname: {props.selecteduser.username}</label><br/>
				
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="form-control mt-2"
				placeholder="password"
			/>

			<input
			  type="password"
			  value={password2}
			  onChange={(e) => setPassword2(e.target.value)}
			  className="form-control mt-2"
			  placeholder="Retype password"
			/>	
							
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-info btn-sm"> UPDATE USER </button>
			</div>				
						
		</form>	
	);	
	
}

export default UserResetPass;