import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborSelector = (props) => {
	
	const { token } = useContext(Context);
	const [labors, setLabors] = useState([]);
	
	const fetchLabors = async () => {
		
		await axios({
			method: 'get',
			url: '/read_labors/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response categories ":response.data});	
				setLabors(response.data);
				console.log({"Loaded categories successfuly ": labors});			
			}else {
				console.log("Load from server Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});			  
	}
	
	useEffect(()=> {
		fetchLabors();
    }, []);	
	
	return (							
		<select className="form-control form-control-sm mt-2" id="FormControlSelectCategory" >	
			<option selected>Open to select an option</option>
			{labors?.map(labor => (
				<option 
					key={labor.id}
					value={labor.id}
					onClick={(e) => props.setSelectedLabor(labor)}>
					{labor.type}
				</option>
			))}
		</select>					
	);
}

export default LaborSelector;