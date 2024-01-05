import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';

import UpdateLaborModal from './UpdateLaborModal.js';

export default function ViewLaborModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [labors, setLabors] = useState([]);	
	
		
	const fetchLabors = async (id) => {					
		
		await axios({
			method: 'get',
			url: '/read_labors_by_project_id/' + id, //'
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Labor successfuly readed for project": id});
				setLabors(response.data);
			}else {
				console.log("Read labor failed, please try again");	
				alert("Read labor failed, please try again");	
			}
		}).catch((error) => {
			console.log({"An error ocurr with project": id});
			alert({"An error ocurr with project": id});	
		});		
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleSave = () => {
		if (labors != null){
			savePDF();
		}else{
			alert("There is not labors to print");
		}
	}

	const handleShow = () => {
		if (props.id != null){	
			fetchLabors(props.id);
			setShow(true);  
		}else{
			alert("Not project selected yet");
		}
	}  
	
	const renderTableData = () => {
		return labors?.map((labor, index) => (
				<tr className="row-md" key={labor.id}>
					<th scope="row">{index + 1}</th>
					<td>{labor.type}</td>
					<td>{labor.desc_labor}</td>
					<td>{labor.enddate_labor}</td>					
				</tr>
			));
		}

	return (
		<>
		<Button className="btn btn-sm btn-info" onClick={handleShow}>
			Labor view
		</Button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Labor view {props.id}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body> 	
				<div className="table-responsive-md">
					<table className="table table-striped table-bordered ">
						<thead className="table-dark">
							<tr>
								<th scope="col">#</th>	
								<th scope="col">Type</th>
								<th scope="col">Description</th>
								<th scope="col">End Date</th>
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