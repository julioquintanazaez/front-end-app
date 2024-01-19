import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function UpdateProjectModal( ) {
	
	const [show, setShow] = useState(false);

	const { token, user, selectedproject, setMessages, handleLogout } = useContext(Context);
	const [project_name, setName] = useState(""); 
	const [desc_proj, setDescription] = useState("");
	const [manager, setManager] = useState("");
	const [email, setEmail] = useState("");	
	
	const updateProject = async () => {
		
		await axios({
			method: 'put',
			url: "/update_project/" + selectedproject.id,
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
				alert({"Project data updated successfuly": project_name});	
				setName("");
				setDescription("");
				setMessages("Project updated successfully");
			}else {
				console.log("Update project failed, please try again");	
				alert({"Update project failed, please try again": project_name});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": project_name});
			alert({"An error ocurr ": project_name});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setName("");
		setDescription("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (name !== "" && desc_proj !== "" && user.username != null && user.email != null){
			updateProject();
		}else{
			alert("Some missing parameters fro project update");
		}
	}

	const handleShow = () => {
		if (selectedproject.id != null){		
			setShow(true);  
		}else{
			alert("Not project selected to update");
		}
	}
	
	return (
		<>
		<button className="btn btn-sm btn-warning" onClick={handleShow}>
			Update
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Update project data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input type="text" value={project_name}
				  onChange={(e) => setName(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some place"
				  required
				/>
				<label> Old name: {selectedproject.project_name} </label>
				
				<input type="text" value={desc_proj}
				  onChange={(e) => setDescription(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some to-do"
				  required
				/>
				<label> Old unit: {selectedproject.desc_proj} </label>						
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Update project
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}