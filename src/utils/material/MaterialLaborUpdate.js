import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const MaterialLaborUpdate = (props) => {
	
	const { token } = useContext(Context);	
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState(""); 
	
	const updateMaterialLabor = async () => {
		
		if (props.selectedmateriallabor.id != null){
			await axios({
				method: 'put',
				url: "/update_pl_material/" + props.selectedmateriallabor.id,
				data: {
					quantity: quantity,
					price: price,	
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("Laboo & Task data updated successfuly");				
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
	
	const handleUpdateMaterialLabor = (event) => {
		event.preventDefault();
		updateMaterialLabor();		
	}
	
	return (
		<form className="form" onSubmit={handleUpdateMaterialLabor}>			
			
			<label>UPDATE TASK & LABOR DATA</label>		
			<input type="text" value={quantity}
			  onChange={(e) => setQuantity(e.target.value)}
			  className="form-control mt-2"
			  placeholder="Enter new quantity (e.g: 8)"
			/>
			<label> Old quantity: {props.selectedmateriallabor.quantity} </label>
			<input type="text" value={price}
			  onChange={(e) => setPrice(e.target.value)}
			  className="form-control mt-2"
			  placeholder="Enter material price (e.g: 10)"
			/>
			<label> Old price #: {props.selectedmateriallabor.price} </label>
									
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-info btn-sm"> UPDATE DATA </button>
			</div>				
					
		</form>	
	);	
	
}

export default MaterialLaborUpdate;