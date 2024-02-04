import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from './../../context/Context';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetUserPasswordUser( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, setMessages, handleLogout } = useContext(Context);
	const [actualpassword, setActualPassword] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("")
	
	const updateUserPassword = async () => {
		
		await axios({
			method: 'put',
			url: "/reset_password_by_user/" + user.username,
			data:{
				actualpassword: actualpassword,
				newpassword: password,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response fro reset password ": response.data});	
				setMessages("User password reset successfully" + Math.random());
				setPassword("");
				setPassword2("");
				setActualPassword("");
				toast.success("User password successfuly handle");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setPassword("");
		setPassword2("");
		setActualPassword("");
		setShow(false);
	}
	
	const handleShow = () => {
		setShow(true);		
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
			if(password === password2){
				updateUserPassword();				
				setValidated(false);
				handleClose();
			}else{
				//alert("Password & Password2 doesn't match");
				toast.danger("User reset password failed, please try again");
			}			
		}
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
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>	
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom04">
					  <Form.Label>Write actual password</Form.Label>
					  <Form.Control
						required
						type="password"
						value={actualpassword}
						onChange={(e) => setActualPassword(e.target.value)}
						placeholder="Enter actual password"
						defaultValue=""
					  />
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