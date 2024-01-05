import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function UpdateProjectModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [project_name, setName] = useState(""); 
	const [desc_proj, setDescription] = useState("");
	const [manager, setManager] = useState("");
	const [email, setEmail] = useState("");	
	
	const updateProject = async () => {
		
		await axios({
			method: 'put',
			url: "/update_project/" + props.project.id,
			data: {
				project_name: project_name,
				desc_proj: desc_proj,
				manager: manager,	
				mail_manager: email,							
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
				setManager("");
				setEmail("");
			}else {
				console.log("Update project failed, please try again");	
				alert({"Update project failed, please try again": project_name});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": project_name});
			alert({"An error ocurr ": project_name});	
		});				  
	}
  
	const handleClose = () => {
		setName("");
		setDescription("");
		setManager("");
		setEmail("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (name != null && description != null && manager != null && email != null){
			updateProject();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (props.project.id != null){		
			setShow(true);  
		}else{
			alert("Not project selected yet");
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
					Update project data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input type="text" value={project_name}
				  onChange={(e) => setName(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some place"
				/>
				<label> Old name: {props.project.project_name} </label>
				
				<input type="text" value={desc_proj}
				  onChange={(e) => setDescription(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some to-do"
				/>
				<label> Old unit: {props.project.desc_proj} </label>	
				
				<input type="text" value={manager}
				  onChange={(e) => setManager(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: John Doe"
				/>
				<label> Old unit: {props.project.manager} </label>	
				
				<input type="email" value={email}
				  onChange={(e) => setEmail(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: johndoe@gmail{hotmail, etc}.com"
				/>				
				<label> Old unit price: {props.project.mail_manager} </label>		
			
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