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
import RegisterUserModal from './../utils/user/RegisterUserModal.js';
import ResetUserPasswordModal from './../utils/user/ResetUserPasswordModal.js';
import UpdateUserModal from './../utils/user/UpdateUserModal.js';


const Admin = () => {
	
	const { token } = useContext(Context);
	const navigate = useNavigate();
	
	const [selecteduser, setSelectedUser] = useState({});
	
	console.log({"Usuario": selecteduser.username});
	
	return (
		<div>
			<div className="container-fluid-md">			
				<div className="row">			
					<div className="col-sm">											
						<Navigation />											
					</div>
				</div>
				<div className="row">	
					<div className="col-sm"><br/>
						<div className="container overflow-hidden"><br/>		
						
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">								
										<UserTable setSelectedUser={setSelectedUser} />								
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											<div className="row">
												<div className="col col-sm-6">
													<h4> {selecteduser.username}</h4>
													<h6>
													{selecteduser.username != null 
														? !selecteduser.disable
															? <span className="badge bg-success"> Active </span>
															: <span className="badge bg-warning"> Not active </span>	
														: <span className="badge bg-secondary"> No user select </span>
													}
													</h6>
												</div>										
											</div>
										</div><br/>										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											< RegisterUserModal />
										</div>	
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											< ResetUserPasswordModal selecteduser={selecteduser}/>										
										</div>	
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">	
											< UpdateUserModal selecteduser={selecteduser}/>										
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

export default Admin
