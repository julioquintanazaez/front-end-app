import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function ReadEquipmentInfo ( )  {
	
	const { token, selectedlabor, messages, handleLogout } = useContext(Context);
	const [equipment_type, setEquipment_type] = useState("");
	const [equipment_number, setEquipment_number] = useState("");
	const [equipment_amount, setEquipment_amount] = useState("");
	
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
				setEquipment_type(response.data[0].type);
				setEquipment_number(response.data[0].equipment_number);
				setEquipment_amount(response.data[0].equipment_amount);
				console.log({"Loaded data from equipment info successfuly ": response.data[0].type});			
			}else {
				console.log("Load from server to read equipment info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading equipment info": error});
			handleLogout();
		});			  
	}
	
			
	useEffect(()=> {
		if (selectedlabor.id != null){	
			fetchInfo_Equipment(selectedlabor.id);
		}	
	}, [selectedlabor, messages]);
		
	return (							
		<div>
			Equipments #: <span className="badge bg-info">  {equipment_number} </span>
			Total amount: <span className="badge bg-info">  {equipment_amount} </span>
		</div>
	);
}
