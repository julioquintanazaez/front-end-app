import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function UpdateUserModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token, setMessages, handleLogout } = useContext(Context);	
	const [full_name, setFullName] = useState("");
	const [username, setUserName] = useState("");
	const [useremail, setEmail] = useState("");
	
	const updateUser = async (username) => {
		
		await axios({
			method: 'put',
			url: "/update_user/" + username,
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
				console.log("User updated successfuly");	
				setFullName("");	
				setUserName("");	
				setEmail("");	
				setMessages("User updated successfully");
			}else {
				console.log({"Update goes rongs": response.data});			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setFullName("");	
		setUserName("");	
		setEmail("");	
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (username !== "" && full_name !== "" && useremail !== ""){
			updateUser(props.selecteduser.username);
		}else{
			alert("Some missing parameters for user update");
		}
	}

	const handleShow = () => {
		if (props.selecteduser.username != null){		
			setShow(true);  
		}else{
			alert("Not user selected to update");
		}
	}
	
	return (
		<>
		<button className="btn btn-sm btn-primary" onClick={handleShow}>
			Update
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Update user data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input
					type="text"
					value={full_name}
					onChange={(e) => setFullName(e.target.value)}
					className="form-control mt-3"
					placeholder="Insert full name"
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
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Update
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}