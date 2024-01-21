import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import DatePicker from "react-datepicker";


export default function InsertTaskModal( ) {
	
	const [show, setShow] = useState(false);

	const { token, selectedlabor, setMessages, handleLogout } = useContext(Context);	
	const [description, setDescription] = useState(""); 
	const [mechanicals, setMechanicals] = useState("");
	const [hour, setHour] = useState("");
	const [task_price, setTask_price] = useState("");
	const [end_date, setEnd_Date] = useState(new Date());
		
	const registerTask = async () => {
		
		await axios({
			method: 'post',
			url: '/create_task/',
			data: {
				mechanicals: mechanicals,
				description: description,
				hour: hour,	
				task_price: task_price,
				enddate_task: end_date.toISOString().split('T')[0],
				labor_task_id: selectedlabor.id, 
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Task data inserted successfuly ");
				setDescription("");
				setMechanicals("");
				setHour("");
				setTask_price("");
				setEnd_Date("");
				setMessages("Task added succesffully" + Math.random());
			}else if (response.status === 500) {
				console.log("Integrity error");
				alert({"Task already exist in DB": description});	
			}else {
				console.log("Insert task failed, please try again");	
				alert({"Insert task failed, please try again": description});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": description});
			alert({"An error ocurr ": description});	
			handleLogout();
		});					  
	}
  
	const handleClose = () => {
		setDescription("");
		setMechanicals("");
		setHour("");
		setTask_price("");
		setEnd_Date("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (description !== "" && mechanicals !== "" && hour !== "" && task_price !== ""){
			registerTask();
			handleClose();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (selectedlabor.id != null && selectedlabor.enddate_labor != null){		
			setShow(true);  
		}else{
			alert("Not labor selected or end date stablished for that labor");
		}
	} 

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Add Task (+) {selectedlabor.type != null && <span className="badge bg-success"> for {selectedlabor.type} labor </span>}
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert task data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input type="text" value={description}
				  onChange={(e) => setDescription(e.target.value)}
				  className="form-control mt-2"
				  placeholder="e.g: Trash can"
				/>
				<input type="text" value={mechanicals}
				  onChange={(e) => setMechanicals(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of workers (e.g: 6)"
				/>
				<input type="text" value={hour}
				  onChange={(e) => setHour(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of hour (e.g: 2 or 4)"
				/>
				<input type="email" value={task_price}
				  onChange={(e) => setTask_price(e.target.value)}
				  className="form-control mt-2"
				  placeholder="Price fro the work (e.g: 1200)"
				/>
				<label> Set-up deadline dir task </label>
				<div className="day">
					<DatePicker 
						showIcon
						minDate={new Date(selectedlabor.inidate_labor != "" ? selectedlabor.inidate_labor : new Date())}	
						maxDate={new Date(selectedlabor.enddate_labor != "" ? selectedlabor.enddate_labor : new Date())}
						selected={end_date} 
						onChange={(date) => setEnd_Date(date)} 
						dateFormat="Pp"
					/>
				</div>
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Save task
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}