import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { format } from "date-fns";
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UpdateTaskModal from './UpdateTaskModal.js';


export default function TaskRenderTable ( props ) {

	const { token, selectedlabor, handleLogout } = useContext(Context); 
	const { messages, setMessages } = useContext(Context); 
	const [tasks, setTasks] = useState([]);
	
	const fetchTasks = async (id) => {
		
		await axios({
			method: 'get',
			url: '/read_tasks_by_labor_id/' + id,              //
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setTasks(response.data);
				console.log("Data was readed successfuly from database");				
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});			  
	}
	
	useEffect(()=> {
		if (selectedlabor.id != null){
			fetchTasks(selectedlabor.id);
		}
    }, [selectedlabor, messages]);	
	
	const deleteTask = async (task) => {		 
		let code = task.id;
		if (task.id != null){
			await axios({
				method: 'delete',
				url: "/delete_task/" + task.id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Task successfuly deleted");
					setMessages("Task deleted succesffully" + Math.random());
					toast.success("Task delete successfuly");
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});
		}else{
			toast.warning("Please select a task");
		}
	}	
	
	const changeActivityTask = async (task) => {		 
		
		if (task.id != null){
			await axios({
				method: 'put',
				url: "/activate_task/" + task.id,
				data: {
						is_active: task.is_active ? false : true						
						},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Task successfuly changed");
					setMessages("Task activated succesffully" + Math.random());	
					toast.success("Task status changed succesffully");					
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});
		}else{
			toast.warning("Please select a task to activate");
		}
	}	

	const renderTableData = () => {
		return tasks?.map((task, index) => (
				<tr className="row-md" key={task.id}>
					<th scope="row">{index + 1}</th>					
					<td>{task.description}</td>
					<td>{task.mechanicals}</td>
					<td>{task.hour}</td>
					<td>{task.hour_men}</td>							
					<td>{task.task_price}</td>	
					<div className="col-sm-3">
						<button 
							type="button" 
							className="btn btn-sm btn-outline-success" 							
							onClick={(e) => changeActivityTask(task)}> 
								{task.is_active ? "Working" : "Done"}	
						</button><br/>
					</div>
					<td> 
						<div className="row justify-content-center">
							<div className="col">
								<div className="d-grid gap-2">	
									<UpdateTaskModal task={task} />								
								</div>
							</div>
							<div className="col">
								<div className="d-grid gap-2">		
									<button 
										type="button" 
										className="btn btn-sm btn-outline-danger" 							
										onClick={(e) => deleteTask(task)}> 
											Delete
									</button>
								</div>
							</div>
						</div>						
					</td>
				</tr>
			));
		}

	return (
		<div className>            	
            <Table className="table table-striped table-bordered" responsive>
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>							
						<th scope="col">Description</th>							
						<th scope="col">Mechanicals</th>
						<th scope="col">Hour</th>
						<th scope="col">H/men</th>							
						<th scope="col">Price</th>							
						<th scope="col">Active</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}
				</tbody>
			</Table>   
        </div>
	);  
}

