import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const ProjectDelete = ( ) => {
	
	const { token } = useContext(Context);
	const { selectedproject, setSelectedProject, setSelectedLabor, setMessages, handleLogout } = useContext(Context);	
	
	
	const deleteProject = async () => {			
		
		await axios({
			method: 'delete',
			url: "/delete_project/" + selectedproject.id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project Successfuly deleted");		
				alert("Project delete successfuly");
				setSelectedProject({});
				setSelectedLabor({});
				setMessages("Project deleted successfully" + Math.random());
			}else {
				console.log("Project delete failed, please try again");			
			}
		}).catch((error) => {
			console.log("Error conecting with backend server or with submited data, project ID: " + selectedproject.id);
			console.log(error);
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (selectedproject.id != null){
			deleteProject();
		}else{
			alert("Not project selected to delete");
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

export default ProjectDelete;