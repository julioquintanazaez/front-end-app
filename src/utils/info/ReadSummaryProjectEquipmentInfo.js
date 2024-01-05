import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadSummaryProjectEquipmentInfo ( props )  {
	
	const { token } = useContext(Context);
	const [equipments, setEquipments] = useState([]);
	
	const fetchProjectEquipments = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_equipments_by_project_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response equipments info ":response.data});	
				setEquipments(response.data);
				console.log({"Loaded data from equipments info successfuly ": response.data[0].type});			
			}else {
				console.log("Load from server to read equipments info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading equipments info": error});
		});			  
	}
	
		
	useEffect(()=> {
		if (props.id != null){	
			fetchProjectEquipments(props.id);
		}	
	}, [props]);
			
	const renderBadgesData = () => {
		return equipments?.map((equipment, index) => (
			<div>
				{ "Type:" } <span className="badge bg-info">  {equipment.type} </span>
				{ "#:" } <span className="badge bg-info">  {equipment.equipment_number} </span>
				{ "Amount:" } <span className="badge bg-info">  {equipment.equipment_amount} </span>
			</div>
		));
	}
	
	return (							
		<div>
			{ renderBadgesData() }
		</div>
	);
}
