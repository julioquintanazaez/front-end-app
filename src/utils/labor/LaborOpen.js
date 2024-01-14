import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborOpen = ( props ) => {
	
	const { token } = useContext(Context);	
	
	const changeOpenStatusLabor = async (labor) => {		
		
		await axios({
			method: 'put',
			url: "/open_status_labor/" + labor.id,
			data: {
					is_open: labor.is_open ? false : true						
					},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Labor open status successfuly changed");		
			}else {
				console.log("Labor open status change failed, please try again");			
			}
		}).catch((error) => {
			console.log(error);
		});
	}	
	
	const handleStatusLabor = (event) => {
		event.preventDefault();
		if (props.labor.id != null){
			changeOpenStatusLabor(props.labor);
		}else{
			alert("Not labor selected yet");
		}
	}
	
	if(props.labor.is_open){
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-success"
						onClick={(e) => handleStatusLabor(e)} > 
						Close 
				</button>
			</>
		);
	}else{
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-outline-success"
						onClick={(e) => handleStatusLabor(e)} > 
						Open 
				</button>
			</>
		);
	}
}

export default LaborOpen;