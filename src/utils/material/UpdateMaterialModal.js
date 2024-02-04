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

export default function UpdateMaterialModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, setMessages, handleLogout } = useContext(Context);	
	const [material_quantity, setMaterial_quantity] = useState("");
	const [material_price, setMaterial_price] = useState("");
	
	const material = props.material;
	
	const updateMaterial = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_material/" + id,
			data: {
				material_quantity: material_quantity,	
				material_price: material_price,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Material data updated successfuly ");
				setMaterial_quantity("");
				setMaterial_price("");
				setMessages("Material updated successfully" + Math.random());
				toast.success("Material data updated successfuly");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setMaterial_quantity("");
		setMaterial_price("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (material.id != null){		
			setShow(true);  
		}else{
			toast.warning("Not material selected yet");
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
			updateMaterial(material.id);
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
					Update material {material.material_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>	
				
				<Form noValidate validated={validated} onSubmit={handleSubmit}>				  
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom03">
					  <Form.Label>Write some quantity for the material</Form.Label>
					  <Form.Control
						required
						type="text"
						value={material_quantity}
						onChange={(e) => setMaterial_quantity(e.target.value)}
						placeholder="# of units (e.g: 20)"
						defaultValue=""
					  />
					  <Form.Label>Old quantity: {material.material_quantity}</Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom03">
					  <Form.Label>Write some price for the material</Form.Label>
					  <Form.Control
						required
						type="text"
						value={material_price}
						onChange={(e) => setMaterial_price(e.target.value)}
						placeholder="A price (e.g: 120)"
						defaultValue=""
					  />
					  <Form.Label>Old unit price: {material.material_price}</Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  
				  <Button type="submit">Save material</Button>
				  
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