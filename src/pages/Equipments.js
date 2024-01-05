import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';

//Components
import Navigation from './../components/MainNavbar.js';
import ProjectSelector from './../utils/project/ProjectSelector.js';
import LaborSelector from './../utils/labor/LaborSelector.js';
import LaborEquipmentInsert from './../utils/equipment/LaborEquipmentInsert.js';
import LaborEquipmentUpdate from './../utils/equipment/LaborEquipmentUpdate.js';
import LaborEquipmentTable from './../utils/equipment/LaborEquipmentTable.js';

const Equipments = () => {
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn } = useContext(Context);
	const navigate = useNavigate();
	
	const [selectedproject, setSelectedProject] = useState({});
	const [selectedlabor, setSelectedLabor] = useState({}); 
	const [selectedequipmentlabor, setSelectedEquipmentLabor] = useState({}); 
	
	
	return (
		<div>
			<div className="container-fluid-md">
				<div className="row">				
					<div className="col-sm-2">					
						<Navigation />												
					</div>			
					
					<div className="container-fluid col-sm-10">		

						SELECT A PROJECT
						<ProjectSelector setSelectedProject={setSelectedProject} /> <br/>	
						
						SELECT A LABOR
						<LaborSelector setSelectedLabor={setSelectedLabor} /> <br/>	
						
						<div class="accordion" id="accordionExample">						
						  		  
						  <div class="accordion-item">
							<h2 class="accordion-header">
							  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								
								Manage Equipments
								
							  </button>
							</h2>
							<div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							  <div class="accordion-body">
								
								<LaborEquipmentTable setSelectedEquipmentLabor={setSelectedEquipmentLabor} /><br/>
									
							    <LaborEquipmentUpdate selectedequipmentlabor={selectedequipmentlabor} /><br/>
									
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

export default Equipments
