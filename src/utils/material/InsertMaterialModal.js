import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';
import { Form } from 'react-bootstrap';


export default function InsertMaterialModal( props ) {
	
	const [show, setShow] = useState(false);

	const { token, selectedlabor } = useContext(Context);
	const { setControlUpdates, handleControlUpdate } = useContext(Context);		
	const [material_name, setMaterial_name] = useState(""); 
	const [material_type, setMaterial_type] = useState("");
	const [material_quantity, setMaterial_quantity] = useState("");
	const [material_price, setMaterial_price] = useState("");
	
	const options = ["Ducts", "Sensors and Accessories", "Other Materials", "Equipments"]
	
	const registerMaterial = async () => {
		
		await axios({
			method: 'post',
			url: '/create_material/',
			data: {
				material_name: material_name,
				material_type: material_type,
				material_quantity: material_quantity,
				material_price: material_price,				
				labor_material_id: selectedlabor.id,				
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Material data inserted successfuly ");
				alert({"Material Successfuly inserted": material_name});
				setMaterial_name("");
				setMaterial_type("");
				setMaterial_quantity("");
				setMaterial_price("");
				setControlUpdates(handleControlUpdate());
			} else if (response.status === 500) {
				console.log("Integrity error");
				alert({"Material already exist in DB": material_name});	
			} else {
				console.log("Insert material Failed, please try again");	
				alert({"Insert material Failed, please try again": material_name});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": material_name});
			alert({"An error ocurr ": material_name});	
		});
	}
  
	const handleClose = () => {
		setMaterial_name("");
		setMaterial_type("");
		setMaterial_quantity("");
		setMaterial_price("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (material_name != null && material_type != null && material_quantity != null && material_price != null){
			registerMaterial();
		}else{
			alert("Some missing parameters");
		}
	}

	const handleShow = () => {
		if (selectedlabor.id != null){		
			setShow(true);  
		}else{
			alert("Not labor selected yet");
		}
	}

	return (
		<>
		<Button className="btn btn-sm" onClick={handleShow}>
			Material
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Insert material data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
				<input type="text" value={material_name}
				  onChange={(e) => setMaterial_name(e.target.value)}
				  className="form-control mt-2"
				  placeholder="A name (e.g: Rectangular ducks)"
				/>
				<Form.Label>Select a role</Form.Label>
				<Form.Control 
						as="select" 
						onClick={(e) => setMaterial_type(e.target.value)}
						>
						{options?.map(opt => (
							<option key={opt} value={opt} >
								{opt}
							</option>
						))}						
				</Form.Control>
				<input type="text" value={material_quantity}
				  onChange={(e) => setMaterial_quantity(e.target.value)}
				  className="form-control mt-2"
				  placeholder="# of units (e.g: 20)"
				/>
				<input type="email" value={material_price}
				  onChange={(e) => setMaterial_price(e.target.value)}
				  className="form-control mt-2"
				  placeholder="A price (e.g: 120)"
				/>
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Save material
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}