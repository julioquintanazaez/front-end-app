import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function UpdateMaterialModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token, setMessages, handleLogout } = useContext(Context);	
	const [material_quantity, setMaterial_quantity] = useState("");
	const [material_price, setMaterial_price] = useState("");
	
	const material = props.material;
	
	const updateMaterial = async (id) => {
		
		await axios({
			method: 'put',
			url: "/update_material/" + id,
			data: {
				material_quantity: material_quantity,	
				material_price: material_price,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Material data updated successfuly ");
				setMaterial_quantity("");
				setMaterial_price("");
				setMessages("Material updated successfully");
				alert("Material data updated successfuly");	
			}else {
				console.log("Update Material failed, please try again");	
				alert("Update Material failed, please try again");	
			}
		}).catch((error) => {
			console.log("An error ocurr ");
			alert("An error ocurr ");	
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setMaterial_quantity("");
		setMaterial_price("");
		setShow(false);
	}
	
	const handleUpdate = () => {
		if (material_quantity !== "" && material_price !== ""){
			updateMaterial(material.id);
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (material.id != null){		
			setShow(true);  
		}else{
			alert("Not material selected yet");
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
					Update material {material.material_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>				
				<input type="text" value={material_quantity}
				  onChange={(e) => setMaterial_quantity(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of units (e.g: 3)"
				/>
				<label> Old unit: {material.material_quantity} </label>		

				<input type="text" value={material_price}
				  onChange={(e) => setMaterial_price(e.target.value)}
				  className="form-control mt-2"
				  placeholder="price per unit (e.g: 2)"
				/>
				<label> Old unit: {material.material_price} </label>
				
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleUpdate}>
					Update material
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}