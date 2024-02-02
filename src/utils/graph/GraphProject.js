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

export default function GraphProject ( props )  {
	
	const [propsproject, setPropsProject] = useState({});
	const [show, setShow] = useState(false);
	const { token, messages, handleLogout } = useContext(Context);
	const { projects, projectlabors, selectedproject } = useContext(Context);
	const [labortotals, setLaborsTotals] = useState([]);		
	const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
	const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
	const bg_colors = [];	
	const data_values = [];
	const tags_values = []; //['Tasks','Equipments','Materials'];

	const fetchLaborTotals = async (id) => {
		
		await axios({
			method: 'get',
			url: '/stats_amount_by_project/' + id,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				setLaborsTotals(response.data);
				console.log({"Project labors totals:": response.data});
				console.log("Loaded data from labor totals info successfuly ");	
				
			}else {
				console.log("Load from server to read labor totals info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading labor info": error});
			handleLogout();
		});			  
	}		
	
	useEffect(()=> {
		if (props.project.id != null){
			fetchLaborTotals(props.project.id);
		}
    }, [props, projects, messages]);
	
	for (var i=0; i<labortotals.length; i++) {
		data_values.push(Number(labortotals[i]["Total_amount"]));	
		tags_values.push(labortotals[i]["type"]);	
		bg_colors.push(randomRGB());
	}
	
	const projectData = {
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
		if (props.project.id != null){	
			setPropsProject(props.project);
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
					Statistics for {propsproject.project_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>					
				 <Pie
					data={projectData}
					options={{
						responsive: true,
						maintainAspectRatio: false,
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
