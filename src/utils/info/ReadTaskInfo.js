import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function ReadTaskInfo ( )  {
	
	const { token, selectedlabor, messages, handleLogout } = useContext(Context);
	const [task_type, setTask_type] = useState("");
	const [task_hourmen, setTask_hourmen] = useState("");
	const [task_number, setTask_number] = useState("");
	const [task_price, setTask_price] = useState("");
	
	const fetchInfo_Task = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_amount_tasks_by_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response task info ":response.data});	
				setTask_type(response.data[0].type);
				setTask_hourmen(response.data[0].hour_men);
				setTask_number(response.data[0].task_number);
				setTask_price(response.data[0].task_price);
				console.log({"Loaded data from task info successfuly ": response.data[0].type});			
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});			  
	}
	
		
	useEffect(()=> {
		if (selectedlabor.id != null){	
			fetchInfo_Task(selectedlabor.id);
		}	
	}, [selectedlabor, messages]);
	
	return (							
		<div>
			Hour/Mens: <span className="badge bg-info"> {task_hourmen} </span>
			Task #: <span className="badge bg-info">  {task_number} </span>
			Total price: <span className="badge bg-info">  {task_price} </span>
		</div>
	);
}
