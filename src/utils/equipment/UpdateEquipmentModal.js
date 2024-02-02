import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from './../../context/Context';
import axios from 'axios';
import { useNavigate } from "react-router";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateEquipmentModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, setMessages, handleLogout } = useContext(Context);	
	const [equipment_quantity, setEquipment_quantity] = useState("");
	const [equipment_unit_price, setEquipment_unit_price] = useState("");
	
	const updateEquipment = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_equipment/" + id,
			data: {
				equipment_quantity: equipment_quantity,	
				equipment_unit_price: equipment_unit_price,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Equipment data updated successfuly ");
				setEquipment_quantity("");
				setEquipment_unit_price("");
				toast.success("Equipment data updated successfuly");
				setMessages("Equipment updated successfuly" + Math.random())
			}else {
				console.log("Update Equipment failed, please try again");
				toast.danger("Update Equipment failed, please try again");
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			toast.danger("An error ocurr in equipment handle");
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setEquipment_quantity("");
		setEquipment_unit_price("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.equipment.id != null){		
			setShow(true);  
		}else{
			toast.warning("Not equipment selected yet");
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
			updateEquipment(props.equipment.id);
			handleClose();
			setValidated(false);
		}
	}
	
	return (
		<>
		<button className="btn btn-sm btn-outline-warning" onClick={handleShow}>
			Update
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Update equipment {props.equipment.equipment_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>				  
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
					  <Form.Label>Old quantity: {props.equipment.equipment_quantity}</Form.Label>
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
					  <Form.Label>Old unit price: {props.equipment.equipment_unit_price}</Form.Label>
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