import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const ProjectActivate = ( props ) => {
	
	const { token } = useContext(Context);	
	
	const changeActivityProject = async (project) => {		
		
		await axios({
			method: 'put',
			url: "/activate_project/" + project.id,
			data: {
					is_active: project.is_active ? false : true						
					},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project successfuly changed");		
			}else {
				console.log("Project activation failed, please try again");			
			}
		}).catch((error) => {
			console.log(error);
		});
	}	
	
	const handleActivityProject = (event) => {
		event.preventDefault();
		if (props.project.id != null){
			changeActivityProject(props.project);
		}else{
			alert("Not project selected to activate");
		}
	}
	
	if(props.project.is_active){
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-success"
						onClick={(e) => handleActivityProject(e)} > 
						Activate 
				</button>
			</>
		);
	}else{
		return (	
			<>
				<button type="btn" 
						className="btn btn-sm btn-outline-success"
						onClick={(e) => handleActivityProject(e)} > 
						Activate 
				</button>
			</>
		);
	}
}

export default ProjectActivate;