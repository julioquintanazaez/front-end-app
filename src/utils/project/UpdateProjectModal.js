import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from './../../context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


export default function UpdateProjectModal( props ) {
	
	const [project, setProject] = useState({});
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, selectedproject, setMessages, handleLogout } = useContext(Context);
	const [project_name, setName] = useState(""); 
	const [desc_proj, setDescription] = useState("");
	
	const updateProject = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_project/" + id,
			data: {
				project_name: project_name,
				desc_proj: desc_proj,
				manager: user.username,	
				mail_manager: user.email,							
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project data updated successfuly ");
				setName("");
				setDescription("");
				setMessages("Project updated successfully" + Math.random());
				toast.success("Project data updated successfuly");
			}else {
				console.log("Update project failed, please try again");	
				toast.danger("Update project failed, please try again");
			}
		}).catch((error) => {
			console.log({"An error ocurr ": project_name});
			toast.warning("An error ocurr");
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setName("");
		setDescription("");
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.project.id != null){	
			setProject(props.project);
			setShow(true);  
		}else{
			toast.warning("Not project selected to update");
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
			updateProject(props.project.id);
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
					Update {project.project_name}
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
						value={project_name}
						onChange={(e) => setName(e.target.value)}
						placeholder="e.g: Some name"
						defaultValue=""
					  />
					  <Form.Label>Old name: {project.project_name} </Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>					
				  </Row>
				  <Row className="mb-3">
					<Form.Group as={Col} md="10" controlId="validationCustom02">
					  <Form.Label>Write a description for the project</Form.Label>
					  <Form.Control
						required
						type="text"
						value={desc_proj}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="e.g: Some to-do"
						defaultValue=""
					  />
					  <Form.Label>Old description: {project.desc_proj} </Form.Label>
					  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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