import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { Table } from 'react-bootstrap';

import LaborReport from './../report/LaborReport.js'; 


export default function LaborRenderTable ( ) {

	const { token, setSelectedLabor, projectlabors } = useContext(Context); 
		
	const renderTableData = () => {
		return projectlabors?.map((labor, index) => (
				<tr className="row-md" key={labor.id}>
					<th scope="row">{index + 1}</th>					
					<td>{labor.type}</td>
					<td>{labor.desc_labor}</td>
					<td>{labor.inidate_labor != null ? labor.inidate_labor.split('T')[0] : labor.inidate_labor}</td>
					<td>{labor.enddate_labor != null ? labor.enddate_labor.split('T')[0] : labor.enddate_labor}</td>
					<td> 
						<div className="row justify-content-center">	
							<div className="col">
								<div className="d-grid gap-2">
									<button 
										type="button" 
										className="btn btn-sm btn-info" 							
										onClick={(e) => setSelectedLabor(labor)} > 
											Set
									</button>
								</div>
							</div>
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
						<th scope="col">Type</th>							
						<th scope="col">Description</th>
						<th scope="col">Start Date</th>
						<th scope="col">End Date</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}
				</tbody>
			</Table>  
        </div>
	);  
}

