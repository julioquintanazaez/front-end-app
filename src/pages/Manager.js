import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';
import axios from 'axios';

//Components
import Navigation from './../components/MainNavbar.js'; 

//Handle project
import InsertProjectModal from './../utils/project/InsertProjectModal.js';
import ProjectRenderUserTable from './../utils/project/ProjectRenderUserTable.js';
import ProjectRenderTable from './../utils/project/ProjectRenderTable.js';
import AllProjectsReport from './../utils/report/AllProjectsReport.js';

//Handle Labor 
import InsertLaborModalForm from './../utils/labor/InsertLaborModalForm.js';
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
	const { token, messages, handleLogout } = useContext(Context);
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
			</div><br/>	
			
			<div className="row">				
				<div className="col"><br/>					
					<div className="col">					
						<div className="container overflow-hidden"><br/>								
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">
										<div className="row">	
											<div className="col col-sm text-end">
												<InsertProjectModal />	
											</div>
										</div>
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">											
											<div className="row">
												<div className="col col-sm">	
													{!isAdmin 
														? < ProjectRenderUserTable />	
														: < ProjectRenderTable />	
													}
												</div>
											</div>											
										</div>
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">
											<div className="row">
												<div className="col col-sm-6 text-start">
													<h3> {selectedproject.project_name} </h3>														
														<h6>
														{selectedproject.project_name != null 
															? <span className="badge bg-success"> main </span>
															: <span className="badge bg-warning"> no project select </span>
														}
														</h6>
												</div>													
												<div className="col col-sm text-end">
													<AllProjectsReport />
												</div>												
											</div>
										</div>
									</div>									
								</div>
							</div><br/>							
											
							<div className="row gx-5">								
								<div className="col">									
									<div className="p-3 border bg-light">	
									
										<div className="row">	
											<div className="col col-sm text-end">
												<InsertLaborModalForm />		
											</div>
										</div>
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											< LaborRenderTable />	
										</div>
										
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
											</div>
										</div>									
									</div>											
								</div>
							</div><br/>							
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">
										
										<div className="row">	
											<div className="col col-sm text-start">
												Tasks from labor: {selectedlabor.type}
											</div>
											<div className="col col-sm text-end">
												<InsertTaskModal />	 		
											</div>
										</div>
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<TaskRenderTable tasks={tasks} />			
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
										
										<div className="row">	
											<div className="col col-sm text-start">
												Equipments from labor: {selectedlabor.type}
											</div>
											<div className="col col-sm text-end">
												<InsertEquipmentModal />	  		
											</div>
										</div>
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<EquipmentRenderTable equipments={equipments} />			
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
									<div className="p-3 border bg-light">
										
										<div className="row">	
											<div className="col col-sm text-start">
												Materials from labor: {selectedlabor.type}
											</div>
											<div className="col col-sm text-end">
												<InsertMaterialModal />  		
											</div>
										</div>
										
										<div className="form-control form-control-sm mt-2" id="FormControlSelectProject">											 	
											<MaterialRenderTable materials={materials} />	
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
