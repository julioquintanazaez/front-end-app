import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function CardProjectsTotals (  )  {
	
	const { token, messages, handleLogout } = useContext(Context);
	const { projects, projectlabors, selectedproject } = useContext(Context);
	const [taskstotals, setTasksTotals] = useState({});
	const [equipmentstotals, setEquipmentsTotals] = useState({});
	const [materialstotals, setMaterialsTotals] = useState({});		
	
	
	const fetchTasksTotals = async () => {
		
		await axios({
			method: 'get',
			url: '/summary_tasks_total/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				setTasksTotals(response.data[0]);
				console.log("Loaded data from task totals info successfuly ");			
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});			  
	}	
	
	const fetchEquipmentsTotals = async () => {
		
		await axios({
			method: 'get',
			url: '/summary_equipments_total/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				setEquipmentsTotals(response.data[0]);
				console.log("Loaded data from equipments totals info successfuly ");			
			}else {
				console.log("Load from server to read equipments totals info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading equipments info": error});
			handleLogout();
		});			  
	}	
	
	const fetchMaterialsTotals = async () => {
		
		await axios({
			method: 'get',
			url: '/summary_materials_total/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				setMaterialsTotals(response.data[0]);
				console.log("Loaded data from material totals info successfuly ");			
			}else {
				console.log("Load from server to read material totals info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading materials info": error});
			handleLogout();
		});			  
	}	
	
	useEffect(()=> {
		fetchTasksTotals();
		fetchEquipmentsTotals();
		fetchMaterialsTotals();
    }, [selectedproject, projects, messages]);	
	

	return (							
		<div>
			<div className="col">
				<div className="card">
					<h5 className="card-header">Totals </h5>
					<div className="card-body">
						<div className="row">
							<div className="col col-sm-6">
								<h4 className="card-title text-success">
									Projects #: <span className="badge bg-success"> {projects.length} </span>
								</h4>
							</div>
						</div>
						<div className="row">
							<div className="col col-sm-4">
								<h5 className="card-title">Tasks</h5>
								<p className="card-text text-success">Amount:  $ {taskstotals.task_price}</p>
								<p className="card-text">H/Mens: {taskstotals.hour_men}</p>
								<p className="card-text">Tasks #: {taskstotals.task_number}</p>
							</div>	
							<div className="col col-sm-4">
								<h5 className="card-title">Equipments</h5>
								<p className="card-text text-success">Amount:  $ {equipmentstotals.equipment_amount}</p>
								<p className="card-text">Equipments #: {equipmentstotals.equipment_number}</p>
							</div>	
							<div className="col col-sm-4">
								<h5 className="card-title">Materials</h5>
								<p className="card-text text-success">Amount:  $ {materialstotals.material_amount}</p>
								<p className="card-text">Materials #: {materialstotals.material_number}</p>
							</div>	
						</div><br/>
						<div className="row">
							<h5 className="card-title text-success">Total:  $ {
																taskstotals.task_price + 
																equipmentstotals.equipment_amount + 
																materialstotals.material_amount}
							</h5>
						</div>
					</div>
				</div>
			</div>	
		</div>
	);
}
