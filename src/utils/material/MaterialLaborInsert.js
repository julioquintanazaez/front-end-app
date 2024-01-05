import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-day-picker/dist/style.css'

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import { format } from "date-fns";
import { DayPicker, DateFormatter, DatePicker } from "react-day-picker";
import axios from 'axios';


const MaterialLaborInsert = ( props ) => {
	
	const { token } = useContext(Context);	
	const [material, setMaterial] = useState(""); 
	const [quantity, setQuantity] = useState("");
	const [type_material, setType_Material] = useState(""); 
	const [price, setPrice] = useState("");
	
	const options = ["Ducts", "Sensors and Accessories", "Other Materials", "Equipments"]
	
	const registerMaterialLabor = async () => {
		
		if (props.values.project_id != null && props.values.labor_id != null){

			await axios({
				method: 'post',
				url: '/create_pl_material/',
				data: {
					quantity: quantity,
					material: material,
					type_material: type_material,
					price: price,
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
					console.log("Material and Labor data inserted successfuly ");				
				}else {
					console.log("Insert Material and Labor Failed, please try again");			
				}
			}).catch((error) => {
				console.log({"An error ocurr ": props.values.project_id + " & "+ props.values.labor_id});
			});	
		}else{
			alert("Please enter the parameters..." + props.values.project_id + " & "+ props.values.labor_id);			
		}		  
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		registerMaterialLabor();		
	}

	
	
	return (				
		<form className="form" onSubmit={handleSubmit}>			
			
			<label> ENTER MATERIAL DESCRIPTION </label>
			
			<input type="text" value={material}
			  onChange={(e) => setMaterial(e.target.value)}
			  className="form-control mt-2"
			  placeholder="A material name (e.g: Rectangular ducts)"
			/>
			<input type="text" value={quantity}
			  onChange={(e) => setQuantity(e.target.value)}
			  className="form-control mt-2"
			  placeholder="e.g: enter quantity # (e.g 35)"
			/>
			<select className="form-control form-control-sm mt-2" id="FormControlSelectCategory" >	
				<option selected>Open to select an option</option>
				{options?.map(opt => (
					<option 
						key={opt}
						value={opt}
						onClick={(e) => setType_Material(e.target.value)}>
						{opt}
					</option>
				))}
			</select>	
			<input type="text" value={price}
			  onChange={(e) => setPrice(e.target.value)}
			  className="form-control mt-2"
			  placeholder="A price (e.g 2)"
			/>										
									
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-primary btn-sm"> ADD MATERIAL </button>
			</div>				
						
		</form>					
	);	
	
}


export default MaterialLaborInsert;