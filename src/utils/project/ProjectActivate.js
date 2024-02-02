import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProjectActivate = ( props ) => {
	
	const { token, selectedproject, setMessages, handleLogout, isAdmin } = useContext(Context);	
	
	
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
				setMessages("Project activated succesfully" + Math.random());
				toast.success("Project status changed succesfully");
			}else {
				console.log("Project activation failed, please try again");		
				toast.danger("Project activation failed, please try again");
			}
		}).catch((error) => {
			console.log(error);
			toast.warning("An error ocurr");
			handleLogout();
		});
	}	
	
	const handleActivityProject = (event) => {
		event.preventDefault();
		if (props.project.id != null){
			changeActivityProject(props.project);
		}else{
			toast.warning("Not project selected to activate");
		}
	}
	
	if (isAdmin){
		if(props.project.is_active){
			return (	
				<>
					<button type="btn" 
							className="btn btn-sm btn-success"
							onClick={(e) => handleActivityProject(e)} > 
							Working 
					</button>
				</>
			);
		}else{
			return (	
				<>	
					<button type="btn" 
							className="btn btn-sm btn-secondary"
							onClick={(e) => handleActivityProject(e)} > 
							Close 
					</button>
				</>
			);
		}
	}else{
		if(props.project.is_active){
			return (	
				<>
					<span className="badge bg-success"> Working </span>		
				</>
			);
		}else{
			return (	
				<>	
					<span className="badge bg-secondary"> Close </span>		
				</>
			);
		}
	}
}

export default ProjectActivate;