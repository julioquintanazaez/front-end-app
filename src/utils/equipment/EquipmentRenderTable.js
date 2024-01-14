import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";

import UpdateEquipmentModal from './UpdateEquipmentModal.js';

export default function EquipmentRenderTable ( props ) {

	const { token } = useContext(Context); 
	const { setControlUpdates, handleControlUpdate } = useContext(Context);	
	
	const deleteEquipment = async (id) => {		 
		
		if (id != ""){
			await axios({
				method: 'delete',
				url: "/delete_equipment/" + id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Equipment Successfuly deleted");
					setControlUpdates(handleControlUpdate());
					alert("Equipment delete successfuly");
					setControlUpdates(handleControlUpdate());
				}else {
					console.log("Equipment delete Failed, please try again");
				}
			}).catch((error) => {
				alert("Please select a material...");	
			});
		}else{
			alert("Please select a material...");	
		}
	}	

	const renderTableData = () => {
		return props.equipments?.map((equipment, index) => (
				<tr className="row-md" key={equipment.id}>
					<th scope="row">{index + 1}</th>					
					<td>{equipment.equipment_name}</td>
					<td>{equipment.equipment_quantity}</td>
					<td>{equipment.equipment_unit_price}</td>
					<td>{equipment.equipment_amount}</td>		
					<td> 
						<div className="row">	
							<div className="col-sm-4">								
								<UpdateEquipmentModal equipment={equipment} />								
							</div>
							<div className="col-sm-2">
								<button 
									type="button" 
									className="btn btn-sm btn-outline-danger" 							
									onClick={(e) => deleteEquipment(equipment.id)}> 
										Delete
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
							<th scope="col">Quantity</th>
							<th scope="col">Unit Price</th>
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

