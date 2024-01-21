import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import { format } from "date-fns";
import { DayPicker, DateFormatter } from "react-day-picker";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";


export default function UpdateLaborEndDateModal( ) {
	
	const [show, setShow] = useState(false);
	const { token, selectedlabor, selectedproject, setMessages, handleLogout } = useContext(Context);	
	const [date, setDate] = useState(new Date());
	
	const updateLabor = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_labor_date/" + id,
			data: {
				enddate_labor: date.toISOString().split('T')[0],							
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor data updated successfuly ");
				setDate("");
				setMessages("Labor end date updated successfully" +  Math.random());
			}else {
				console.log("Update labor failed, please try again");	
				alert("Update labor failed, please try again");	
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			alert("An error ocurr ");
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setDate("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (date !== ""){
			updateLabor(selectedlabor.id);
			setShow(false);
		}else{
			alert("Some missing parameters for labor update");
		}
	}

	const handleShow = () => {
		if (selectedlabor.id != null){		
			setShow(true);  
		}else{
			alert("Not labor selected to update");
		}
	}
	
	let footer = <p> Please pick a day </p>;
	if (date){
		footer = <p> You picked {format(date, 'PP')} </p>;
	}
	
	return (
		<>
		<button className="btn btn-sm btn-secondary" onClick={handleShow}>
			Date
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Date
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>				
				<label>So that a labor can be closed it is necessary that all their tasks have a closing date </label>
				<label> Set-up deadline for labor </label>
				<div className="day">
					<DatePicker 
						showIcon
						selected={date} 
						onChange={(date) => setDate(date)} 
						minDate={new Date(selectedproject.inidate_proj != "" ? selectedproject.inidate_proj : new Date())}	
						maxDate={new Date(selectedproject.enddate_proj != "" ? selectedproject.enddate_proj : new Date())}
						dateFormat="Pp"
					/>
				</div>		
				
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Update date
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}