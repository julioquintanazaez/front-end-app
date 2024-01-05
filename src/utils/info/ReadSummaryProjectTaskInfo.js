import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadSummaryProjectTaskInfo ( props )  {
	
	const { token } = useContext(Context);
	const [tasks, setTasks] = useState([]);
	
	const fetchProjectTasks = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_tasks_by_project_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response task info ":response.data});	
				setTasks(response.data);
				console.log({"Loaded data from task info successfuly ": response.data[0].type});			
			}else {
				console.log("Load from server to read task info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading task info": error});
		});			  
	}
	
	
	useEffect(()=> {
		if (props.id != null){		
			fetchProjectTasks(props.id);
		}
	}, [props]);
	
	const renderBadgesData = () => {
		return tasks?.map((task, index) => (
			<div>
				{ "Type:" } <span className="badge bg-info">  {task.type} </span>
				{ "#:" } <span className="badge bg-info">  {task.task_number} </span>
				{ "H/worker:" } <span className="badge bg-info">  {task.hour_men} </span>
				{ "Amount:" } <span className="badge bg-info">  {task.task_amount} </span>
			</div>
		));
	}
	
	return (							
		<div>
			{ renderBadgesData() }
		</div>
	);
}
