import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function InsertLaborModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [type, setType] = useState(""); 
	const [desc_labor, setDescription] = useState("");
	
	
	const registerLabor = async () => {		
		
		await axios({
			method: 'post',
			url: '/create_labor/',
			data: {
				type: type,
				desc_labor: desc_labor,
				project_id: props.id,						
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor data inserted successfuly ");
				alert({"Labor Successfuly inserted": type});	
				setType("");
				setDescription("");
			}else if (response.status === 500) {
				console.log("Integrity error");
				alert({"Labor already exist in DB": type});	
			}else {
				console.log("Insert labor Failed, please try again");	
				alert({"Insert labor Failed, please try again": type});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": type});
			alert({"An error ocurr ": type});	
		});	  
	}
  
	const handleClose = () => {
		setType("");
		setDescription("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (type != null && desc_labor != null && props.id != null){
			registerLabor();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (props.id != null){		
			setShow(true);  
		}else{
			alert("Not project selected for labor creation");
		}
	}  

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Create labor
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert labor data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input type="text" value={type}
				  onChange={(e) => setType(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: A type for labor (e.g Demolition)"
				/>
				<input type="text" value={desc_labor}
				  onChange={(e) => setDescription(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some to-do"
				/>
				
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Save labor
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}