import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { Table } from 'react-bootstrap';

import ProjectActivate from './../project/ProjectActivate.js';
import UpdateProjectModal from './../project/UpdateProjectModal.js';
import ProjectDelete from './../project/ProjectDelete.js';
import UpdateProjectEndDateModal from './../project/UpdateProjectEndDateModal.js';
import ProjectReport from './../report/ProjectReport.js';


export default function ProjectRenderUserTable (  ) {

	const { token, user, isLoggedIn } = useContext(Context);
	const { messages, setMessages } = useContext(Context);
	const { handleLogout } = useContext(Context);
	const { projects, setProjects } = useContext(Context);
	const { selectedproject, setSelectedProject } = useContext(Context);
	
	
	const fetchProjects = async (email) => {
		    
		await axios({
			method: 'get',
			//url: '/read_projects_by_user_email/' + email,
			url: '/read_projects_stats_by_user/',
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
		if (isLoggedIn){
			fetchProjects(user.email);
		}
    }, [messages]);	
		
	
	const renderTableData = () => {
		return projects?.map((project, index) => (
				<tr className="row-md" key={project.id}>
					<th scope="row">{index + 1}</th>	
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-info" 							
										onClick={(e) => setSelectedProject(project) } > 
											Select
									</button>
								</div>
							</div>	
						</div>						
					</td>
					<td>{project.project_name}</td>
					<td>{project.inidate_proj != null ? project.inidate_proj.split('T')[0] : project.inidate_proj}</td>
					<td>{project.enddate_proj != null ? project.enddate_proj.split('T')[0] : project.enddate_proj}</td>
					<td>{project.open_labor_amount}</td>
					<td>{project.close_labor_amount}</td>
					<td>{project.project_amount}</td>
					<td>
						< ProjectActivate project={project} />
					</td>
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									<UpdateProjectModal project={project} />
								</div>
							</div>	
							<div className="col">
								<div className="d-grid gap-2">
									<ProjectDelete project={project} />
								</div>
							</div>	
							<div className="col">
								<div className="d-grid gap-2">
									<UpdateProjectEndDateModal project={project} />
								</div>
							</div>	
						</div>						
					</td>
					<td> 
						<div className="row justify-content-center">								
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
						<th scope="col">Select</th>	
						<th scope="col">Name</th>	
						<th scope="col">Start Date</th>
						<th scope="col">End Date</th>
						<th scope="col">Labor Open Amount</th>
						<th scope="col">Labor Close Amount</th>
						<th scope="col">Total amount</th>
						<th scope="col">Open/Close</th>
						<th scope="col">Actions</th>
						<th scope="col">Report</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}
				</tbody>
			</Table>
		</>
	);
}

