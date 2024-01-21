import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';

import ReadUserNumberProjectsInfo from './../info/ReadUserNumberProjectsInfo.js';

export default function ViewTableProjectModal( ) {
	
	const [show, setShow] = useState(false);

	//const { token, user, setSelectedProject, projects } = useContext(Context);
	const { token, user, isLoggedIn } = useContext(Context);
	const { messages, setMessages } = useContext(Context);
	const { handleLogout } = useContext(Context);
	const { projects, setProjects } = useContext(Context);
	const { selectedproject, setSelectedProject } = useContext(Context);
	
	const fetchProjects = async (email) => {				
		await axios({
			method: 'get',
			url: '/read_projects_by_user_email/' + email,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response projects ":response.data});	
				setProjects(response.data);
				console.log({"Load projects from view project modal successfuly ": projects});
			}else {
				console.log("Load from server Failed in nav routing, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur in nav routing": error});
			handleLogout();
		});								
	}	
	
	useEffect(()=> {
		if (isLoggedIn){
			fetchProjects(user.email);
		}
    }, [messages]);	
	
	
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		setShow(true);
	}  
	
	const handleSet = (project) => {
		setSelectedProject(project)
		setShow(false);
	}  
	
	const renderTableData = () => {
		return projects?.map((project, index) => (
				<tr className="row-md" key={project.id}>
					<th scope="row">{index + 1}</th>					
					<td>{project.project_name}</td>
					<td>{project.inidate_proj != null ? project.inidate_proj.split('T')[0] : project.inidate_proj}</td>
					<td>{project.enddate_proj != null ? project.enddate_proj.split('T')[0] : project.enddate_proj}</td>
					<td>{project.is_active ? "Active" : "Not Active"}</td>		
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-info" 							
										onClick={(e) => handleSet(project) } > 
											Pick
									</button>
								</div>
							</div>							
						</div>						
					</td>
				</tr>
			));
		}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Show your projects < ReadUserNumberProjectsInfo />
		</Button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Projects list
				</Modal.Title>
			</Modal.Header>
			<Modal.Body> 	
			
				<Table className="table" striped bordered hover size="sm" responsive>
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>							
							<th scope="col">Name</th>	
							<th scope="col">Start Date</th>
							<th scope="col">End Date</th>
							<th scope="col">Open</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">						
						{renderTableData()}
					</tbody>
				</Table>
				
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>						  
			</Modal.Footer>
			</Modal>
		</>
	);
}