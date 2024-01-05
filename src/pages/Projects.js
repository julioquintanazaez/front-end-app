import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';

//Components
import Navigation from './../components/MainNavbar.js'; 
import ProjectInsert from './../utils/project/ProjectInsert.js';
import ProjectTable from './../utils/project/ProjectTable.js';
import ProjectUpdate from './../utils/project/ProjectUpdate.js';
//Selectors
import ProjectSelector from './../utils/project/ProjectSelector.js';

const Projects = () => {	
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn } = useContext(Context);
	const navigate = useNavigate();
	
	const [project, setProject] = useState({});  
	const [selectedproject, setSelectedProject] = useState({});	
	console.log({"Project selected": selectedproject});
	
	return (
		<div>
			<div className="container-fluid-md">
				<div className="row">				
					<div className="col-sm-2">					
						<Navigation />												
					</div>		
					
					<div className="container-fluid col-sm-10">
					
						Sumary all projects and its statistics
						
						<div class="accordion" id="accordionExample">
						
						  <div class="accordion-item">
							<h2 class="accordion-header">
							  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								
								Create a project
							  
							  </button>
							</h2>
							<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
							  <div class="accordion-body">
								
								<ProjectInsert />
								
							  </div>
							</div>
						  </div>
						  
						  <div class="accordion-item">
							<h2 class="accordion-header">
							  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								
								Manage Projects
								
							  </button>
							</h2>
							<div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							  <div class="accordion-body">
								
								<ProjectUpdate project={project} />
								<ProjectTable setProject={setProject} />
								
							  </div>
							</div>
						  </div>
						  
						  <div class="accordion-item">
							<h2 class="accordion-header">
							  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								
								Statistics for project
								
							  </button>
							</h2>
							<div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							  <div class="accordion-body">
								
								<ProjectSelector setSelectedProject={setSelectedProject} /><br/>  
								
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

export default Projects
