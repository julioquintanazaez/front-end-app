import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborActivate = ( props ) => {
	
	const { token } = useContext(Context);	
	
	const changeActivityLabor = async (labor) => {		
		
		await axios({
			method: 'put',
			url: "/activate_labor/" + labor.id,
			data: {
					is_active: labor.is_active ? false : true						
					},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor successfuly changed");		
			}else {
				console.log("Labor delete failed, please try again");			
			}
		}).catch((error) => {
			console.log(error);
		});
	}	
	
	const handleActivityLabor = (event) => {
		event.preventDefault();
		if (props.labor.id != null){
			changeActivityLabor(props.labor);
		}else{
			alert("Not labor selected yet");
		}
	}
	
	if(props.labor.is_active){
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-success"
						onClick={(e) => handleActivityLabor(e)} > 
						Activate 
				</button>
			</>
		);
	}else{
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-outline-success"
						onClick={(e) => handleActivityLabor(e)} > 
						Activate 
				</button>
			</>
		);
	}
}

export default LaborActivate;