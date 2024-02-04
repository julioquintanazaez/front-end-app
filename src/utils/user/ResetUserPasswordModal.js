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

export default function ResetUserPasswordModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, setMessages, handleLogout } = useContext(Context);	
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("")
	
	const updateUserPassword = async () => {
		
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
				setMessages("User password updated successfully" + Math.random());
				toast.success("User password successfuly handle");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setPassword("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.selecteduser.username != null){		
			setShow(true);  
		}else{
			toast.warning("Not user selected to update");
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
			if (password === password2){
				updateUserPassword();
				handleClose();
				setValidated(false);
			}else{
				toast.danger("New password and confirmed password doesn't match");
			}			
		}
	}
	
	return (
		<>
		<button className="btn btn-sm btn-primary" onClick={handleShow}>
			Reset
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Reset password
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>				 			  
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