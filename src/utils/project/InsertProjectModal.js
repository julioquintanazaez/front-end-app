import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function InsertProjectModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [name, setName] = useState(""); 
	const [description, setDescription] = useState("");
	const [manager, setManager] = useState("");
	const [email, setEmail] = useState("");	
	
	const registerProject = async () => {
		
		await axios({
			method: 'post',
			url: '/create_project/',
			data: {
				project_name: name,
				desc_proj: description,
				manager: manager,	
				mail_manager: email,						
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project data inserted successfuly ");
				alert({"Project Successfuly deleted": name});	
				setName("");
				setDescription("");
				setManager("");
				setEmail("");
			}else if (response.status === 500) {
				console.log("Integrity error");
				alert({"Project already exist in DB": name});	
			}else {
				console.log("Insert project Failed, please try again");	
				alert({"Insert project Failed, please try again": name});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": name});
			alert({"An error ocurr ": name});	
		});				  
	}
  
	const handleClose = () => {
		setName("");
		setDescription("");
		setManager("");
		setEmail("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (name != null && description != null && manager != null && email != null){
			registerProject();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => setShow(true);  

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Create project
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert project data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input type="text" value={name}
				  onChange={(e) => setName(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some place"
				/>
				<input type="text" value={description}
				  onChange={(e) => setDescription(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some to-do"
				/>
				<input type="text" value={manager}
				  onChange={(e) => setManager(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: John Doe"
				/>
				<input type="email" value={email}
				  onChange={(e) => setEmail(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: johndoe@gmail{hotmail, etc}.com"
				/>
				<label>johndoe@gmail.com</label>
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Save project
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}