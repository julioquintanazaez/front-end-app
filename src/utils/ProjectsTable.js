import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect} from 'react';
import axios from 'axios';


const ProjectsTable = (props) => {

    const [projects, setProjects] = useState([]);    
	
	useEffect(()=> {
        fetchProjects();
    }, []);
		
	const fetchProjects = async () => {
		
		await axios({
			method: 'get',
			url: '/read_projects/',
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setProjects(response.data);
				console.log({"Loaded projects to Table successfuly ":projects});	
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Registration Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});			  
	}	
	
	const renderTableData = () => {
		return projects?.map((project, index) => (
				<tr className="row-md" key={project.id}>
					<th scope="row">{index + 1}</th>
					<td>{project.name}</td>
					<td>{project.manager}</td>
					<td>{project.initial_date}</td>
					<td>{project.end_date}</td>
					<td> 
						<button 
							type="button" 
							className="btn btn-danger btn-sm" 
							onClick={() => setPage()}>
								view
						</button>
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
							<th scope="col">Maneger</th>
							<th scope="col">Initial Date</th>
							<th scope="col">End Date</th>
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

export default ProjectsTable;