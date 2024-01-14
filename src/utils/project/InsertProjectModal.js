import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import DatePicker from "react-datepicker";


export default function InsertProjectModal( ) {
	
	const [show, setShow] = useState(false);

	const { token, user } = useContext(Context);	
	const { setControlUpdates, handleControlUpdate } = useContext(Context);	
	const [name, setName] = useState(""); 
	const [description, setDescription] = useState("");
	const [manager, setManager] = useState("");
	const [email, setEmail] = useState("");	
	const [enddate, setEndDate] = useState(new Date());
	
	const registerProject = async () => {
		
		await axios({
			method: 'post',
			url: '/create_project/',
			data: {
				project_name: name,
				desc_proj: description,
				manager: user.username,	
				mail_manager: user.email,
				enddate_proj: enddate.toISOString().split('T')[0],
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project data inserted successfuly");
				alert("Project Successfuly inserted");	
				setName("");
				setDescription("");
				setEndDate("");
				setControlUpdates(handleControlUpdate());
			}else if (response.status === 401) {
				console.log("Not enought permissions");
				alert("Permisions denied");	
			}else if (response.status === 500) {
				console.log("Integrity error");
				alert("Project already exist in DB");	
			}else {
				console.log("Insert project Failed, please try again");	
				alert("Insert project Failed, please try again");	
			}
		}).catch((error) => {
			console.log("An error ocurr");
			alert("An error ocurr");	
		});				  
	}
  
	const handleClose = () => {
		setName("");
		setDescription("");
		setEndDate("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (name != null && description != null && enddate != null && user.username != null && user.email != null){			
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
					<p>Insert project data</p>
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
				<label> Set-up deadline for the project </label>
				<div className="day">
					<DatePicker 
						showIcon
						selected={enddate} 
						onChange={(date) => setEndDate(date)} 
						dateFormat="Pp"
					/>
				</div>
			
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