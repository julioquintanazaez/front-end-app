import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function UpdateTaskModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token, setMessages, handleLogout } = useContext(Context);	
	const [mechanicals, setMechanicals] = useState("");
	const [hour, setHour] = useState("");
	const [task_price, setTask_price] = useState("");
	
	const updateTask = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_task/" + id,
			data: {
				mechanicals: mechanicals,	
				hour: hour,	
				task_price: task_price,					
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Task data updated successfuly ");
				setMechanicals("");
				setHour("");
				setTask_price("");
				setMessages("Task updated succesffully");
				alert("Task data updated successfuly");	
			}else {
				console.log("Update task failed, please try again");	
				alert("Update task failed, please try again");	
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			alert("An error ocurr ");	
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setMechanicals("");
		setHour("");
		setTask_price("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (mechanicals !== "" && hour != null && task_price != null){
			updateTask(props.task.id);
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (props.task.id != null){		
			setShow(true);  
		}else{
			alert("Not task selected yet");
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
					Update task {props.task.description}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>				
				<input type="text" value={mechanicals}
				  onChange={(e) => setMechanicals(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of workers (e.g: 3)"
				/>
				<label> Old unit: {props.task.mechanicals} </label>		

				<input type="text" value={hour}
				  onChange={(e) => setHour(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of hour (e.g: 2)"
				/>
				<label> Old unit: {props.task.hour} </label>	

				<input type="text" value={task_price}
				  onChange={(e) => setTask_price(e.target.value)}
				  className="form-control mt-2"
				  placeholder="a price value (e.g: 1200)"
				/>
				<label> Old unit: {props.task.task_price} </label>	
				
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Update task
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}