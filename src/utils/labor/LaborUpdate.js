import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborUpdate = (props) => {
	
	const { token } = useContext(Context);	
	const [type, setType] = useState("");
	
	const updateLabor = async () => {
		
		if (type != ""){
			await axios({
				method: 'put',
				url: "/update_labor/" + props.labor.id,
				data: {
						type: type,						
						},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("Labor updated successfuly");				
				}else {
					console.log({"Update goes rongs": response.data});			
				}
			}).catch((error) => {
				console.log({"An error ocur": error});
			});		
		}else{
			alert("Please select a labor...");
		}			
	}
	
	const handleUpdateLabor = (event) => {
		event.preventDefault();
		updateLabor();		
	}
	
	return (
		<form className="form" onSubmit={handleUpdateLabor}>			
			
			<label>UPDATE LABOR DATA</label>		
			<input
				type="text"
				value={type}
				onChange={(e) => setType(e.target.value)}
				className="form-control mt-2"
				placeholder="Insert new type"
			/>
			<label> Old type: {props.labor.type} </label>					
							
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-info btn-sm"> UPDATE LABOR </button>
			</div>				
						
		</form>	
	);	
	
}

export default LaborUpdate;