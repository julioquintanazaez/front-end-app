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
import UpdateProjectEndDateModal from './../utils/project/UpdateProjectEndDateModal.js';
import ViewTableProjectModal from './../utils/project/ViewTableProjectModal.js';


//Handle Labor 
import InsertLaborModal from './../utils/labor/InsertLaborModal.js';
import ViewLaborModal from './../utils/labor/ViewLaborModal.js';
import UpdateLaborModal from './../utils/labor/UpdateLaborModal.js';
import LaborDelete from './../utils/labor/LaborDelete.js';
import LaborActivate from './../utils/labor/LaborActivate.js';
import LaborRenderTable from './../utils/labor/LaborRenderTable.js';
import UpdateLaborEndDateModal from './../utils/labor/UpdateLaborEndDateModal.js';

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
//Cards
import CardProjectsTotals from './../utils/info/CardProjectsTotals.js';
import CardLaborsTotals from './../utils/info/CardLaborsTotals.js';
import CardProject from './../utils/info/CardProject.js';
//Graph
import GraphProject from './../utils/graph/GraphProject.js';
import GraphLaborsTotals from './../utils/graph/GraphLaborsTotals.js';
import GraphProjectsTotals from './../utils/graph/GraphProjectsTotals.js';
import GraphLabor from './../utils/graph/GraphLabor.js';


//Reports
import LaborReport from './../utils/report/LaborReport.js';
import EquipmentReport from './../utils/report/EquipmentReport.js';
import MaterialReport from './../utils/report/MaterialReport.js';
import TaskReport from './../utils/report/TaskReport.js';


const Manager = () => {	

	const [tasks, setTasks] = useState([]);
	const [equipments, setEquipments] = useState([]);
	const [materials, setMaterials] = useState([]);		
	
	//From CONTEXT
	const { token, messages, handleLogout  } = useContext(Context);
	const { user, setUser } = useContext(Context);
	const { isLoggedIn, setIsLoggedIn } = useContext(Context);
	const { projects, setProjects } = useContext(Context);	
	const { selectedproject, setSelectedProject } = useContext(Context);	
	const { projectlabors, setProjectLabors } = useContext(Context);
	const { selectedlabor, setSelectedLabor } = useContext(Context);
	const { isAdmin } = useContext(Context);
		
	
	return (
		
		<div className="container-fluid-md">			
			<div className="row">															
				<div className="col-sm">											
					<Navigation />											
				</div>
			</div>	
			
			<div className="row">				
				<div className="col"><br/>					
					<div className="col">					
						<div className="container overflow-hidden"><br/>	
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div className="row justify-content-center">
												<div className="col">		
													<div className="d-grid gap-2">
													
														< ProjectRenderTable />	
														
													</div>
												</div>												
											</div>											
										</div>	
									</div>
								</div>
							</div><br/>
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">																			
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div className="row justify-content-center">											
												<div className="col">		
													<div className="d-grid gap-2">													
														< CardProjectsTotals  />														
													</div>
												</div>												
												<div className="col">	
													<div className="d-grid gap-2">													
														< CardLaborsTotals  />															
													</div>
												</div>
												
												<div className="col">	
													<div className="d-grid gap-2">						
														< CardProject  />									
													</div>
												</div>
											</div>											
										</div>										
									</div>									
								</div>
							</div><br/>
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div className="row justify-content-center">											
												<div className="col">		
													<div className="d-grid gap-2">													
														< GraphProjectsTotals />															
													</div>
												</div>												
												<div className="col">	
													<div className="d-grid gap-2">													
														< GraphLaborsTotals />														
													</div>
												</div>
												
												<div className="col">	
													<div className="d-grid gap-2">						
														< GraphProject />									
													</div>
												</div>
											</div>											
										</div>																														
									</div>
								</div>
							</div><br/>								
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div className="row">
												<div className="col col-sm-6">
													<h3> {selectedproject.project_name} </h3>														
														<h6>
														{selectedproject.project_name != null 
															? <span className="badge bg-success"> main </span>
															: <span className="badge bg-warning"> no project select </span>
														}
														</h6>
												</div>	
												<div className="container col text-end">
													<UpdateProjectModal />
													<ProjectDelete />													
													<UpdateProjectEndDateModal />
												</div>	
											</div>
										</div><br/>										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											<InsertProjectModal />									
										</div>											
									</div>									
								</div>
							</div><br/>							
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">	
									
										< LaborRenderTable />		
										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div className="row">
												<div className="col col-sm-6">
													<h4> {selectedlabor.type}</h4>
													<h6>
													{selectedlabor.type != null 
														? <span className="badge bg-success"> main </span>															
														: <span className="badge bg-warning"> No labor select </span>
													}
													</h6>
												</div>	
												<div className="container col text-end">
													<UpdateLaborModal />
													<LaborDelete />
													<UpdateLaborEndDateModal />
													< GraphLabor />
												</div>	
											</div>
										</div><br/>												
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											<InsertLaborModal />									
										</div>											
									</div>											
								</div>
							</div><br/>							
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">
										Tasks from labor: {selectedlabor.type}
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<TaskRenderTable />			
										</div>		
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div className="row">
												<div className="col col-sm text-end">
													<TaskReport />
												</div>												
											</div>
										</div>	
										<div className="form-control form-control-sm mt-2" id="ButtonTaskLabor">
											<div className="row">
												<div className="col col-sm-3">
													<InsertTaskModal />	 	
												</div>												
												<div className="container col text-end">
													<ReadTaskInfo />
												</div>
											</div>
										</div>									
									</div>
								</div>
							</div><br/>								
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">
										Equipments from labor: {selectedlabor.type}
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<EquipmentRenderTable />			
										</div>		
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div className="row">
												<div className="col col-sm text-end">
													<EquipmentReport />
												</div>												
											</div>
										</div>	
										<div className="form-control form-control-sm mt-2" id="ButtonEquipmentLabor">		
											<div className="row">
												<div className="col col-sm-3">
													<InsertEquipmentModal />	  	
												</div>												
												<div className="container col text-end">
													<ReadEquipmentInfo />
												</div>
											</div>
										</div>								
									</div>
								</div>
							</div><br/>							
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border">
										Materials from labor: {selectedlabor.type}
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<MaterialRenderTable />	
										</div>	
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div className="row">
												<div className="col col-sm text-end">
													<MaterialReport />
												</div>												
											</div>
										</div>	
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div className="row">
												<div className="col col-sm-3">
													<InsertMaterialModal />
												</div>												
												<div className="container col text-end">
													<ReadMaterialInfo />	
												</div>
											</div>
										</div>									
									</div>
								</div>
							</div>							
						</div>						
					</div>	
				</div>				
			</div>		
			
		</div>		
			
	);
  
}

export default Manager
