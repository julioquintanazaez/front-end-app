import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';

export default function ViewEquipmentModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [equipments, setEquipments] = useState([]);	
	
		
	const fetchEquipments = async (id) => {					
		
		await axios({
			method: 'get',
			url: '/read_equipments_by_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Equipments successfuly readed for Labor": id});
				setEquipments(response.data);				
			}else {
				alert("Read Equipments failed, please try again");	
			}
		}).catch((error) => {
			alert({"An error ocurr with Labor": id});	
		});		
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleSave = () => {
		if (equipments != null){
			savePDF();
		}else{
			alert("There is not equipment to print");
		}
	}

	const handleShow = () => {
		if (props.id != null){	
			fetchEquipments(props.id);			
			setShow(true);  
		}else{
			alert("Not labor selected yet");
		}
	}  
	
	const renderTableData = () => {
		return equipments?.map((equipment, index) => (
				<tr className="row-md" key={equipment.id}>
					<th scope="row">{index + 1}</th>
					<td>{equipment.equipment_name}</td>
					<td>{equipment.equipment_quantity}</td>
					<td>{equipment.equipment_unit_price}</td>					
				</tr>
			));
		}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Equipments view
		</Button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Equipments view ({equipments.length})
				</Modal.Title>
			</Modal.Header>
			<Modal.Body> 	
				<div className="table-responsive-md">
					<table className="table table-striped table-bordered ">
						<thead className="table-dark">
							<tr>
								<th scope="col">#</th>	
								<th scope="col">Name</th>
								<th scope="col">Quantity</th>
								<th scope="col">Price</th>
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