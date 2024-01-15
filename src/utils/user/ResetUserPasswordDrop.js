import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function ResetUserPasswordDrop( props ) {
	
	const [show, setShow] = useState(false);

	const { token, user } = useContext(Context);
	const { setControlUpdates, handleControlUpdate } = useContext(Context);	
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("")
	
	const updateUserPassword = async () => {
		
		await axios({
			method: 'put',
			url: "/reset_password/" + user.username,
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
				setControlUpdates(handleControlUpdate());
				alert("User Successfuly handle");								
			}else {
				console.log({"Update goes rongs": response.data});	
				alert("User reset password failed, please try again");
			}
			
		}).catch((error) => {
			console.log({"An error ocur": error});
		});				  
	}
  
	const handleClose = () => {
		setPassword("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (password != null && password == password2){
			updateUserPassword();
		}else{
			alert("Some missing parameters for password");
		}
	}

	const handleShow = () => {
		setShow(true);		
	}
	
	return (
		<>
		<NavDropdown.Item as="button" onClick={handleShow}>
			Reset password
		</NavDropdown.Item>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Reset password
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
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
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Reset
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}