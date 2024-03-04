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
//Cards
import CardProjectsTotals from './../utils/info/CardProjectsTotals.js';
import CardLaborsTotals from './../utils/info/CardLaborsTotals.js';
import CardProject from './../utils/info/CardProject.js';
//Graph
//import GraphProject from './../utils/graph/GraphProject.js';
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
			</div><br/>		
			
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
														< CardProjectsTotals  />														
													</div>
												</div>												
												<div className="col">	
													<div className="d-grid gap-2">													
														< CardLaborsTotals  />															
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
													
														< ProjectRenderTable />	
														
													</div>
												</div>												
											</div>											
										</div>
										<div className="form-control form-control-sm mt-2" id="ButtonMaterialLabor">	
											<div className="row">
												<div className="col col-sm text-end">
													<AllProjectsReport />
												</div>												
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
