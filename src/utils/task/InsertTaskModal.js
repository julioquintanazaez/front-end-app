import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function InsertTaskModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [description, setDescription] = useState(""); 
	const [mechanicals, setMechanicals] = useState("");
	const [hour, setHour] = useState("");
	const [task_price, setTask_price] = useState("");
		
	const registerTask = async () => {
		
		await axios({
			method: 'post',
			url: '/create_task/',
			data: {
				mechanicals: mechanicals,
				description: description,
				hour: hour,	
				task_price: task_price,
				labor_task_id: props.id, 
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Task data inserted successfuly ");
				//alert({"Task Successfuly deleted": description});	
				setDescription("");
				setMechanicals("");
				setHour("");
				setTask_price("");
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
		});					  
	}
  
	const handleClose = () => {
		setDescription("");
		setMechanicals("");
		setHour("");
		setTask_price("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (description != null && mechanicals != null && hour != null && task_price != null){
			registerTask();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (props.id != null){		
			setShow(true);  
		}else{
			alert("Not labor selected yet");
		}
	} 

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Task
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