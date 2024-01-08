import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";



export default function ProjectRenderTable ( props ) {

	const { token } = useContext(Context); 	

	const renderTableData = () => {
		return props.values.projects?.map((project, index) => (
				<tr className="row-md" key={project.id}>
					<th scope="row">{index + 1}</th>					
					<td>{project.project_name}</td>
					<td>{project.is_active ? "Active" : "Not Active"}</td>		
					<td> 
						<div className="row justify-content-center">	
							<div className="col-sm-3">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-outline-info" 							
										onClick={(e) => props.values.setSelectedProject(project)} > 
											Set
									</button>
								</div>
							</div>
							<div className="col-sm-3">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-outline-info" >									
											View
									</button>	
								</div>
							</div>
						</div>						
					</td>
				</tr>
			));
		}

	return (
		<div className>            	
            <div className="table-responsive-sm">
				<table className="table table-striped table-bordered table-sm">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>							
							<th scope="col">Name</th>							
							<th scope="col">Update</th>
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

