import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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

export default function InsertTaskModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, selectedlabor, setMessages, handleLogout } = useContext(Context);	
	const [description, setDescription] = useState(""); 
	const [mechanicals, setMechanicals] = useState("");
	const [hour, setHour] = useState("");
	const [task_price, setTask_price] = useState("");
	const [end_date, setEnd_Date] = useState(new Date());
		
	const registerTask = async () => {
		
		await axios({
			method: 'post',
			url: '/create_task/',
			data: {
				mechanicals: mechanicals,
				description: description,
				hour: hour,	
				task_price: task_price,
				labor_task_id: selectedlabor.id, 
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Task data inserted successfuly ");
				setDescription("");
				setMechanicals("");
				setHour("");
				setTask_price("");
				setMessages("Task added succesffully" + Math.random());
				toast.success("Task added succesffully");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});					  
	}
  
	const handleClose = () => {
		setDescription("");
		setMechanicals("");
		setHour("");
		setTask_price("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (selectedlabor.id != null){		
			setShow(true);  
		}else{
			toast.warning("Not labor selected or end date stablished for that labor");
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
			registerTask();
			handleClose();
			setValidated(false);
		}
	};

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Add Task (+) {selectedlabor.type != null && <span className="badge bg-success"> for {selectedlabor.type} labor </span>}
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert task data
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<Form noValidate validated={validated} onSubmit={handleSubmit}>				 
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write some description for this task</Form.Label>
					  <Form.Control
						required
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="e.g: Trash can"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				  
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write the number of mechanicals to do this task</Form.Label>
					  <Form.Control
						required
						type="text"
						value={mechanicals}
						onChange={(e) => setMechanicals(e.target.value)}
						placeholder="# of mechanicals for the work (e.g: 6)"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				  
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write some hour for this task</Form.Label>
					  <Form.Control
						required
						type="text"
						value={hour}
						onChange={(e) => setHour(e.target.value)}
						placeholder="# of hour (e.g: 2 or 4)"
						defaultValue=""
					  />
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>				 
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write some price for this task</Form.Label>
					  <Form.Control
						required
						type="text"
						value={task_price}
						onChange={(e) => setTask_price(e.target.value)}
						placeholder="Price fro the work (e.g: 1200)"
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