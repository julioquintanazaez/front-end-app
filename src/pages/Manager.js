import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';
import axios from 'axios';

//Components
import Navigation from './../components/MainNavbar.js'; 

//Handle project
import ProjectSelector from './../utils/project/ProjectSelector.js';
import ProjectDelete from './../utils/project/ProjectDelete.js';
import InsertProjectModal from './../utils/project/InsertProjectModal.js';
import UpdateProjectModal from './../utils/project/UpdateProjectModal.js';

//Handle Labor 
import InsertLaborModal from './../utils/labor/InsertLaborModal.js';
import ViewLaborModal from './../utils/labor/ViewLaborModal.js';
import UpdateLaborModal from './../utils/labor/UpdateLaborModal.js';
import LaborDelete from './../utils/labor/LaborDelete.js';
import LaborActivate from './../utils/labor/LaborActivate.js';

//Handle Task 
import InsertTaskModal from './../utils/task/InsertTaskModal.js';
import TaskRenderTable from './../utils/task/TaskRenderTable.js';

//Handle Equipment 
import InsertEquipmentModal from './../utils/equipment/InsertEquipmentModal.js';
import EquipmentRenderTable from './../utils/equipment/EquipmentRenderTable.js';

//Handle Material 
import InsertMaterialModal from './../utils/material/InsertMaterialModal.js';
import MaterialRenderTable from './../utils/material/MaterialRenderTable.js';

//Info
import ReadTaskInfo from './../utils/info/ReadTaskInfo.js';
import ReadEquipmentInfo from './../utils/info/ReadEquipmentInfo.js';
import ReadMaterialInfo from './../utils/info/ReadMaterialInfo.js';
import ReadSummaryProjectTaskInfo from './../utils/info/ReadSummaryProjectTaskInfo.js';
import ReadSummaryProjectEquipmentInfo from './../utils/info/ReadSummaryProjectEquipmentInfo.js';
import ReadSummaryProjectMaterialInfo from './../utils/info/ReadSummaryProjectMaterialInfo.js';

import ReadSummaryMaterialsInfo from './../utils/info/ReadSummaryMaterialsInfo.js';
import ReadSummaryTasksInfo from './../utils/info/ReadSummaryTasksInfo.js';
import ReadSummaryEquipmentsInfo from './../utils/info/ReadSummaryEquipmentsInfo.js';

import ReadMateiralsProjectsTotals from './../utils/info/ReadMateiralsProjectsTotals.js';
import ReadTasksProjectsTotals from './../utils/info/ReadTasksProjectsTotals.js';
import ReadEquipmentsProjectsTotals from './../utils/info/ReadEquipmentsProjectsTotals.js';

import ReadTasksTotals from './../utils/info/ReadTasksTotals.js';
import ReadMateiralsTotals from './../utils/info/ReadMateiralsTotals.js';
import ReadEquipmentsTotals from './../utils/info/ReadEquipmentsTotals.js';

import ReadItemsTable from './../utils/info/ReadItemsTable.js';

//Reports
import LaborReport from './../utils/report/LaborReport.js';




const Manager = () => {	
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn } = useContext(Context);
	const navigate = useNavigate();
	
	const [selectedproject, setSelectedProject] = useState({});
	const [projectlabors, setProjectLabors] = useState([]); 
	const [selectedlabor, setSelectedLabor] = useState({}); 
	
	const [tasks, setTask] = useState([]);
	const [equipments, setEquipments] = useState([]);
	const [materials, setMaterials] = useState([]);
	
	const fetchTasks = async (id) => {
		
		await axios({
			method: 'get',
			url: '/read_tasks_by_labor_id/' + id,              //
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setTask(response.data);
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");	
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			alert({"An error ocur": "Server side"});
		});			  
	}
	
	const fetchEquipments = async (id) => {
		
		await axios({
			method: 'get',
			url: '/read_equipments_by_labor_id/' + id,        //
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setEquipments(response.data);
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");	
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			alert({"An error ocur": "Server side"});
		});			  
	}
	
	const fetchMaterials = async (id) => {
		
		await axios({
			method: 'get',
			url: '/read_materials_by_labor_id/' + id,             //
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setMaterials(response.data);
				console.log("Data was readed successfuly from database");				
			}else {
				console.log("Load Failed, please try again");	
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			alert({"An error ocur": "Server side"});
		});			  
	}
	
	const handleOnClickTask = (labor) => {
		if (labor.id != null){
			setSelectedLabor(labor)
			fetchTasks(labor.id);	
			fetchEquipments(labor.id);
			fetchMaterials(labor.id);
		}else{		
			alert("Click in some labor");
		}
	}
	
	const fetchLabors = async (id) => {				
		if (id != null){				
			await axios({
				method: 'get',
				url: '/read_labors_by_project_id/' + id,
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response categories ":response.data});	
					setProjectLabors(response.data);
					console.log({"Loaded categories successfuly ": projectlabors});	
					alert("Read labors successfully");
				}else {
					console.log("Load from server Failed, please try again");			
				}
			}).catch((error) => {
				console.log({"An error ocur": error});
			});				
		} else{		
			alert("Not project selected");
		}					
	}	
	
	const fetchOnClickProjectLabors = (selectedproject) => {
		if (selectedproject.id != null){
			fetchLabors(selectedproject.id);	
		}else{		
			alert("Click in some project");
		}
	}
	
	//console.log({"Project and Labor selected": selectedproject.project_name + "  " + selectedlabor.id + " " + tasks.length});
	
	
	return (
		
		<div className="container-fluid-md">			
			<div className="row">
			
				<div className="col-sm">											
					<Navigation />											
				</div><br/>
				
				<div className="col-sm-10"><br/>
					
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<a class="navbar-brand" href="#">Navbar</a>
							<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>
							<div class="collapse navbar-collapse" id="navbarNav">
								<ul class="navbar-nav">
									<li class="nav-item">
									  <a class="nav-link active" aria-current="page" href="#">Home</a>
									</li>
									<li class="nav-item">
									  <a class="nav-link" href="#">Features</a>
									</li>
									<li class="nav-item">
									  <a class="nav-link" href="#">Pricing</a>
									</li>
									<li class="nav-item">
									  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
									</li>
								</ul>
							</div>
						</div>
					</nav><br/>
					
					<div class="col-sm-10">
					
						<div class="container overflow-hidden"><br/>
		
							<div class="row">
								<div class="col-sm-6">
									<div class="card" style={{width: "30rem"}}>
										<h5 class="card-header"> Projects </h5>
										<div class="card-body">
											
											Tasks info:
											< ReadSummaryTasksInfo />											
											Equipments info:
											< ReadSummaryEquipmentsInfo />		
											Materials info:
											< ReadSummaryMaterialsInfo />											

											Tasks Totals:
											< ReadTasksTotals />											
											Equipments Totals:
											< ReadEquipmentsTotals />		
											Materials Totals:
											< ReadMateiralsTotals />	
											
										</div>
										<div class="card-footer text-muted"> 2 days ago  </div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="card" style={{width: "30rem"}}>
										<h4 class="card-header"> {selectedproject.project_name} </h4>
										<div class="card-body">
											
											<ReadSummaryProjectTaskInfo id={selectedproject.id} />
											Equipments info:
											<ReadSummaryProjectEquipmentInfo id={selectedproject.id} />
											Materials info:
											<ReadSummaryProjectMaterialInfo id={selectedproject.id} />	
											
										</div>
									</div>
								</div>
							</div><br/>
						
						
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border bg-light">
										Your projects:
										<ProjectSelector setSelectedProject={setSelectedProject} /><br/>
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											<InsertLaborModal id={selectedproject.id} />
											<ViewLaborModal id={selectedproject.id} />											
										</div>	
									</div>
									
								</div>
							</div><br/>
							
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border bg-light">
										Labors from project: {selectedproject.project_name}
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">													
											<button type="button" className="btn btn-sm btn-info" 							
												onClick={(e) => fetchOnClickProjectLabors(selectedproject)}> 
													Search...
											</button>													
										</div>
										<select className="form-control form-control-sm mt-2" id="FormControlSelectCategory" >
											<option selected>Open to select an option</option>
											{projectlabors?.map(labor => (
												<option 
													key={labor.id}
													value={labor.id}
													onClick={(e) => handleOnClickTask(labor)}>
													{labor.type}
												</option>
											))}
										</select><br/>
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<UpdateLaborModal labor={selectedlabor} />
											<LaborDelete id={selectedlabor.id} />
											<LaborActivate labor={selectedlabor} />
										</div>	
									</div>											
								</div>
							</div><br/>
							
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border bg-light">
										Tasks from labor: {selectedlabor.type}
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<TaskRenderTable tasks={tasks} />			
										</div>									
										<div className="form-control form-control-sm mt-2" id="ButtonTaskLabor">
											<div class="row">
												<div class="col col-sm-3">
													<InsertTaskModal id={selectedlabor.id} />	 	
												</div>												
												<div class="container col text-end">
													<ReadTaskInfo id={selectedlabor.id} />
												</div>
											</div>
										</div>									
									</div>
								</div>
							</div><br/>
							
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border bg-light">
										Equipments from labor: {selectedlabor.type}
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<EquipmentRenderTable equipments={equipments} />			
										</div>									
										<div className="form-control form-control-sm mt-2" id="ButtonEquipmentLabor">		
											<div class="row">
												<div class="col col-sm-3">
													<InsertEquipmentModal id={selectedlabor.id} />	  	
												</div>												
												<div class="container col text-end">
													<ReadEquipmentInfo id={selectedlabor.id} />
												</div>
											</div>
										</div>								
									</div>
								</div>
							</div><br/>
							
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border">
										Materials from labor: {selectedlabor.type}
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<MaterialRenderTable materials={materials} />	
										</div>									
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div class="row">
												<div class="col col-sm-3">
													<InsertMaterialModal id={selectedlabor.id} />
												</div>												
												<div class="container col text-end">
													<ReadMaterialInfo id={selectedlabor.id} />	
												</div>
											</div>
										</div>									
									</div>
								</div>
							</div><br/>
							
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border bg-light">										
										<div class="container col text-end">
											<LaborReport id={selectedlabor.id} />
										</div>
										Labors statistics:
										<ReadItemsTable	id={selectedlabor.id} />								
									</div>
								</div>
							</div><br/>
						</div>
						
					</div>	
				</div>				
			</div>		
			
		</div>		
			
	);
  
}

export default Manager
