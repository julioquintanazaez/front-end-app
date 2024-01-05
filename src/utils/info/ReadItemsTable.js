import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadItemsTable ( props )  {
	
	const { token } = useContext(Context);
	const [materials, setMaterials] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [equipments, setEquipments] = useState([]);
	
	const fetchInfo_Task = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_amount_tasks_by_labor_id/' + id,
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
		
	const fetchInfo_Equipment = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_amount_equipments_by_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response equipment info ":response.data});
				console.log({"Loaded data from equipment info successfuly ": equipments.length});
				setEquipments(response.data);			
			}else {
				console.log("Load from server to read equipment info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading equipment info": error});
		});			  
	}

	const fetchInfo_Material = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_amount_materials_by_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response material info ":response.data});	
				setMaterials(response.data);
				console.log({"Loaded data from material info successfuly ": materials.length});			
			}else {
				console.log("Load from server to read material info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading material info": error});
		});			  
	}
	
	const fetchTotal_Material = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_amount_materials_by_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response material info ":response.data});	
				setMaterials(response.data);
				console.log({"Loaded data from material info successfuly ": materials.length});			
			}else {
				console.log("Load from server to read material info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading material info": error});
		});			  
	}
	
		
	useEffect(()=> {
		if (props.id != null){	
			fetchInfo_Material(props.id);
			fetchInfo_Equipment(props.id);
			fetchInfo_Task(props.id);
		}	
	}, [props]);
	
	const renderEquipmentTableData = () => {
		return equipments?.map((equipment, index) => (
				<tr className="row-md" key={equipment.id}>
					<td>{equipment.equipment_number}</td>
					<td>{equipment.equipment_amount}</td>
				</tr>
			));
		}
		
	const renderTaskTableData = () => {
		return tasks?.map((task, index) => (
				<tr className="row-md" key={task.id}>
					<td>{task.task_number}</td>
					<td>{task.hour_men}</td>
					<td>{task.task_amount}</td>
				</tr>
			));
		}
		
	const renderMaterialTableData = () => {
		return materials?.map((material, index) => (
				<tr className="row-md" key={material.id}>
					<td>{material.material_number}</td>
					<td>{material.material_type}</td>
					<td>{material.material_amount}</td>
				</tr>
			));
		}
		
	return (							
		<div className>            	
            <div className="table-responsive-md">
				<table className="table table-striped table-bordered ">
					<thead className="table-dark">
						<tr>							
							<th scope="col">Items number</th>												
							<th scope="col">Category</th>
							<th scope="col">Amount</th>								
						</tr>
					</thead>
					<tbody className="table-group-divider">						
						{renderMaterialTableData()}
					</tbody>
				</table>
			</div>          
        </div>
	);
}
