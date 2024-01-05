import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadSummaryTasksInfo (  )  {
	
	const { token } = useContext(Context);
	const [tasks, setTasks] = useState([]);
	
	const fetchTasksInfo = async () => {
		
		await axios({
			method: 'get',
			url: '/summary_all_tasks_by_projects/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response task info ":response.data});	
				setTasks(response.data);
				console.log({"Loaded data from task info successfuly ": tasks.length});			
			}else {
				console.log("Load from server to read task info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading task info": error});
		});			  
	}	
	
	useEffect(()=> {
		fetchTasksInfo();
    }, []);	
	
	const renderBadgesData = () => {
		return tasks?.map((task, index) => (
			<div>
				{ "Project:" } <span className="badge bg-info">  {task.project_name} </span>				
				{ "Labor:" } <span className="badge bg-info">  {task.type} </span>
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
