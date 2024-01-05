import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";

import UpdateTaskModal from './UpdateTaskModal.js';



export default function TaskRenderTable ( props ) {

	const { token } = useContext(Context); 
	
	
	const deleteTask = async (task) => {		 
		
		if (task.id != ""){
			await axios({
				method: 'delete',
				url: "/delete_task/" + task.id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Task & Labor Successfuly deleted");
				}else {
					console.log("Task & Labor delete Failed, please try again");
				}
			}).catch((error) => {
				alert("Please select a material...");	
			});
		}else{
			alert("Please select a material...");	
		}
	}	
	
	const changeActivityTask = async (task) => {		 
		
		if (task.id != ""){
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
					console.log("Task & Labor Successfuly changed");		
				}else {
					console.log("Task & Labor delete Failed, please try again");			
				}
			}).catch((error) => {
				console.log(error);
			});
		}else{
			alert("Please select a task...");	
		}
	}	

	const renderTableData = () => {
		return props.tasks?.map((task, index) => (
				<tr className="row-md" key={task.id}>
					<th scope="row">{index + 1}</th>					
					<td>{task.description}</td>
					<td>{task.mechanicals}</td>
					<td>{task.hour}</td>
					<td>{task.hour_men}</td>							
					<td>{task.task_price}</td>		
					<td>{task.type}</td>		
					<div className="col-sm-3">
						<button 
							type="button" 
							className="btn btn-sm btn-outline-success" 							
							onClick={(e) => changeActivityTaskLabor(task)}> 
								{task.is_active ? "On" : "Off"}	
						</button><br/>
					</div>
					<td> 
						<div className="row">	
							<div className="col-sm-4">								
								<UpdateTaskModal task={task} />								
							</div>
							<div className="col-sm-2">
								<button 
									type="button" 
									className="btn btn-sm btn-outline-danger" 							
									onClick={(e) => deleteTask(task)}> 
										Delete
								</button>
							</div>
						</div>						
					</td>
				</tr>
			));
		}

	return (
		<div className>            	
            <div className="table-responsive-md">
				<table className="table table-striped table-bordered ">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>							
							<th scope="col">Description</th>							
							<th scope="col">Mechanicals</th>
							<th scope="col">Hour</th>
							<th scope="col">H/men</th>							
							<th scope="col">Price</th>
							<th scope="col">Labor</th>	
							<th scope="col">Active</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody className="table-group-divider">						
						{renderTableData()}
					</tbody>
				</table>
			</div>          
        </div>
	);  
}

