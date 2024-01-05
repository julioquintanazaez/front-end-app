import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';
import DashboardStyle from './../custom_styles/DashboardStyle.css';

//Component
import Navigation from './../components/MainNavbar.js';
import UserInsert from './../utils/user/UserInsert.js';
import UserTable from './../utils/user/UserTable.js';
import UserUpdate from './../utils/user/UserUpdate.js';
import UserResetPass from './../utils/user/UserResetPass.js';


const Admin = () => {
	
	const { setToken, setUser, token, user, isLoggedIn, setIsLoggedIn } = useContext(Context);
	const navigate = useNavigate();
	
	const [selecteduser, setSelectedUser] = useState("");
	
	console.log({"Usuario": selecteduser});
	
	return (
		<div>
			<div className="container-fluid-md">
				<div className="row">				
					<div className="col-sm-2">					
						<Navigation />												
					</div>			
					
					<div className="container-fluid col-sm-10">					
					
						<UserTable setSelectedUser={setSelectedUser} />
						
						<div class="accordion" id="accordionExample">
						
						  <div class="accordion-item">
							<h2 class="accordion-header">
							  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							  
								Create User 
								
							  </button>
							</h2>
							<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
							  <div class="accordion-body">
									
									<UserInsert />
									
									
									
							  </div>
							</div>
						  </div>
						  <div class="accordion-item">
							<h2 class="accordion-header">
							  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								
								Update user 
								
								
							  </button>
							</h2>
							<div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							  <div class="accordion-body">
								
								<UserUpdate selecteduser={selecteduser} />
								
							  </div>
							</div>
						  </div>
						  <div class="accordion-item">
							<h2 class="accordion-header">
							  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								
								Reset password
								
								
							  </button>
							</h2>
							<div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							  <div class="accordion-body">
								
								<UserResetPass selecteduser={selecteduser} />
								
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

export default Admin
