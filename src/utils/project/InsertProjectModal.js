import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import { Context } from './../../context/Context';
import axios from 'axios';
import DatePicker from "react-datepicker";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InsertProjectModal( ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user } = useContext(Context);	
	const { setMessages, handleLogout } = useContext(Context);	
	const [name, setName] = useState(""); 
	const [description, setDescription] = useState("");
	const [manager, setManager] = useState("");
	const [email, setEmail] = useState("");	
	const [enddate, setEndDate] = useState(new Date());
	
	const registerProject = async () => {
		
		await axios({
			method: 'post',
			url: '/create_project/',
			data: {
				project_name: name,
				desc_proj: description,
				manager: user.username,	
				mail_manager: user.email,
				enddate_proj: enddate.toISOString().split('T')[0],
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project data inserted successfuly");
				setName("");
				setDescription("");
				setEndDate("");
				setMessages("Project created successfully"+ Math.random());
				toast.success("Project added successfuly");
			}else if (response.status === 401) {
				console.log("Not enought permissions");
				toast.danger("Not enought permissions");
			}else if (response.status === 500) {
				console.log("Integrity error");
				toast.danger("Project already exist in DB");
			}else {
				console.log("Insert project Failed, please try again");	
				toast.danger("Insert project Failed, please try again");
			}
		}).catch((error) => {
			console.log("An error ocurr");			
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setName("");
		setDescription("");
		setEndDate("");
		setShow(false);
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
			registerProject();
			handleClose();
			setValidated(false);
		}
	}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Create project
		</Button>
		<ToastContainer />
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>					
					<p>Insert project data</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom01">
					  <Form.Label>Write a name for the project</Form.Label>
					  <Form.Control
						required					  
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="e.g: Some place"
						defaultValue=""
					  />							
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write a description for the project</Form.Label>
					  <Form.Control
						required
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="e.g: Some to-do"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="6" controlId="validationCustom03" >
					  <Form.Label>Set-up a deadline for the project</Form.Label>
						<DatePicker 
							showIcon
							selected={enddate} 						
							onChange={(enddate) => setEndDate(enddate)} 
							dateFormat="Pp"
						/>
					</Form.Group>					
				  </Row>
				  
				  <Button type="submit">Save project</Button>
				  
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