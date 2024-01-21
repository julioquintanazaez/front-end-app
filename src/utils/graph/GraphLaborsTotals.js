import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
//import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphLaborsTotals (  )  {
	
	const { token, messages, handleLogout } = useContext(Context);
	const { projects, projectlabors, selectedproject } = useContext(Context);
	const [labortotals, setLaborsTotals] = useState([]);	
	
	const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
	const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
	const bg_colors = [];	
	const data_values = [];
	const tags_values = []; 
	
	const fetchLaborTotals = async () => {
		
		await axios({
			method: 'get',
			url: '/summary_amount_labor_type/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				setLaborsTotals(response.data);
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
		fetchLaborTotals();
    }, [selectedproject, projects, messages]);	
	
	for (var i=0; i<labortotals.length; i++) {
		data_values.push(Number(labortotals[i]["Total_amount"]));	
		tags_values.push(labortotals[i]["type"]);	
		bg_colors.push(randomRGB());
	}
	
	const laborData = {
		labels: tags_values,
		datasets: [{
			label: "Labors",
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
					<h5 className="card-header">Labors statistics</h5>
					<div className="card-body">						
						{labortotals.length > 0 
							? <Pie
								data={laborData}
								options={{
									responsive: true,
									maintainAspectRatio: true,
									title:{
										display: true,
										text: 'Labors',
										fontSize: '20'
									},
									legend: {
										display: true,
										position: 'right'
									}	
								}}
							/>
							: <span className="badge bg-danger"> No labors to show </span>	
						}	
						<br/>						
					</div>
				</div>
			</div>	
		</div>
	);
}
