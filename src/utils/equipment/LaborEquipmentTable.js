import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';


const LaborEquipmentTable = (props) => {

	const { token } = useContext(Context);
    const [equipmentslabors, setEquipmentsLabors] = useState([]); 	
	
	useEffect(()=> {
        fetchEquipmentLabor();
    }, []);
		
	const fetchEquipmentLabor = async () => {
		
		await axios({
			method: 'get',
			url: '/read_pl_equipments_query/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setEquipmentsLabors(response.data);
				console.log({"Loaded equipment & labor to Table successfuly ":equipmentslabors});	
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});			  
	}
	
	const deleteEquipmentLabor = async (id) => {		 
		
		if (id != ""){
			await axios({
				method: 'delete',
				url: "/delete_pl_equipment/" + id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Equipment & Labor Successfuly deleted");		
				}else {
					console.log("Equipment & Labor delete Failed, please try again");			
				}
			}).catch((error) => {
				console.log(error);
			});
		}else{
			alert("Please select a material XXX...");	
		}
	}	

	const renderTableData = () => {
		return equipmentslabors?.map((equiplab, index) => (
				<tr className="row-md" key={equiplab.id}>
					<th scope="row">{index + 1}</th>
					<td>{equiplab.equipment}</td>
					<td>{equiplab.quantity}</td>					
					<td>{equiplab.unit_price}</td>	
					<td>{equiplab.amount}</td>	
					<td>{equiplab.type}</td>
					<td>{equiplab.name}</td>				
					<td> 
						<div className="row justify-content-center">
							<div className="d-grid gap-2">
								<div className="col-sm-3">								
									<button 
										type="button" 
										className="btn btn-info btn-sm" 							
										onClick={(e) => props.setSelectedEquipmentLabor(equiplab)}> 
											Upd
									</button><br/>
								</div>
								<div className="col-sm-3">
									<button 
										type="button" 
										className="btn btn-danger btn-sm" 							
										onClick={(e) => deleteEquipmentLabor(equiplab.id)}> 
											Del
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
							<th scope="col">Material</th>				
							<th scope="col">Quantity</th>												
							<th scope="col">Unit price</th>
							<th scope="col">Amount</th>
							<th scope="col">Labor</th>		
							<th scope="col">Project</th>		
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

export default LaborEquipmentTable;