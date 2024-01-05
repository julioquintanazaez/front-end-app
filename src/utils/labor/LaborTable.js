import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';


const LaborTable = (props) => {

	const { token } = useContext(Context);
    const [labors, setLabors] = useState([]); 	
	
	useEffect(()=> {
        fetchLabors();
    }, []);
		
	const fetchLabors = async () => {
		
		await axios({
			method: 'get',
			url: '/read_labors/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setLabors(response.data);
				console.log({"Loaded labors to Table successfuly ":labors});	
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});			  
	}
	
	const deleteLabor = async (id) => {		 
		
		if (id != ""){
			await axios({
				method: 'delete',
				url: "/delete_labor/" + id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Labor Successfuly deleted");		
				}else {
					console.log("Labor delete Failed, please try again");			
				}
			}).catch((error) => {
				console.log(error);
			});
		}else{
			alert("Please select a material...");	
		}
	}	

	const renderTableData = () => {
		return labors?.map((labor, index) => (
				<tr className="row-md" key={labor.id}>
					<th scope="row">{index + 1}</th>
					<td>{labor.type}</td>
					<td> 
						<div className="row">	
							<div className="col-sm-6">
								<button 
									type="button" 
									className="btn btn-info btn-sm" 							
									onClick={(e) => props.setLabor(labor)}> 
										Upd
								</button><br/>
							</div>
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-danger btn-sm" 							
									onClick={(e) => deleteLabor(labor.id)}> 
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
							<th scope="col">Type</th>
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

export default LaborTable;