import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadMaterialInfo ( )  {
	
	const { token, selectedlabor } = useContext(Context);
	const [materials, setMaterials] = useState([]);
	
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
	
			
	useEffect(()=> {
		if (selectedlabor.id != null){	
			fetchInfo_Material(selectedlabor.id);
		}	
	}, [selectedlabor]);
	
	const renderBadgesData = () => {
		return materials?.map((material, index) => (
			<div>
				{ material.material_type } : <span className="badge bg-info">  {material.material_type_number} </span>
				{ "Materials #:" } <span className="badge bg-info">  {material.material_number} </span>
				{ "Total amount:" } <span className="badge bg-info">  {material.material_amount} </span>
			</div>
		));
	}
		
	return (							
		<div>
			{ renderBadgesData() }
		</div>
	);
}
