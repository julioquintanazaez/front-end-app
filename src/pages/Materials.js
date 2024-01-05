import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';

//Components
import Navigation from './../components/MainNavbar.js';

import ProjectSelector from './../utils/project/ProjectSelector.js';
import LaborSelector from './../utils/labor/LaborSelector.js';
import MaterialLaborInsert from './../utils/material/MaterialLaborInsert.js';
import MaterialLaborUpdate from './../utils/material/MaterialLaborUpdate.js';
import MaterialLaborTable from './../utils/material/MaterialLaborTable.js';



const Materials = () => {
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn } = useContext(Context);
	const navigate = useNavigate();
	
	//
    const [selectedproject, setSelectedProject] = useState({});
	const [selectedlabor, setSelectedLabor] = useState({}); 
	const [selectedmateriallabor, setSelectedMaterialLabor] = useState({});
	
	return (
		<div>
			<div className="container-fluid-md">
				<div className="row">				
					<div className="col-sm-2">					
						<Navigation />												
					</div>		
					<div className="col-sm-10">
						
						SELECT A PROJECT
						<ProjectSelector setSelectedProject={setSelectedProject} /> <br/>	
						
						SELECT A LABOR
						<LaborSelector setSelectedLabor={setSelectedLabor} /> <br/>

						
						
						<div class="accordion" id="accordionExample">
							  <div class="accordion-item">
								<h2 class="accordion-header">
								  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								  
									Manage Materials
									
								  </button>
								</h2>
								<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
								  <div class="accordion-body">	
								  
								   <MaterialLaborUpdate selectedmateriallabor={selectedmateriallabor} /><br/>
								   
								   <MaterialLaborTable setSelectedMaterialLabor={setSelectedMaterialLabor} /><br/>
							
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

export default Materials
