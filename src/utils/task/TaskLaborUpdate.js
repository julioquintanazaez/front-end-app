import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const TaskLaborUpdate = (props) => {
	
	const { token } = useContext(Context);	
	const [hour, setHour] = useState(""); 
	const [price, setPrice] = useState("");
	const [mechanicals, setMechanicals] = useState("");		
	
	const updateTaskLabor = async () => {
		
		if (props.selectedtasklabor.id != null){
			await axios({
				method: 'put',
				url: "/update_pl_task/" + props.selectedtasklabor.id,
				data: {
					price: price,					
					mechanicals: mechanicals,
					hour: hour,						
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("Labor & Task data updated successfuly");
					alert({"Labor & Task data updated successfuly": props.selectedtasklabor.type});	
				}else {
					console.log({"Update goes rongs": response.data});	
					alert({"Update goes rongs": props.selectedtasklabor.type});	
				}
			}).catch((error) => {
				console.log({"An error ocur": error});
				alert({"An error ocur": "Server side"});	
			});		
		}else{
			alert("Please select a Labor...");
		}			
	}
	
	const handleUpdateTaskLabor = (event) => {
		event.preventDefault();
		updateTaskLabor();		
	}
	
	return (
		<form className="form" onSubmit={handleUpdateTaskLabor}>			
			
			<label>UPDATE TASK & LABOR DATA</label>		
			<input type="text" value={mechanicals}
			  onChange={(e) => setMechanicals(e.target.value)}
			  className="form-control mt-2"
			  placeholder="a number of workers (e.g: 10)"
			/>
			<label> Old mechanicals #: {props.selectedtasklabor.mechanicals} </label>
			
			<input type="text" value={hour}
			  onChange={(e) => setHour(e.target.value)}
			  className="form-control mt-2"
			  placeholder="A number of hour (e.g 10)"
			/>
			<label> Old hours #: {props.selectedtasklabor.hour} </label>
			
			<input type="text" value={price}
			  onChange={(e) => setPrice(e.target.value)}
			  className="form-control mt-2"
			  placeholder="How much for that task (e.g: $1200)"
			/>	
			<label> Old price: {props.selectedtasklabor.price} </label>	
					
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-info btn-sm"> UPDATE DATA </button>
			</div>				
					
		</form>	
	);	
	
}

export default TaskLaborUpdate;