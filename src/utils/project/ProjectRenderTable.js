import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { Table } from 'react-bootstrap';

import ProjectActivate from './../project/ProjectActivate.js';
import ProjectReport from './../report/ProjectReport.js';

export default function ProjectRenderTable ( props ) {

	const { token, user } = useContext(Context);
	const { messages, setMessages } = useContext(Context);
	const { handleLogout } = useContext(Context);
	const { projects, setProjects } = useContext(Context);
	const { selectedproject, setSelectedProject } = useContext(Context);
	
	
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
				setProjects(response.data);
				console.log("Loaded projects to Render Table successfuly ");			
			}else {
				console.log("Load Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			handleLogout();
		});			  
	}

	useEffect(()=> {
        fetchProjects();
    }, [messages]);	
		
	
	const renderTableData = () => {
		return projects?.map((project, index) => (
				<tr className="row-md" key={project.id}>
					<th scope="row">{index + 1}</th>					
					<td>{project.project_name}</td>
					<td>{project.manager}</td>
					<td>{project.inidate_proj != null ? project.inidate_proj.split('T')[0] : project.inidate_proj}</td>
					<td>{project.enddate_proj != null ? project.enddate_proj.split('T')[0] : project.enddate_proj}</td>
					<td>
						< ProjectActivate project={project} />
					</td>
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-info" 							
										onClick={(e) => setSelectedProject(project) } > 
											Pick
									</button>
								</div>
							</div>	
							<div className="col">
								<div className="d-grid gap-2">
									< ProjectReport project={project} />
								</div>
							</div>	
						</div>						
					</td>
				</tr>
			));
		}

	return (
		<>
			<Table className="table" striped bordered hover size="sm" responsive>
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>							
						<th scope="col">Name</th>	
						<th scope="col">Manager</th>	
						<th scope="col">Start Date</th>
						<th scope="col">End Date</th>
						<th scope="col">Open/Close</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}
				</tbody>
			</Table>
		</>
	);
}

