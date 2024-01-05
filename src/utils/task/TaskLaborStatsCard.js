import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";


const TaskLaborStatsCard = ( props ) => {

	const { token } = useContext(Context);
    const [taskslabors, setTasksLabors] = useState([]); 	
	
	
	useEffect(()=> {
		fetchTaskLabor();
	}, [props.id]); //props.id
		
	const fetchTaskLabor = async () => {
		
		await axios({
			method: 'get',
			url: '/read_tasks_by_labor_id/' + props.id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setTasksLabors(response.data);
				console.log({"Data was readed successfuly from database": taskslabors});				
			} else if (response.status === 500) {
				console.log({"Response ":response});		
			}else {
				console.log("Load Failed, please try again");	
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			alert({"An error ocur": "Server side"});
		});			  
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

export default TaskLaborStatsCard;