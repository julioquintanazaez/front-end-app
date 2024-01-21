import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function CardProject (  )  {
	
	const { token, messages, handleLogout } = useContext(Context);
	const { projects, projectlabors, selectedproject } = useContext(Context);
	const [labortotals, setLaborsTotals] = useState([]);	
	
	
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
	
	const renderCardBodyData = () => {
		return labortotals?.map((labor, index) => (
			<div className="col col-sm">
				<h5 className="card-title">
					{labor.type} <h7> <span className="badge bg-success"> ${labor.Total_amount} </span> </h7> 
				</h5> 
				<p className="card-text"> Tasks: ${labor.task_price} / H/Mens: {labor.hour_men} / #: {labor.task_number}</p>
				<p className="card-text"> Equipments: ${labor.equipment_amount} / #: {labor.equipment_number}</p>
				<p className="card-text"> Materials: ${labor.material_amount} / #: {labor.material_number}</p>
			</div>
		));
	}

	return (							
		<div>
			<div className="col">
				<div className="card">
					<h5 className="card-header">Labors statistics</h5>
					<div className="card-body">						
						{selectedproject.project_name != null 
							? (
								labortotals.length > 0 
								? renderCardBodyData()
								: <span className="badge bg-danger"> No labors to show </span>								
								)
							: <span className="badge bg-warning"> No project select </span>
						}						
						<br/>						
					</div>
				</div>
			</div>	
		</div>
	);
}
