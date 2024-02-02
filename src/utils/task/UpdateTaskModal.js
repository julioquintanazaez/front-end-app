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

export default function UpdateTaskModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, setMessages, handleLogout } = useContext(Context);	
	const [mechanicals, setMechanicals] = useState("");
	const [hour, setHour] = useState("");
	const [task_price, setTask_price] = useState("");
	
	const updateTask = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_task/" + id,
			data: {
				mechanicals: mechanicals,	
				hour: hour,	
				task_price: task_price,					
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Task data updated successfuly ");
				setMechanicals("");
				setHour("");
				setTask_price("");
				setMessages("Task updated succesffully" + Math.random());
				toast.success("Task data updated successfuly");
			}else {
				console.log("Update task failed, please try again");	
				toast.danger("Update task failed, please try again");
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			toast.danger("Something happend with server conexion");
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setMechanicals("");
		setHour("");
		setTask_price("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.task.id != null){		
			setShow(true);  
		}else{
			toast.warning("Not task selected yet");
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
			updateTask(props.task.id);
			handleClose();
			setValidated(false);
		}
	};
	
	return (
		<>
		<button className="btn btn-sm btn-outline-warning" onClick={handleShow}>
			Update
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Update task {props.task.description}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>	

			
				<Form noValidate validated={validated} onSubmit={handleSubmit}>				 
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
					  <Form.Label>Old # of mechanicals: {props.task.mechanicals}</Form.Label>
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
					  <Form.Label>Old # of hours: {props.task.hour}</Form.Label>
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
					  <Form.Label>Old unit price: {props.task.task_price}</Form.Label>
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