import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadSummaryMaterialsInfo (  )  {
	
	const { token } = useContext(Context);
	const [materials, setMaterials] = useState([]);
			
	const fetchMaterialsInfo = async () => {
		
		await axios({
			method: 'get',
			url: '/summary_all_materials_by_projects/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response equipments info ":response.data});	
				setMaterials(response.data);
				console.log({"Loaded data from equipments info successfuly ": materials.length});			
			}else {
				console.log("Load from server to read equipments info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading equipments info": error});
		});			  
	}
	
	useEffect(()=> {
		fetchMaterialsInfo();
    }, []);	
	
	const renderBadgesData = () => {
		return materials?.map((material, index) => (
			<div>
				{ "Project:" } <span className="badge bg-info">  {material.project_name} </span>	
				{ "Labor:" } <span className="badge bg-info">  {material.type} </span>
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
