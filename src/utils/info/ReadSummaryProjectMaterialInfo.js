import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadSummaryProjectMaterialInfo ( props )  {
	
	const { token } = useContext(Context);
	const [materials, setMaterials] = useState([]);
	
	const fetchProjectMaterials = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_materials_by_project_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response materials info ":response.data});	
				setMaterials(response.data);			
			}else {
				console.log("Load from server to read materials info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading materials info": error});
		});			  
	}
	
	
	useEffect(()=> {
		if (props.id != null){		
			fetchProjectMaterials(props.id);
		}	
	}, [props]);	
	
	const renderBadgesData = () => {
		return materials?.map((material) => (
			<div>
				{ "Type:" } <span className="badge bg-info">  {material.type} </span>
				{ "Categroy:" } <span className="badge bg-info">  {material.material_type} </span>
				{ "#:" } <span className="badge bg-info">  {material.material_number} </span>
				{ "Amount:" } <span className="badge bg-info">  {material.material_amount} </span>
			</div>
		));
	}
	
	return (							
		<div>
			{ renderBadgesData() }
		</div>
	);
}
