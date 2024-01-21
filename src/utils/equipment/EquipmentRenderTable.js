import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { Table } from 'react-bootstrap';
import { useNavigate } from "react-router";

import UpdateEquipmentModal from './UpdateEquipmentModal.js';

export default function EquipmentRenderTable ( props ) {

	const { token, handleLogout, selectedlabor } = useContext(Context); 
	const { messages, setMessages } = useContext(Context); 
	const [equipments, setEquipments] = useState([]);
	
	const fetchEquipments = async (id) => {
		
		await axios({
			method: 'get',
			url: '/read_equipments_by_labor_id/' + id,        //
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setEquipments(response.data);
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");	
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			alert({"An error ocur": "Server side"});
			handleLogout();
		});			  
	}
	
	useEffect(()=> {
		if (selectedlabor.id != null){
			fetchEquipments(selectedlabor.id);
		}
    }, [selectedlabor, messages]);	
	
	const deleteEquipment = async (id) => {		 
		
		if (id !== ""){
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
					alert("Equipment delete successfuly");
					setMessages("Equipment deleted successfully:" + Math.random());
				}else {
					console.log("Equipment delete Failed, please try again");
				}
			}).catch((error) => {
				alert("Please select a material...");
				handleLogout();
			});
		}else{
			alert("Please select a material...");	
		}
	}	

	const renderTableData = () => {
		return equipments?.map((equipment, index) => (
				<tr className="row-md" key={equipment.id}>
					<th scope="row">{index + 1}</th>					
					<td>{equipment.equipment_name}</td>
					<td>{equipment.equipment_quantity}</td>
					<td>{equipment.equipment_unit_price}</td>
					<td>{equipment.equipment_amount}</td>		
					<td> 
						<div className="row">	
							<div className="col">
								<div className="d-grid gap-2">		
									<UpdateEquipmentModal equipment={equipment} />								
								</div>
							</div>
							<div className="col">
								<div className="d-grid gap-2">		
									<button 
										type="button" 
										className="btn btn-sm btn-outline-danger" 							
										onClick={(e) => deleteEquipment(equipment.id)}> 
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
            <Table className="table table-striped table-bordered" responsive>
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
			</Table>  
        </div>
	);  
}

