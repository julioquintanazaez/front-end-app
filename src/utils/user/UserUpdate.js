import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const UserUpdate = (props) => {
	
	const { token } = useContext(Context);	
	const [full_name, setFullName] = useState("");
	const [username, setUserName] = useState("");
	const [useremail, setEmail] = useState("");
	
	const updateUser = async () => {
		
		if (username != "" && full_name != "" && useremail != ""){
			await axios({
				method: 'put',
				url: "/update_user/" + props.selecteduser.username,
				data: {
						full_name: full_name,
						username: username,
						email: useremail,
						},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("User updated successfuly");				
				}else {
					console.log({"Update goes rongs": response.data});			
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
		updateUser();		
	}
	
	return (
		<form className="form" onSubmit={handleUpdateUser}>			
			
			<input
				type="text"
				value={full_name}
				onChange={(e) => setFullName(e.target.value)}
				className="form-control mt-3"
				placeholder="Insert name"
			/>
			<label> Old full name: {props.selecteduser.full_name} </label><br/>

			<input
			  type="text"
			  value={username}
			  onChange={(e) => setUserName(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Enter nickname (e.g: peter87)"
			/>	
			<label> Old username: {props.selecteduser.username} </label><br/>
			
			<input
			  type="email"
			  value={useremail}
			  onChange={(e) => setEmail(e.target.value)}
			  className="form-control mt-1"
			  placeholder="Enter email (e.g peter@gmail.com)"
			/>	
			<label> Old mail: {props.selecteduser.email} </label><br/>
							
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-info btn-sm"> UPDATE USER </button>
			</div>				
						
		</form>	
	);	
	
}

export default UserUpdate;