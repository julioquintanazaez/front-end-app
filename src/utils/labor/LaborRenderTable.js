import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { Table } from 'react-bootstrap';

import LaborReport from './../report/LaborReport.js'; 
import LaborActivate from './../labor/LaborActivate.js'; 
import LaborDelete from './../labor/LaborDelete.js'; 
import UpdateLaborModal from './../labor/UpdateLaborModal.js'; 
import GraphLabor from './../graph/GraphLabor.js';

export default function LaborRenderTable ( ) {

	const { token, handleLogout, isAdmin } = useContext(Context);
	const { selectedlabor, setSelectedLabor } = useContext(Context);   
	const { projectlabors, setProjectLabors } = useContext(Context);   
	const { selectedproject } = useContext(Context);   
	const { messages, setMessages } = useContext(Context); 

	const fetchLabors = async (id) => {				
		if (id != null){				
			await axios({
				method: 'get',
				url: '/read_labors_stats_by_project_id/' + id,  
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response labors ":response.data});	
					setProjectLabors(response.data);
					console.log({"Loaded labors successfuly ": projectlabors});					
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});				
		} 					
	}

	useEffect(()=> {
		if (selectedproject.id != null){
			fetchLabors(selectedproject.id);
		}
    }, [selectedproject, messages]);	
		
	const renderTableData = () => {
		return projectlabors?.map((labor, index) => (
				<tr className="row-md" key={labor.id}>
					<th scope="row">{index + 1}</th>	
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-info" 							
										onClick={(e) => setSelectedLabor(labor)} > 
											Select
									</button>
								</div>
							</div>							
						</div>						
					</td>
					<td>{labor.type}</td>
					<td>{labor.desc_labor}</td>					
					<td>{labor.equipment_amount}</td>
					<td>{labor.material_amount}</td>
					<td>{labor.labor_amount}</td>
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									< LaborDelete labor={labor}/>
								</div>
							</div>
						</div>						
					</td>
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									< UpdateLaborModal labor={labor}/>
								</div>
							</div>
						</div>						
					</td>
					{isAdmin &&
					<td>
						< GraphLabor labor={labor} />
					</td>	
					}
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									< LaborReport labor={labor}/>
								</div>
							</div>
						</div>						
					</td>
				</tr>
			));
		}

	return (
		<div className>            	
			<Table className="table table-striped table-bordered" responsive>
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>	
						<th scope="col">Select</th>
						<th scope="col">Type</th>							
						<th scope="col">Description</th>						
						<th scope="col">Equipment amount</th>
						<th scope="col">Material amount</th>
						<th scope="col">Total amount</th>						
						<th scope="col">Delete</th>
						<th scope="col">Update</th>
						{isAdmin &&
						<th scope="col">
							Stats
						</th>	
						}
						<th scope="col">Report</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}
				</tbody>
			</Table>  
        </div>
	);  
}

