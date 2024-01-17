import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import addDays from "date-fns/addDays";
import { Form } from 'react-bootstrap';

export default function InsertLaborModal( ) {
	
	const [show, setShow] = useState(false);

	const { token, selectedproject } = useContext(Context);	
	const { setControlUpdates, handleControlUpdate } = useContext(Context);	
	const [type, setType] = useState(""); 
	const [desc_labor, setDescription] = useState("");
	const [enddate, setEndDate] = useState(new Date());
	
	const options = ["Demolition", "Documental", "Reconstruction", "Roof"]
	
	const registerLabor = async () => {		
		
		await axios({
			method: 'post',
			url: '/create_labor/',
			data: {
				type: type,
				desc_labor: desc_labor,				
				enddate_labor: enddate.toISOString().split('T')[0],
				project_id: selectedproject.id,	
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor data inserted successfuly ");
				alert("Labor Successfuly inserted");	
				setType("");
				setDescription("");
				setEndDate("");
				setControlUpdates(handleControlUpdate());
			}else if (response.status === 500) {
				console.log("Integrity error");
				alert("Labor already exist in DB");	
			}else {
				console.log("Insert labor failed, please try again");	
				alert("Insert labor failed, please try again");	
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			alert("An error ocurr ");	
		});	  
	}
  
	const handleClose = () => {
		setType("");
		setDescription("");
		setEndDate("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (type != null && desc_labor != null && selectedproject.id != null && enddate != null){
			registerLabor();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (selectedproject.id != null){		
			setShow(true);  
		}else{
			alert("Not project selected for labor creation");
		}
	}  

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Hire labor (+)
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert labor data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<Form.Label>Select a role</Form.Label>
				<Form.Control 
						as="select" 
						onClick={(e) => setType(e.target.value)}
						>
						{options?.map(opt => (
							<option key={opt} value={opt} >
								{opt}
							</option>
						))}						
				</Form.Control>
				
				<input type="text" value={desc_labor}
				  onChange={(e) => setDescription(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Some to-do"
				/>
				
				<label> Set-up deadline for the project </label>
				<div className="day">
					<DatePicker 
						showIcon
						minDate={new Date(selectedproject.inidate_proj != "" ? selectedproject.inidate_proj : new Date())}	
						maxDate={new Date(selectedproject.enddate_proj != "" ? selectedproject.enddate_proj : new Date())}
						selected={enddate} 						
						onChange={(enddate) => setEndDate(enddate)} 
						dateFormat="Pp"
					/>
				</div>
				
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