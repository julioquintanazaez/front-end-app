import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
//import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import {Modal, Button} from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphLabor ( props )  {
	
	const [propslabor, setPropsLabor] = useState({});
	const [show, setShow] = useState(false);
	const { token, messages, handleLogout } = useContext(Context);
	const { projects, selectedlabor } = useContext(Context);
	const [labor, setLabor] = useState({});
	const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
	const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
	const bg_colors = [];	
	const data_values = [];
	const tags_values = ['Tasks','Equipmets','Materials'];
	
	const fetchLaborStatistics = async (id) => {
		
		await axios({
			method: 'get',
			url: '/summary_amount_labor_id/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				setLabor(response.data[0]);
				console.log("Loaded data from labor totals statistics successfuly ");			
			}else {
				console.log("Load from server to labor totals statistics failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading labor totals statistics": error});
			handleLogout();
		});			  
	}		
	
	useEffect(()=> {
		if (props.labor.type != null){
			fetchLaborStatistics(props.labor.id);
		}
    }, [props, projects, messages]);	
	
	for (var i=0; i<3; i++) {
		bg_colors.push(randomRGB());
	}
	
	data_values.push(Number(labor["task_price"]));	
	data_values.push(Number(labor["equipment_amount"]));	
	data_values.push(Number(labor["material_amount"]));	
	
	const laborData = {
		labels: tags_values,
		datasets: [{
			label: "Amount",
			data: data_values,
			backgroundColor: bg_colors, 
			borderWidth: 1,
			borderColor: 'rgb(53, 162, 235)',
			hoverBorderWidth: 3,
			hoverBorderColor: 'rgb(53, 162, 235)',
			hoverOpacity: 1
		}]
	}
	
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.labor.id != null){	
			setPropsLabor(props.labor);
			setShow(true);  
		}
	}

	return (							
		<>
			<Button className="nextButton btn-sm" onClick={handleShow}>
				Stats
			</Button>
			<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					Statistics for {propslabor.type}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>					
				 <Pie
					data={laborData}
					options={{
						responsive: true,
						maintainAspectRatio: true,
						title:{
							display: true,
							text: 'Items',
							fontSize: '20'
						},
						legend: {
							display: true,
							position: 'right'
						}	
					}}
				/>			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>						  
			</Modal.Footer>
			</Modal>
		</>
		
	);
}
