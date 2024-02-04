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

export default function InsertMaterialModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, selectedlabor, setMessages, handleLogout } = useContext(Context);
	const [material_name, setMaterial_name] = useState(""); 
	const [material_type, setMaterial_type] = useState("");
	const [material_quantity, setMaterial_quantity] = useState("");
	const [material_price, setMaterial_price] = useState("");
	
	const options = ["Ducts", "Sensors and Accessories", "Other Materials", "Equipments"]
	
	const registerMaterial = async () => {
		
		await axios({
			method: 'post',
			url: '/create_material/',
			data: {
				material_name: material_name,
				material_type: material_type,
				material_quantity: material_quantity,
				material_price: material_price,				
				labor_material_id: selectedlabor.id,				
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Material data inserted successfuly ");
				setMaterial_name("");
				setMaterial_type("");
				setMaterial_quantity("");
				setMaterial_price("");
				setMessages("Material added successfully" + Math.random());
				toast.success("Material Successfuly inserted");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
  
	const handleClose = () => {
		setMaterial_name("");
		setMaterial_type("");
		setMaterial_quantity("");
		setMaterial_price("");
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
			registerMaterial();
			handleClose();
			setValidated(false);
		}
	};

	return (
		<>
		<Button className="btn btn-sm" onClick={handleShow}>
			Add Material (+) {selectedlabor.type != null && <span className="badge bg-success"> for {selectedlabor.type} labor </span>}
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert material data
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom01">
					  <Form.Label>Write a name for the material</Form.Label>
					  <Form.Control
						required
						type="text"
						value={material_name}
						onChange={(e) => setMaterial_name(e.target.value)}
						placeholder="A name (e.g: Rectangular ducks)"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Select a material type from list</Form.Label>
					    <Form.Control 
						  required
						  as="select" 
						  onClick={(e) => setMaterial_type(e.target.value)}
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