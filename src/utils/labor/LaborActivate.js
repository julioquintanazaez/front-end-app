import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LaborActivate = ( props ) => {
	
	const { token, selectedlabor, setMessages, handleLogout } = useContext(Context);	
	
	
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
				console.log("Labor status successfuly changed");
				setMessages("Labor activated successfully" + Math.random());	
				toast.success("Labor status successfuly changed");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}	
	
	const handleActivityLabor = (event) => {
		event.preventDefault();
		if (props.labor.id != null){
			changeActivityLabor(props.labor);
		}else{
			toast.warning("Not labor selected yet");
		}
	}
	
	if(props.labor.is_active){
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-success"
						onClick={(e) => handleActivityLabor(e)} > 
						Working 
				</button>
			</>
		);
	}else{
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-outline-success"
						onClick={(e) => handleActivityLabor(e)} > 
						Done 
				</button>
			</>
		);
	}
}

export default LaborActivate;