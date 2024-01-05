import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";


const TaskLaborTable = (props) => {

	const { token } = useContext(Context);
    const [taskslabors, setTasksLabors] = useState([]); 	
	
	useEffect(()=> {
        fetchTaskLabor();
    }, []);
		
	const fetchTaskLabor = async () => {
		
		await axios({
			method: 'get',
			url: '/read_tasks/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setTasksLabors(response.data);
				//console.log({"Loaded task & labor to Table successfuly ":tasklabor});	
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");					
				//alert({"Load Failed, please try again": tasklabor.description});	
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			alert({"An error ocur": "Server side"});
		});			  
	}
	
	const deleteTaskLabor = async (tsklab) => {		 
		
		if (tsklab.id != ""){
			await axios({
				method: 'delete',
				url: "/delete_task/" + tsklab.id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Task & Labor Successfuly deleted");	
					//alert({"Task Successfuly deleted": tsklab.description});	
				}else {
					console.log("Task & Labor delete Failed, please try again");
					//alert({"Task delete Failed, please try again": tsklab.description});	
				}
			}).catch((error) => {
				alert("Please select a material...");	
			});
		}else{
			alert("Please select a material...");	
		}
	}	
	
	const changeActivityTaskLabor = async (tsklab) => {		 
		
		if (tsklab.id != ""){
			await axios({
				method: 'put',
				url: "/activate_task/" + tsklab.id,
				data: {
						is_active: tsklab.is_active ? false : true						
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
		return taskslabors?.map((tsklab, index) => (
				<tr className="row-md" key={tsklab.id}>
					<th scope="row">{index + 1}</th>					
					<td>{tsklab.description}</td>
					<td>{tsklab.mechanicals}</td>
					<td>{tsklab.hour}</td>
					<td>{tsklab.hour_men}</td>							
					<td>{tsklab.task_price}</td>		
					<td>{tsklab.type}</td>		
					<div className="col-sm-3">
						<button 
							type="button" 
							className="btn btn-info btn-sm bt-success" 							
							onClick={(e) => changeActivityTaskLabor(tsklab)}> 
								{tsklab.is_active ? "On" : "Off"}	
						</button><br/>
					</div>
					<td> 
						<div className="row">	
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-info btn-sm" 							
									onClick={(e) => props.setSelectedTaskLabor(tsklab)}> 
										Upd
								</button><br/>
							</div>
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-danger btn-sm" 							
									onClick={(e) => deleteTaskLabor(tsklab)}> 
										Del
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

export default TaskLaborTable;