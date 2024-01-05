import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const ProjectUpdate = (props) => {
	
	const { token } = useContext(Context);	
	const [name, setName] = useState(""); 
	const [description, setDescription] = useState("");
	const [manager, setManager] = useState("");
	const [email, setEmail] = useState("");	
	
	const updateProject = async () => {
		
		if (name != "" && description != "" && manager != 0 && email != 0){
			await axios({
				method: 'put',
				url: "/update_project/" + props.project.id,
				data: {
						name: name,
						description: description,
						manager: manager,	
						mail_manager: email,						
						},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("Project updated successfuly");				
				}else {
					console.log({"Update goes rongs": response.data});			
				}
			}).catch((error) => {
				console.log({"An error ocur": error});
			});		
		}else{
			alert("Please select a equipment...");
		}			
	}
	
	const handleUpdateProject = (event) => {
		event.preventDefault();
		updateProject();		
	}
	
	return (
		<form className="form" onSubmit={handleUpdateProject}>			
	
			<label>UPDATE PROJECT DATA</label>		
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="form-control mt-2"
				placeholder="Insert new name"
			/>
			<label> Old name: {props.project.name} </label>
			<input
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="form-control mt-2"
				placeholder="Insert new description (e.g Some descriptive text)"
			/>
			<label> Old unit: {props.project.description} </label>
			<input
				type="text"
				value={manager}
				onChange={(e) => setManager(e.target.value)}
				className="form-control mt-2"
				placeholder="Insert new manager (e.g Jane Doe)"
			/>
			<label> Old unit: {props.project.manager} </label>
			<input
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="form-control mt-2"
				placeholder="Insert new mail (e.g janedoe@gmail.com)"
			/>
			<label> Old unit price: {props.project.mail_manager} </label>	
							
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-info btn-sm"> UPDATE PROJECT </button>
			</div>				
					
		</form>	
	);	
	
}

export default ProjectUpdate;