import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";

const ProjectTable = (props) => {

	const { token } = useContext(Context);
    const [projects, setProjects] = useState([]); 	
	
	useEffect(()=> {
        fetchProjects();
    }, []);
		
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
				console.log({"Response ":response.data});	
				setProjects(response.data);
				console.log({"Loaded projects to Table successfuly ":projects});	
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});			  
	}
	
	const deleteProject = async (project) => {		 
		
		if (project.id != ""){
			await axios({
				method: 'delete',
				url: "/delete_project/" + project.id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Project Successfuly deleted");
					alert({"Project Successfuly deleted": project.name});	
				}else {
					console.log("Project delete Failed, please try again");	
					alert({"Project Successfuly deleted": project.name});	
				}
			}).catch((error) => {
				alert("Something bad happend with server");	
			});
		}else{
			alert("Please select a material...");	
		}
	}	
	
	const renderTableData = () => {
		return projects?.map((project, index) => (
				<tr className="row-md" key={project.id}>
					<th scope="row">{index + 1}</th>
					<td>{project.project_name}</td>
					<td>{project.desc_proj}</td>
					<td>{project.manager}</td>
					<td>{project.mail_manager}</td>
					<td>{moment(project.initial_date).format("MMM Do YYYY")}</td>
					<td>{moment(project.update_date).format("MMM Do YYYY")}</td>
					<td>{moment(project.end_date).format("MMM Do YYYY")}</td>	
					<td> 
						<div className="row">	
							<div className="col-sm-5">						
								<button 
									type="button" 
									className="btn btn-info btn-sm" 							
									onClick={(e) => props.setProject(project)}> 
										Upd
								</button><br/>
							</div>
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-danger btn-sm" 							
									onClick={(e) => deleteProject(project)}> 
										Del
								</button>
							</div>
						</div>			
					</td>
				</tr>
			));
		}

	return (
		<div className>            	
            <div className="table-responsive-md">
				<table className="table table-striped table-bordered ">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>	
							<th scope="col">Name</th>							
							<th scope="col">Description</th>
							<th scope="col">Manager</th>
							<th scope="col">Email</th>							
							<th scope="col">Initial date</th>
							<th scope="col">Update date</th>
							<th scope="col">End date</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody className="table-group-divider">						
						{renderTableData()}
					</tbody>
				</table>
			</div>          
        </div>
	);  
}

export default ProjectTable;