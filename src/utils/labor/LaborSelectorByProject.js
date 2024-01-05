import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborSelectorByProject = (props) => {
	
	const { token } = useContext(Context);
	const [labors, setLabors] = useState([]);	
	
	
	const fetchLabors = async (id) => {			
		
		if (id != null){				
		
			await axios({
				method: 'get',
				url: '/read_project_labors/' + id,
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response categories ":response.data});	
					setProjectLabors(response.data);
					console.log({"Loaded categories successfuly ": projectlabors});	
					alert("Read labors successfully");
				}else {
					console.log("Load from server Failed, please try again");			
				}
			}).catch((error) => {
				console.log({"An error ocur": error});
			});	
			
		} else{		
			alert("Not project selected");
		}					
	}	
	
	const fetchClickLabors = (id) => {
		if (id != null){
			fetchLabors(id);	
		}else{		
			alert("Click in some project");
		}
	}
	
	return (							
		<select className="form-control form-control-sm mt-2" id="FormControlSelectCategory" >	
			<option selected>Open to select an option</option>
			{labors?.map(labor => (
				<option 
					key={labor.id}
					value={labor.id}
					onClick={(e) => props.values.setSelectedLabor(labor)}>
					{labor.type}
				</option>
			))}
		</select>					
	);
}

export default LaborSelectorByProject;