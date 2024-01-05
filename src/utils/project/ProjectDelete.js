import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const ProjectDelete = ( props ) => {
	
	const { token } = useContext(Context);	
	
	const deleteProject = async () => {		 
		
		if (props.id != ""){
			await axios({
				method: 'delete',
				url: "/delete_project/" + props.id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Project Successfuly deleted");		
				}else {
					console.log("Project delete failed, please try again");			
				}
			}).catch((error) => {
				console.log("Error conecting with backend server or with submited data, project ID: " + props.id);
				console.log(error);
			});
		}else{
			alert("Please select a project...");	
		}
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.id != null){
			deleteProject();
		}else{
			alert("Not project selected yet");
		}
	}
	
	return (	
		<>
			<button type="submit" 
					className="btn btn-sm btn-outline-danger"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Delete 
			</button>
		</>
	);
}

export default ProjectDelete;