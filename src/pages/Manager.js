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
import ProjectRenderTable from './../utils/project/ProjectRenderTable.js';
import ProjectActivate from './../utils/project/ProjectActivate.js';

//Handle Labor 
import InsertLaborModal from './../utils/labor/InsertLaborModal.js';
import ViewLaborModal from './../utils/labor/ViewLaborModal.js';
import UpdateLaborModal from './../utils/labor/UpdateLaborModal.js';
import LaborDelete from './../utils/labor/LaborDelete.js';
import LaborActivate from './../utils/labor/LaborActivate.js';
import LaborRenderTable from './../utils/labor/LaborRenderTable.js';

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

//Reports
import LaborReport from './../utils/report/LaborReport.js';
import EquipmentReport from './../utils/report/EquipmentReport.js';
import MaterialReport from './../utils/report/MaterialReport.js';
import TaskReport from './../utils/report/TaskReport.js';



const Manager = () => {	
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn, mainproject, setMainProject } = useContext(Context);
	const navigate = useNavigate();
	
	const [selectedproject, setSelectedProject] = useState({});	
	const [selectedlabor, setSelectedLabor] = useState({}); 
	
	const [projects, setProjects] = useState([]); 
	const [projectlabors, setProjectLabors] = useState([]); 
	const [tasks, setTask] = useState([]);
	const [equipments, setEquipments] = useState([]);
	const [materials, setMaterials] = useState([]);
	
	const fetchProjects = async () => {				
		await axios({
			method: 'get',
			url: '/read_projects/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response projects ":response.data});	
				setProjects(response.data);
				console.log({"Load projects successfuly ": projects});
				//alert("Load projects successfuly");
			}else {
				console.log("Load from server Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
		});								
	}	
	
	useEffect(()=> {
		fetchProjects();
    }, [projectlabors]);	
	
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
		} 					
	}

	useEffect(()=> {
		fetchLabors(selectedproject.id);
    }, [selectedproject]);		
	
	const updateTables = () => {
		fetchTasks(selectedlabor.id);	
		fetchEquipments(selectedlabor.id);
		fetchMaterials(selectedlabor.id);		
	}
		
	useEffect(()=> {
		if (selectedlabor.id != null){
			updateTables();
		}
    }, [selectedlabor]);	
	
	return (
		
		<div className="container-fluid-md">			
			<div className="row">
			
				<div className="col-sm">											
					<Navigation />											
				</div><br/>
				
				<div className="col-sm-10"><br/>
					
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<a class="navbar-brand" href="#">Home</a>
							<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>
							<div class="collapse navbar-collapse" id="navbarNav">
								<ul class="navbar-nav">
									<li class="nav-item">
									  <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
									</li>
									<li class="nav-item">
									  <a class="nav-link" href="#">Manager</a>
									</li>
									<li class="nav-item">
									  <a class="nav-link" href="#">About</a>
									</li>
									<li class="nav-item">
									  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Administrator</a>
									</li>
								</ul>
							</div>
							<button 
								type="button" 
								className="btn btn-sm btn-secondary" 							
								onClick={(e) => logoutUser()}> 
									LogOut
							</button>
						</div>
					</nav><br/>
					
					<div class="col-sm-10">
					
						<div class="container overflow-hidden"><br/>
							
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border bg-light">
									
										< ProjectRenderTable values={{projects: projects, setSelectedProject: setSelectedProject}} />
										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div class="row">
												<div class="col col-sm-6">
													<h3> {selectedproject.project_name} </h3>	 	
												</div>	
												<div class="container col text-end">
													<UpdateProjectModal project={selectedproject} />
													<ProjectDelete id={selectedproject.id} />
													<ProjectActivate project={selectedproject} />
												</div>	
											</div>
										</div><br/>
										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											<InsertProjectModal />									
										</div>	
										
									</div>									
								</div>
							</div><br/>
							
							<div class="row gx-5">
								<div class="col">
									<div class="p-3 border bg-light">
										
										< LaborRenderTable values={{labors: projectlabors, setSelectedLabor: setSelectedLabor}} />
										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div class="row">
												<div class="col col-sm-6">
													<h3> {selectedlabor.type} </h3>	 	
												</div>	
												<div class="container col text-end">
													<UpdateLaborModal labor={selectedlabor} />
													<LaborDelete id={selectedlabor.id} />
													<LaborActivate labor={selectedlabor} />
												</div>	
											</div>
										</div><br/>
												
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											<InsertLaborModal id={selectedproject.id} />									
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
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div class="row">
												<div class="col col-sm text-end">
													<TaskReport id={selectedlabor.id} />
												</div>												
											</div>
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
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div class="row">
												<div class="col col-sm text-end">
													<EquipmentReport id={selectedlabor.id} />
												</div>												
											</div>
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
												<div class="col col-sm text-end">
													<MaterialReport id={selectedlabor.id} />
												</div>												
											</div>
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
										<div className="d-grid gap-2">
											<div class="container col text-end">
												<LaborReport id={selectedlabor.id} />
											</div>	
										</div>	
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
