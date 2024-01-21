import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
//import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphProject (  )  {
	
	const { token, messages, handleLogout } = useContext(Context);
	const { projects, projectlabors, selectedproject } = useContext(Context);
	const [labortotals, setLaborsTotals] = useState([]);		
	const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
	const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
	const bg_colors = [];	
	const data_values = [];
	const tags_values = []; //['Tasks','Equipments','Materials'];

	const fetchLaborTotals = async (id) => {
		
		await axios({
			method: 'get',
			url: '/stats_amount_by_project/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				setLaborsTotals(response.data);
				console.log({"Project labors totals:": response.data});
				console.log("Loaded data from labor totals info successfuly ");	
				
			}else {
				console.log("Load from server to read labor totals info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading labor info": error});
			handleLogout();
		});			  
	}		
	
	useEffect(()=> {
		if (selectedproject.id != null){
			fetchLaborTotals(selectedproject.id);
		}
    }, [selectedproject, projects, messages]);
	
	for (var i=0; i<labortotals.length; i++) {
		data_values.push(Number(labortotals[i]["Total_amount"]));	
		tags_values.push(labortotals[i]["type"]);	
		bg_colors.push(randomRGB());
	}
	
	const projectData = {
		labels: tags_values,
		datasets: [{
			label: selectedproject.project_name,
			data: data_values,
			backgroundColor: bg_colors, //['#FF708D', '#884DFF', '#232E52'], //rgba(53, 162, 235, 0.3)
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
					<h5 className="card-header">{selectedproject.project_name} statistics</h5>
					<div className="card-body">		
					{selectedproject.project_name != null 
						? <Pie
							data={projectData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								title:{
									display: true,
									text: 'selectedproject.project_name',
									fontSize: '20'
								},
								legend: {
									display: true,
									position: 'right'
								}	
							}}
						/>
						: <span className="badge bg-warning"> No project select </span>
					}
					</div>
				</div>
			</div>	
		</div>
	);
}
