import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ReadMateiralsProjectsTotals (  )  {
	
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
				console.log({"Response materials info ":response.data});	
				setMaterials(response.data);
				console.log({"Loaded data from materials info successfuly ": materials.length});			
			}else {
				console.log("Load from server to read materials info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading materials info": error});
		});			  
	}	
	
	useEffect(()=> {
		fetchMaterialsInfo();
    }, []);	
	
	const renderBadgesData = () => {
		return materials?.map((material, index) => (
			<div>
				{ "#:" } <span className="badge bg-success">  {material.material_number} </span>
				{ "Amount:" } <span className="badge bg-success">  {material.material_amount} </span>
			</div>
		));
	}

	return (							
		<div>
			{ renderBadgesData() }
		</div>
	);
}
