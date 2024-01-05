import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const ProjectSelector = (props) => {
	
	const { token } = useContext(Context);
	const [projects, setProjects] = useState([]);
	
	const fetchProjects = async () => {
		
		await axios({
			method: 'get',
			url: '/read_projects/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response projects ":response.data});	
				setProjects(response.data);
				console.log({"Loaded projects successfuly ": projects});			
			}else {
				console.log("Load from server Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});			  
	}
	
	useEffect(()=> {
		fetchProjects();
    }, []);	
	
	return (							
		<select className="form-control form-control-sm mt-2" id="FormControlSelectProject" >	
			<option selected>Open to select an option</option>
			{projects?.map(project => (
				<option 
					key={project.id}
					value={project.id}
					onClick={(e) => props.setSelectedProject(project)}>
					{project.project_name}
				</option>
			))}
		</select>					
	);
}

export default ProjectSelector;