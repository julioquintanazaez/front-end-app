import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborInsert = ( ) => {
	
	const { token } = useContext(Context);	
	const [type, setType] = useState(""); 
	
	const registerLabor = async () => {
		
		if (type != ""){
			await axios({
				method: 'post',
				url: '/create_labor/',
				data: {
					type: type,				
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("Labor data inserted successfuly ");				
				}else {
					console.log("Insert labor Failed, please try again");			
				}
			}).catch((error) => {
				console.log({"An error ocurr ": error});
			});	
		}else{
			alert("Please enter the parameters or be sure to click in project selector ...");	
		}		  
	}
	
	const handleSubmitLabor = (event) => {
		event.preventDefault();
		registerLabor();		
	}
	
	return (				
		<form className="form" onSubmit={handleSubmitLabor}>			
			
			<label>ENTER LABOR TYPE</label>
			<input type="text" value={type}
			  onChange={(e) => setType(e.target.value)}
			  className="form-control mt-2"
			  placeholder="e.g: Demolition"
			/>					
							
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-primary btn-sm"> CREATE LABOR</button>
			</div>				
							
		</form>					
	);	
	
}


export default LaborInsert;