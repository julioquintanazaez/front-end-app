import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborDelete = ( props ) => {
	
	const { token } = useContext(Context);	
	
	const deleteLabor = async () => {		 
		
		if (props.id != ""){
			await axios({
				method: 'delete',
				url: "/delete_labor/" + props.id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Labor successfuly deleted");		
				}else {
					console.log("Labor delete failed, please try again");			
				}
			}).catch((error) => {
				console.log("Error conecting with backend server or with submited data: " + props.id);
				console.log(error);
			});
		}else{
			alert("Please select a project...");	
		}
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.id != null){
			deleteLabor();
		}else{
			alert("Not project selected yet");
		}
	}
	
	return (	
		<>
			<button type="submit" 
					className="btn btn-sm btn-danger"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Delete 
			</button>
		</>
	);
}

export default LaborDelete;