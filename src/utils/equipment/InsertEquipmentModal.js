import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function InsertEquipmentModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token } = useContext(Context);	
	const [equipment_name, setEquipment_name] = useState(""); 
	const [equipment_quantity, setEquipment_quantity] = useState("");
	const [equipment_unit_price, setEquipment_unit_price] = useState("");
	
	const registerEquipment = async () => {
		
		await axios({
			method: 'post',
			url: '/create_equipment/',
			data: {
				equipment_name: equipment_name,
				equipment_quantity: equipment_quantity,
				equipment_unit_price: equipment_unit_price,	
				labor_equipment_id: props.id,					
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Equipment data inserted successfuly ");
				alert({"Equipment Successfuly inserted": equipment_name});
				setEquipment_name("");
				setEquipment_quantity("");
				setEquipment_unit_price("");
			}else if (response.status === 500) {
				console.log("Integrity error");
				alert({"Equipment already exist in DB": equipment_name});	
			} else {
				console.log("Insert equipment Failed, please try again");	
				alert({"Insert equipment Failed, please try again": equipment_name});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": equipment_name});
			alert({"An error ocurr ": equipment_name});	
		});	
			  
	}
  
	const handleClose = () => {
		setEquipment_name("");
		setEquipment_quantity("");
		setEquipment_unit_price("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (equipment_name != null && equipment_quantity != null && equipment_unit_price != null){
			registerEquipment();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (props.id != null){		
			setShow(true);  
		}else{
			alert("Not labor selected yet");
		}
	}

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Equipment
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert equipment data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input type="text" value={equipment_name}
				  onChange={(e) => setEquipment_name(e.target.value)}
				  className="form-control mt-2"
				  placeholder="Some name (e.g: Electric Drill)"
				/>
				<input type="text" value={equipment_quantity}
				  onChange={(e) => setEquipment_quantity(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of units (e.g: 15)"
				/>
				<input type="text" value={equipment_unit_price}
				  onChange={(e) => setEquipment_unit_price(e.target.value)}
				  className="form-control mt-2"
				  placeholder="A price (e.g: 120)"
				/>
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Save equipment
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}