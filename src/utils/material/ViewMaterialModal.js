import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ViewMaterialModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [materials, setMaterials] = useState([]);	
	
		
	const fetchMaterials = async (id) => {					
		
		await axios({
			method: 'get',
			url: '/read_materials_by_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Materials successfuly readed for Labor": id});
				setMaterials(response.data);				
			}else {
				alert("Read materials failed, please try again");	
			}
		}).catch((error) => {
			alert({"An error ocurr with Labor": id});	
		});		
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleSave = () => {
		if (materials != null){
			savePDF();
		}else{
			alert("There is not materials to print");
		}
	}

	const handleShow = () => {
		if (props.id != null){	
			fetchMaterials(props.id);
			setShow(true);  
		}else{
			alert("Not labor selected yet");
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
				</tr>
			));
		}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Materials view
		</Button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Materials view 
				</Modal.Title>
			</Modal.Header>
			<Modal.Body> 	
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
							</tr>
						</thead>
						<tbody className="table-group-divider">						
							{renderTableData()}
						</tbody>
					</table>
				</div>    
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Save PDF
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}