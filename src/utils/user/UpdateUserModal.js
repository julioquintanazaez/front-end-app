import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from './../../context/Context';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateUserModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, setMessages, handleLogout } = useContext(Context);	
	const [full_name, setFullName] = useState("");
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	
	const options = ["admin", "manager", "user"]
	
	const updateUser = async (username) => {
		
		await axios({
			method: 'put',
			url: "/update_user/" + username,
			data: {
					full_name: full_name,
					username: username,
					email: email,
					role: role,
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
				setRole("");
				setMessages("User updated successfully" + Math.random());
				toast.success("User updated successfully");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setFullName("");	
		setUserName("");	
		setEmail("");	
		setRole("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.selecteduser.username != null){		
			setShow(true);  
		}else{
			toast.warning("Not user selected to update");
		}
	}
	
	const handleSelectRole = (role) => {
		if (role == "admin"){
			setRole(["admin", "manager", "user"]);
		}else if (role == "manager"){
			setRole(["manager", "user"]);
		}else{
			setRole(["user"]);
		}
	}
	
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		
		setValidated(true);
		
		event.preventDefault();
		
		if (validated){
			updateUser(props.selecteduser.username);
			handleClose();
			setValidated(false);
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
			
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom01">
					  <Form.Label>Write user full name</Form.Label>
					  <Form.Control
						required					  
						type="text"
						value={full_name}
						onChange={(e) => setFullName(e.target.value)}
						placeholder="Enter name (e.g: Peter Crouch)"
						defaultValue=""
					  />	
					  <Form.Label>Old full name: {props.selecteduser.full_name}</Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				  
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom01">
					  <Form.Label>Write user name</Form.Label>
					  <Form.Control
						required					  
						type="text"
						value={username}
						onChange={(e) => setUserName(e.target.value)}
						placeholder="Enter nickname (e.g: peter87)"
						defaultValue=""
					  />	
					  <Form.Label>Old username: {props.selecteduser.username}</Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>					  
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Enter email address</Form.Label>
					  <Form.Control
						required
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter email (e.g peter@gmail.com)"
						defaultValue=""
					  />
					  <Form.Label>Old email: {props.selecteduser.email}</Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				  
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom04">
					  <Form.Label>Select a role for the user</Form.Label>
					    <Form.Control 
						  required
						  as="select" 
						  onClick={(e) => handleSelectRole(e.target.value)}
						>
						{options?.map(opt => (
							<option key={opt} value={opt} >
								{opt}
							</option>
						))}	
					  </Form.Control>
					  <Form.Label>Old mail: {props.selecteduser.role}</Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Button type="submit">Save user</Button>				  
				</Form>
			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
	);
}