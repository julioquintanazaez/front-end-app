import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import moment from "moment";
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});			  
	}
	
	useEffect(()=> {
		if (selectedlabor.id != null){
			fetchMaterials(selectedlabor.id);
		}
    }, [selectedlabor, messages]);	
	
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
					setMessages("Delete material"  + Math.random());
					toast.success("Material delete successfuly");
				}else {
					toast.danger("Material delete Failed, please try again");
				}
			}).catch((error) => {
				toast.danger("Something happend with server conexion");
				handleLogout();
			});
		}else{
			toast.danger("Please select a material");
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

