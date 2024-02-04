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

export default function UpdateLaborModal ( props ) {
	
	const [labor, setLabor] = useState(false);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, selectedlabor, setMessages, handleLogout } = useContext(Context);
	const { setControlUpdates, handleControlUpdate } = useContext(Context);		
	const [desc_labor, setDescription] = useState("");
	const [type, setType] = useState("");
	
	const options = ["Demolition", "Documental", "Reconstruction", "Roof"]
	
	const updateLabor = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_labor/" + id,
			data: {
				desc_labor: desc_labor,	
				type: type,					
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor data updated successfuly ");
				toast.success("Labor data updated successfuly");				
				setDescription("");
				setMessages("Labor update successfully" + Math.random());
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setType("");
		setDescription("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.labor.id != null){
			setLabor(props.labor);
			setShow(true);  
		}else{
			toast.warning("Not labor selected yet");
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
			updateLabor(labor.id);
			handleClose();
			setValidated(false);
		}
	};
	
	return (
		<>
		<button className="btn btn-sm btn-warning" onClick={handleShow}>
			Update
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Update labor {labor.type}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom01">
					  <Form.Label>Select a new labor type</Form.Label>
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
					  <label> Old type: {labor.type} </label>		
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
					  <label> Old description: {labor.desc_labor} </label>		
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				 
				  
				  <Button type="submit">Update data</Button>
				  
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