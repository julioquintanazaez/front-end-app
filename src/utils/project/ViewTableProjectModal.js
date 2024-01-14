import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ViewTableProjectModal( ) {
	
	const [show, setShow] = useState(false);

	const { token, user, setSelectedProject } = useContext(Context);	
	const { setControlUpdates, handleControlUpdate } = useContext(Context);	
	const [projects, setProjects] = useState([]);	
	
		
	const fetchUserProjects = async (email) => {					
		
		await axios({
			method: 'get',
			url: '/read_projects_by_user_email/' + email,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Project successfuly readed for user");
				setProjects(response.data);
				setControlUpdates(handleControlUpdate());
			}else {
				console.log("Read project failed, please try again");	
				alert("Read project failed, please try again");	
			}
		}).catch((error) => {
			console.log("An error ocurr with project");
			alert("An error ocurr with project");	
		});		
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		fetchUserProjects(user.email);
		setShow(true);
	}  
	
	const handleSet = (project) => {
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
							<div className="col-sm-6">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-info" 							
										onClick={(e) => setSelectedProject(project) } > 
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
			Search your projects
		</Button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Projects list
				</Modal.Title>
			</Modal.Header>
			<Modal.Body> 	
			
				<div className="table-responsive-md">
					<table className="table table-striped table-bordered ">
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
					</table>
				</div>  
				
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