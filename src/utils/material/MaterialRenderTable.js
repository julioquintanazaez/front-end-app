import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";

import UpdateMaterialModal from './UpdateMaterialModal.js';


export default function MaterialRenderTable ( props ) {

	const { token } = useContext(Context); 
	
	const deleteMaterial = async (id) => {		 
		
		if (id != ""){
			await axios({
				method: 'delete',
				url: "/delete_material/" + id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Material Successfuly deleted");
					alert("Material delete successfuly");
				}else {
					console.log("Material delete Failed, please try again");
				}
			}).catch((error) => {
				alert("Please select a material...");	
			});
		}else{
			alert("Please select a material...");	
		}
	}	

	const renderTableData = () => {
		return props.materials?.map((material, index) => (
				<tr className="row-md" key={material.id}>
					<th scope="row">{index + 1}</th>					
					<td>{material.material_name}</td>
					<td>{material.material_type}</td>
					<td>{material.material_quantity}</td>
					<td>{material.material_price}</td>
					<td>{material.material_amount}</td>			
					<td> 
						<div className="row justify-content-center">	
							<div className="d-grid gap-2">
								<div className="col-sm-3">								
									<UpdateMaterialModal material={material} />								
								</div>
								<div className="col-sm-3">
									<button 
										type="button" 
										className="btn btn-sm btn-outline-danger" 							
										onClick={(e) => deleteMaterial(material.id)}> 
											Delete
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
            <div className="table-responsive-md">
				<table className="table table-striped table-bordered ">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>							
							<th scope="col">Name</th>	
							<th scope="col">Type</th>							
							<th scope="col">Quantity</th>
							<th scope="col">Price</th>
							<th scope="col">Amount</th>	
							<th scope="col">Actions</th>
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

