import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborEquipmentUpdate = (props) => {
	
	const { token, setMessages, handleLogout } = useContext(Context);	
	const [quantity, setQuantity] = useState("");
	const [unit_price, setUnit_Price] = useState("");
		
	
	const updateEquipmentLabor = async () => {
		
		if (props.selectedequipmentlabor.id != null){
			await axios({
				method: 'put',
				url: "/update_pl_equipment/" + props.selectedequipmentlabor.id,
				data: {
					quantity: quantity,		
					unit_price: unit_price,		
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("Labor & Equipment data updated successfuly");	
					setMessages("Equipment updated successfuly")
				}else {
					console.log({"Update goes rongs": response.data});			
				}
			}).catch((error) => {
				console.log({"An error ocur": error});
			});		
		}else{
			alert("Please select a equipment...");
		}			
	}
	
	const handleUpdateEquipmentLabor = (event) => {
		event.preventDefault();
		updateEquipmentLabor();		
	}
	
	return (
		<form className="form" onSubmit={handleUpdateEquipmentLabor}>			
			
			<label>UPDATE EQUIPMENT & LABOR DATA</label>
			<input type="text" value={quantity}
			  onChange={(e) => setQuantity(e.target.value)}
			  className="form-control mt-2"
			  placeholder="a quantity # (e.g: 10)"
			/>	
			<label> Old quantity: {props.selectedequipmentlabor.quantity} </label>	
			
			<input type="text" value={unit_price}
			  onChange={(e) => setUnit_Price(e.target.value)}
			  className="form-control mt-2"
			  placeholder="the unit price # (e.g: 10)"
			/>	
			<label> Old quantity: {props.selectedequipmentlabor.unit_price} </label>	
							
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-info btn-sm"> UPDATE DATA </button>
			</div>				
						
		</form>	
	);	
	
}

export default LaborEquipmentUpdate;