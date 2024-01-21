import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { Table } from 'react-bootstrap';

import UpdateMaterialModal from './UpdateMaterialModal.js';


export default function MaterialRenderTable ( props ) {

	const { token, handleLogout, selectedlabor } = useContext(Context); 
	const { messages, setMessages } = useContext(Context); 
	const [materials, setMaterials] = useState([]);
	
	const fetchMaterials = async (id) => {
		
		await axios({
			method: 'get',
			url: '/read_materials_by_labor_id/' + id,             //
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setMaterials(response.data);
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
			fetchMaterials(selectedlabor.id);
		}
    }, [selectedlabor, messages]);	
	
	const deleteMaterial = async (id) => {		 
		
		if (id !== ""){
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
					setControlUpdates(handleControlUpdate());
					alert("Material delete successfuly");
				}else {
					console.log("Material delete Failed, please try again");
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
		return materials?.map((material, index) => (
				<tr className="row-md" key={material.id}>
					<th scope="row">{index + 1}</th>					
					<td>{material.material_name}</td>
					<td>{material.material_type}</td>
					<td>{material.material_quantity}</td>
					<td>{material.material_price}</td>
					<td>{material.material_amount}</td>			
					<td> 
						<div className="row justify-content-center">	
							<div className="col">	
								<div className="d-grid gap-2">															
									<UpdateMaterialModal material={material} />								
								</div>
							</div>
							<div className="col">
								<div className="d-grid gap-2">		
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
            <Table className="table table-striped table-bordered" responsive>
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
			</Table>   
        </div>
	);  
}

