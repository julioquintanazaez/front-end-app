import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import { format } from "date-fns";
import { DayPicker, DateFormatter } from "react-day-picker";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UpdateProjectEndDateModal ( props ) {
	
	const [project, setProject] = useState({});
	const [show, setShow] = useState(false);

	const { token, selectedproject, setMessages, handleLogout } = useContext(Context);	
	const [date, setDate] = useState(new Date());
	
	const updateProject = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_project_date/" + id,
			data: {
				enddate_proj: date.toISOString().split('T')[0],							
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project data updated successfuly ");
				setDate("");
				setMessages("Project date updated successfully" + Math.random());
				toast.success("Project data updated successfuly");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setDate("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (date !== ""){
			updateProject(props.project.id);
		}else{
			toast.warning("Some missing parameters fro project update");
		}
	}

	const handleShow = () => {
		if (props.project.id != null){	
			setProject(props.project);
			setShow(true);  
		}else{
			toast.warning("Not project selected to update");
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
		<ToastContainer />
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Date
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>				
				
				<label>So that a project can be closed it is necessary that all their labors have a closing date </label>				
				<div className="day">
					<DatePicker 
						showIcon
						selected={date} 
						minDate={new Date(selectedproject.inidate_proj != "" ? selectedproject.inidate_proj : new Date())}	
						onChange={(date) => setDate(date)} 
					/>
				</div>	
				<label>Actual date: {project.enddate_proj != null ? project.enddate_proj.split('T')[0] : project.enddate_proj}</label>
				
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