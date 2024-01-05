import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ViewTaskModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [tasks, setTasks] = useState([]);	
	
		
	const fetchTasks = async (id) => {					
		
		await axios({
			method: 'get',
			url: '/read_tasks_by_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Tasks successfuly readed for Labor": id});
				setTasks(response.data);				
			}else {
				alert("Read Tasks failed, please try again");	
			}
		}).catch((error) => {
			alert({"An error ocurr with Labor": id});	
		});		
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleSave = () => {
		if (tasks != null){
			savePDF();
		}else{
			alert("There is not tasks to print");
		}
	}

	const handleShow = () => {
		if (props.id != null){	
			fetchTasks(props.id);
			setShow(true);  
		}else{
			alert("Not labor selected yet");
		}
	}  
	
	const renderTableData = () => {
		return tasks?.map((task, index) => (
				<tr className="row-md" key={task.id}>
					<th scope="row">{index + 1}</th>
					<td>{task.description}</td>
					<td>{task.mechanicals}</td>
					<td>{task.hour}</td>
					<td>{task.task_price}</td>
					<td>{task.hour_men}</td>
					<td>{task.is_active ? "Yes" : "No"}</td>					
				</tr>
			));
		}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Tasks view
		</Button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Tasks view 
				</Modal.Title>
			</Modal.Header>
			<Modal.Body> 	
				<div className="table-responsive-md">
					<table className="table table-striped table-bordered ">
						<thead className="table-dark">
							<tr>
								<th scope="col">#</th>	
								<th scope="col">Description</th>
								<th scope="col">mechanicals</th>
								<th scope="col">hour</th>
								<th scope="col">task_price</th>
								<th scope="col">Hour/men</th>
								<th scope="col">Active</th>
							</tr>
						</thead>
						<tbody className="table-group-divider">						
							{renderTableData()}
						</tbody>
					</table>
				</div>    
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Save PDF
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}