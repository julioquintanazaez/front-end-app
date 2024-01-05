import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';


const MaterialLaborTable = (props) => {

	const { token } = useContext(Context);
    const [materialslabors, setMaterialsLabors] = useState([]); 	
	
	useEffect(()=> {
        fetchMaterialLabor();
    }, []);
		
	const fetchMaterialLabor = async () => {
		
		await axios({
			method: 'get',
			url: '/read_pl_materials_query/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setMaterialsLabors(response.data);
				console.log({"Loaded material & labor to Table successfuly ":tasklabor});	
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});			  
	}
	
	const deleteMaterialLabor = async (id) => {		 
		
		if (id != ""){
			await axios({
				method: 'delete',
				url: "/delete_pl_material/" + id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Material & Labor Successfuly deleted");		
				}else {
					console.log("Material & Labor delete Failed, please try again");			
				}
			}).catch((error) => {
				console.log(error);
			});
		}else{
			alert("Please select a material...");	
		}
	}	

	const renderTableData = () => {
		return materialslabors?.map((matlab, index) => (
				<tr className="row-md" key={matlab.id}>
					<th scope="row">{index + 1}</th>
					<td>{matlab.material}</td>					
					<td>{matlab.quantity}</td>	
					<td>{matlab.price}</td>
					<td>{matlab.type_material}</td>
					<td>{matlab.amount}</td>	
					<td>{matlab.type}</td>
					<td>{matlab.name}</td>					
					<td> 
						<div className="row">	
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-info btn-sm" 							
									onClick={(e) => props.setSelectedMaterialLabor(matlab)}> 
										Upd
								</button><br/>
							</div>
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-danger btn-sm" 							
									onClick={(e) => deleteMaterialLabor(matlab.id)}> 
										Del
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
							<th scope="col">Material</th>				
							<th scope="col">Quantity</th>
							<th scope="col">Price</th>							
							<th scope="col">Category</th>
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

export default MaterialLaborTable;