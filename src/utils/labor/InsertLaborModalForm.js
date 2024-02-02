import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from './../../context/Context';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import addDays from "date-fns/addDays";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function InsertLaborModal( ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);

	const { token, selectedproject, setMessages, handleLogout } = useContext(Context);	
	const [type, setType] = useState(""); 
	const [desc_labor, setDescription] = useState("");
	const [enddate, setEndDate] = useState(new Date());
	
	const options = ["Demolition", "Documental", "Reconstruction", "Roof"]
	
	const registerLabor = async () => {		
		
		await axios({
			method: 'post',
			url: '/create_labor/',
			data: {
				type: type,
				desc_labor: desc_labor,				
				project_id: selectedproject.id,	
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor data inserted successfuly ");
				toast.success("Labor added successfuly");
				setType("");
				setDescription("");
				setMessages("Labor inserted successfully" + Math.random());
			}else if (response.status === 500) {
				console.log("Integrity error");
				setMessages("Labor exist in Database");
				toast.danger("Labor already exist in DB");
			}else {
				console.log("Insert labor failed, please try again");	
				toast.danger("Insert labor failed, please try again");
				setMessages("Labor exist in Database" + Math.random());
			}
		}).catch((error) => {
			console.log("An error ocurr");
			toast.danger("An error ocurr");	
			handleLogout();
		});	  
	}
  
	const handleClose = () => {
		setType("");
		setDescription("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (type !== "" && desc_labor !== "" && selectedproject.id != null && enddate != null){
			registerLabor();
		}else{
			toast.warning("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (selectedproject.id != null){		
			setShow(true);  
		}else{
			toast.warning("Not project selected for labor creation");
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
			registerLabor();
			handleClose();
			setValidated(false);
		}
	}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Add Labor (+)
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Hire a labor for project {selectedproject.project_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom01">
					  <Form.Label>Select a labor type from list</Form.Label>
					    <Form.Control 
						  required
						  as="select" 
						  onClick={(e) => setType(e.target.value)}
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
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write some description for this labor</Form.Label>
					  <Form.Control
						required
						type="text"
						value={desc_labor}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="e.g: Some to-do"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				  
				  <Button type="submit">Save data</Button>
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