import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDelete = ( props ) => {
	
	const { token } = useContext(Context);
	const { selectedproject, setSelectedProject, setSelectedLabor, setMessages, handleLogout } = useContext(Context);	
	
	
	const deleteProject = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/delete_project/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project Successfuly deleted");		
				setSelectedProject({});
				setSelectedLabor({});
				setMessages("Project deleted successfully" + Math.random());
				toast.success("Project delete successfuly");
			}else {
				console.log("Project delete failed, please try again");	
				toast.danger("Project delete failed, please try again");				
			}
		}).catch((error) => {
			console.log("Error conecting with backend server or with submited data, project ID: " + selectedproject.id);
			console.log(error);
			toast.warning("An error ocurr");
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.project.id != null){
			deleteProject(props.project.id);
		}else{
			toast.warning("Not project selected to delete");	
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