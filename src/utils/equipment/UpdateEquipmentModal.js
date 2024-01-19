import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function UpdateEquipmentModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token, setMessages, handleLogout } = useContext(Context);	
	const [equipment_quantity, setEquipment_quantity] = useState("");
	const [equipment_unit_price, setEquipment_unit_price] = useState("");
	
	const updateEquipment = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_equipment/" + id,
			data: {
				equipment_quantity: equipment_quantity,	
				equipment_unit_price: equipment_unit_price,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Equipment data updated successfuly ");
				setEquipment_quantity("");
				setEquipment_unit_price("");
				alert("Equipment data updated successfuly");
				setMessages("Equipment updated successfuly")
			}else {
				console.log("Update Equipment failed, please try again");	
				alert("Update Equipment failed, please try again");	
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			alert("An error ocurr ");	
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setEquipment_quantity("");
		setEquipment_unit_price("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (equipment_quantity !== "" && equipment_unit_price !== ""){
			updateEquipment(props.equipment.id);
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (props.equipment.id != null){		
			setShow(true);  
		}else{
			alert("Not equipment selected yet");
		}
	}
	
	return (
		<>
		<button className="btn btn-sm btn-outline-warning" onClick={handleShow}>
			Update
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Update equipment {props.equipment.equipment_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>				
				<input type="text" value={equipment_quantity}
				  onChange={(e) => setEquipment_quantity(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of units (e.g: 3)"
				/>
				<label> Old unit: {props.equipment.equipment_quantity} </label>		

				<input type="text" value={equipment_unit_price}
				  onChange={(e) => setEquipment_unit_price(e.target.value)}
				  className="form-control mt-2"
				  placeholder="price per unit (e.g: 2)"
				/>
				<label> Old unit: {props.equipment.equipment_unit_price} </label>
				
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Update equipment
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}