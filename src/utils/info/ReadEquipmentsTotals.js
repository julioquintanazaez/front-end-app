import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadEquipmentsTotals (  )  {
	
	const { token } = useContext(Context);
	const [equipments, setEquipments] = useState([]);
	
	const fetchEquipmentsInfo = async () => {
		
		await axios({
			method: 'get',
			url: '/summary_all_equipments/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response equipments info ":response.data});	
				setEquipments(response.data);
				console.log({"Loaded data from equipments info successfuly ": equipments.length});			
			}else {
				console.log("Load from server to read equipments info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading equipments info": error});
		});			  
	}	
	
	useEffect(()=> {
		fetchEquipmentsInfo();
    }, []);	
	
	const renderBadgesData = () => {
		return equipments?.map((equipment, index) => (
			<div>
				{ "#:" } <span className="badge bg-success">  {equipment.equipment_number} </span>
				{ "Amount:" } <span className="badge bg-success">  {equipment.equipment_amount} </span>
			</div>
		));
	}

	return (							
		<div>
			{ renderBadgesData() }
		</div>
	);
}
