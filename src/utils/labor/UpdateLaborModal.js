import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function UpdateLaborModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [desc_labor, setDescription] = useState("");
	
	const updateLabor = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_labor/" + id,
			data: {
				desc_labor: desc_labor,						
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor data updated successfuly ");
				alert("Labor data updated successfuly");	
				setDescription("");
			}else {
				console.log("Update Labor failed, please try again");	
				alert(Labor);	
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			alert("An error ocurr ");	
		});				  
	}
  
	const handleClose = () => {
		setDescription("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (desc_labor != null){
			updateLabor(props.labor.id);
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (props.labor.id != null){		
			setShow(true);  
		}else{
			alert("Not labor selected yet");
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
					Update labor {props.labor.type}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>				
				<input type="text" value={desc_labor}
				  onChange={(e) => setDescription(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some to-do"
				/>
				<label> Old unit: {props.labor.desc_labor} </label>			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Update labor
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}