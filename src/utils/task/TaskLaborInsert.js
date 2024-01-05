import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-day-picker/dist/style.css'
import "react-datepicker/dist/react-datepicker.css";

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import { format } from "date-fns";
import { DayPicker, DateFormatter } from "react-day-picker";
import DatePicker from "react-datepicker";
import axios from 'axios';


const TaskLaborInsert = ( props ) => {
	
	const { token } = useContext(Context);	
	const [description, setDescription] = useState("");
	const [hour, setHour] = useState(""); 
	const [price, setPrice] = useState("");
	const [mechanicals, setMechanicals] = useState("");	
	
	const registerTaskLabor = async () => {
		
		if (props.values.project_id != null && props.values.labor_id != null){

			await axios({
				method: 'post',
				url: '/create_pl_task/',
				data: {
					description: description,
					mechanicals: mechanicals,
					hour: hour,
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
					console.log("Task and Labor data inserted successfuly ");
					alert({"Task and Labor data inserted successfuly ": props.values.project_id + " & "+ props.values.labor_id});	
				
				}else {
					console.log("Insert Task and Labor Failed, please try again");	
					alert({"Insert Task and Labor Failed, please try again": props.values.project_id + " & "+ props.values.labor_id});	
				}
			}).catch((error) => {
				console.log({"An error ocurr ": props.values.project_id + " & "+ props.values.labor_id});
				alert("Something happend with server conection..." + props.values.project_id + " & "+ props.values.labor_id);			
			});	
		}else{
			alert("Please enter the parameters..." + props.values.project_id + " & "+ props.values.labor_id);			 
		}		  
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		registerTaskLabor();		
	}

	/*
	let footer = <p> Please pick a day </p>;
	if (end_date){
		footer = <p> You picked {format(end_date, 'PP')} </p>;
	}
	*/
	
	return (				
		<form className="form" onSubmit={handleSubmit}>			
			
			<label> ENTER TASK DESCRIPTION </label>
			<input type="text" value={description}
			  onChange={(e) => setDescription(e.target.value)}
			  className="form-control mt-2"
			  placeholder="e.g: Some description"
			/>
			<input type="text" value={mechanicals}
			  onChange={(e) => setMechanicals(e.target.value)}
			  className="form-control mt-2"
			  placeholder="a number of workers (e.g: 10)"
			/>
			<input type="text" value={hour}
			  onChange={(e) => setHour(e.target.value)}
			  className="form-control mt-2"
			  placeholder="A number of hour (e.g 10)"
			/>
			<input type="text" value={price}
			  onChange={(e) => setPrice(e.target.value)}
			  className="form-control mt-2"
			  placeholder="How much for that task (e.g: $1200)"
			/><br/>
				
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-primary btn-sm"> CREATE TASK </button>
			</div>				
				
		</form>					
	);	
	
}


export default TaskLaborInsert;