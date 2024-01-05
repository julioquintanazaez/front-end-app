import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';

//Components
import Navigation from './../components/MainNavbar.js'; 
import LaborInsert from './../utils/labor/LaborInsert.js'; 
import LaborTable from './../utils/labor/LaborTable.js';
import LaborUpdate from './../utils/labor/LaborUpdate.js';


const Labors = () => {	
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn } = useContext(Context);
	const navigate = useNavigate();
	
	const [selectedproject, setSelectedProject] = useState({});
	const [labor, setLabor] = useState({});  
	//const [selectedlabor, setSelectedLabor] = useState({}); 
	
	return (
		<div>
			<div className="container-fluid-md">
				<div className="row">				
						
					<div className="col-sm-2">					
						<Navigation />												
					</div>
					
					<div className="container-fluid col-sm-10">					
						
						<div class="accordion" id="accordionExample">
						
							<div class="accordion-item">
								<h2 class="accordion-header">
								  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								  
									Create a labor
									
								  </button>
								</h2>
								<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
								  <div class="accordion-body">		
								  
									<LaborInsert /><br/>
									
								  </div>
								</div>
							</div>		

							<div class="accordion-item">
								<h2 class="accordion-header">
								  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								  
									Manage Labors
									
								  </button>
								</h2>
								<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
								  <div class="accordion-body">		
									
									<LaborUpdate labor={labor}  /><br/>
									<LaborTable setLabor={setLabor}  /><br/>
									
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

export default Labors
