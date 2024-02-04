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

export default function RegisterUserModal( ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, setMessages, handleLogout } = useContext(Context);	
	const [fullname, setFullName] = useState("");
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	
	const options = ["admin", "manager", "user"]
	
	const registerUser = async () => {
		
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
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("User data registered successfuly ");
				setFullName("");
				setUserName("");
				setEmail("");
				setRole("");
				setPassword("");
				setMessages("User data registered successfuly" + Math.random());
				toast.success("User data registered successfuly");
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
		setPassword("");
		setShow(false);
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

	const handleShow = () => setShow(true);  
	
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		
		setValidated(true);
		
		event.preventDefault();
		
		if (validated){
			registerUser();
			handleClose();
			setValidated(false);
		}
	}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Register user
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					User data
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
						value={fullname}
						onChange={(e) => setFullName(e.target.value)}
						placeholder="Enter name (e.g: Peter Crouch)"
						defaultValue=""
					  />							
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
					  <Form.Label>peter@gmail.com</Form.Label>
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
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				  
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom05">
					  <Form.Label>Write user password</Form.Label>
					  <Form.Control
						required
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Re-enter password"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom06">
					  <Form.Label>Confirm user pasword</Form.Label>
					  <Form.Control
						required
						type="password"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
						placeholder="Re-enter password"
						defaultValue=""
					  />
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