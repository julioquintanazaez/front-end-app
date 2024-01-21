import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
//import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphProjectsTotals (  )  {
	
	const { token, messages, handleLogout } = useContext(Context);
	const { projects, projectlabors, selectedproject } = useContext(Context);
	const [taskstotals, setTasksTotals] = useState({});
	const [equipmentstotals, setEquipmentsTotals] = useState({});
	const [materialstotals, setMaterialsTotals] = useState({});		
	const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
	const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
	const bg_colors = [];	
	const data_values = [];
	const tags_values = ['Tasks','Equipmets','Materials'];
	
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
			}else {
				console.log("Load from server to read task totals info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading tasks info": error});
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
	
	for (var i=0; i<3; i++) {
		bg_colors.push(randomRGB());
	}
	
	data_values.push(Number(taskstotals["task_price"]));	
	data_values.push(Number(equipmentstotals["equipment_amount"]));	
	data_values.push(Number(materialstotals["material_amount"]));	
	
	const laborData = {
		labels: tags_values,
		datasets: [{
			label: "Project items",
			data: data_values,
			backgroundColor: bg_colors, 
			borderWidth: 1,
			borderColor: 'rgb(53, 162, 235)',
			hoverBorderWidth: 3,
			hoverBorderColor: 'rgb(53, 162, 235)',
			hoverOpacity: 1
		}]
	}

	return (							
		<div>
			<div className="col">
				<div className="card">
					<h5 className="card-header">Projects statistics</h5>
					<div className="card-body">						
						{projects.length > 0 
							? <Pie
								data={laborData}
								options={{
									responsive: true,
									maintainAspectRatio: true,
									title:{
										display: true,
										text: 'Items',
										fontSize: '20'
									},
									legend: {
										display: true,
										position: 'right'
									}	
								}}
							/>
							: <span className="badge bg-danger"> No projects items to show </span>	
						}	
						<br/>						
					</div>
				</div>
			</div>		
		</div>
	);
}
