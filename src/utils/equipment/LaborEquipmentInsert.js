import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-day-picker/dist/style.css'

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';


const LaborEquipmentInsert = ( props ) => {
	
	const { token } = useContext(Context);	
	const [equipment, setEquipment] = useState("");
	const [quantity, setQuantity] = useState("");
	const [unit_price, setUnit_Price] = useState("");
	
	const registerLaborEquipment = async () => {
		
		if (props.values.project_id != null && props.values.labor_id != null){

			await axios({
				method: 'post',
				url: '/create_pl_equipment/',
				data: {
					equipment: equipment,	
					quantity: quantity,	
					unit_price: unit_price,	
					labor_id: props.values.labor_id,
					project_id: props.values.project_id,
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("Labor & Equipment data inserted successfuly ");				
				}else {
					console.log("Insert Labor & Equipment Failed, please try again");			
				}
			}).catch((error) => {
				console.log("An error ocurr ");
			});	
		}else{
			alert("Please enter the parameters..." + props.values.project_id + " & "+ props.values.labor_id);			
		}		  
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		registerLaborEquipment();		
	}
	
	return (				
		<form className="form" onSubmit={handleSubmit}>			
			
			<label> ENTER EQUIPMENT & LABOR DESCRIPTION </label>
			<input type="text" value={equipment}
			  onChange={(e) => setEquipment(e.target.value)}
			  className="form-control mt-2"
			  placeholder="Equipment name #(e.g: Cracher)"
			/>
			
			<input type="text" value={quantity}
			  onChange={(e) => setQuantity(e.target.value)}
			  className="form-control mt-2"
			  placeholder="Quantity #(e.g: 25)"
			/>
			
			<input type="text" value={unit_price}
			  onChange={(e) => setUnit_Price(e.target.value)}
			  className="form-control mt-2"
			  placeholder="Unit price #(e.g: 15)"
			/>
								
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-primary btn-sm"> CREATE EQUIPMENT </button>
			</div>																				
						
		</form>					
	);	
	
}


export default LaborEquipmentInsert;