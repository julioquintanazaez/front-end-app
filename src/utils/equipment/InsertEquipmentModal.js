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

export default function InsertEquipmentModal( props ) {
	
	const [validated, setValidated] = useState(false);
	const [show, setShow] = useState(false);
	const { token, selectedlabor, setMessages, handleLogout } = useContext(Context);	
	const [equipment_name, setEquipment_name] = useState(""); 
	const [equipment_quantity, setEquipment_quantity] = useState("");
	const [equipment_unit_price, setEquipment_unit_price] = useState("");
	
	const registerEquipment = async () => {
		
		await axios({
			method: 'post',
			url: '/create_equipment/',
			data: {
				equipment_name: equipment_name,
				equipment_quantity: equipment_quantity,
				equipment_unit_price: equipment_unit_price,	
				labor_equipment_id: selectedlabor.id,					
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Equipment data inserted successfuly ");
				toast.success("Equipment Successfuly inserted");
				setEquipment_name("");
				setEquipment_quantity("");
				setEquipment_unit_price("");
				setMessages("Equipment updated successfuly" + Math.random())
			}else if (response.status === 500) {
				console.log("Integrity error");
				toast.danger("Equipment already exist in DB");
			} else {
				console.log("Insert equipment Failed, please try again");		
				toast.danger("Insert equipment Failed, please try again");
			}
		}).catch((error) => {
			console.log({"An error ocurr ": equipment_name});
			toast.danger("An error ocurr in equipment handle");
			handleLogout();
		});	
			  
	}
  
	const handleClose = () => {
		setEquipment_name("");
		setEquipment_quantity("");
		setEquipment_unit_price("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (selectedlabor.id != null){		
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
			registerEquipment();
			handleClose();
			setValidated(false);
		}
	}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Add Equipment (+) {selectedlabor.type != null && <span className="badge bg-success"> for {selectedlabor.type} labor </span>}
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert equipment data
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom01">
					  <Form.Label>Write a name for the equipment</Form.Label>
					  <Form.Control
						required					  
						type="text"
						value={equipment_name}
						onChange={(e) => setEquipment_name(e.target.value)}
						placeholder="Some name like (e.g: Electric Drill)"
						defaultValue=""
					  />							
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write a quantity for the equipment</Form.Label>
					  <Form.Control
						required
						type="text"
						value={equipment_quantity}
						onChange={(e) => setEquipment_quantity(e.target.value)}
						placeholder="# of units (e.g: 15)"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write a unit price for the equipment</Form.Label>
					  <Form.Control
						required
						type="text"
						value={equipment_unit_price}
						onChange={(e) => setEquipment_unit_price(e.target.value)}
						placeholder="A unit price (e.g: 120)"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  			  
				  <Button type="submit">Save equipment</Button>				  
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