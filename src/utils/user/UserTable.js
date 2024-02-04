import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ResetUserPasswordModal from './../user/ResetUserPasswordModal.js';
import UpdateUserModal from './../user/UpdateUserModal.js';

const UserTable = (props) => {

	const { token, user, messages, setMessages, handleLogout } = useContext(Context);
    const [users, setUsers] = useState([]); 	
	
	useEffect(()=> {
        fetchUsers();
    }, [messages]);
		
	const fetchUsers = async () => {
		
		await axios({
			method: 'get',
			url: '/read_users/',
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response ":response.data});	
				setUsers(response.data);
				console.log({"Loaded users to Table successfuly ":users});						
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});			  
	}
	
	const deleteUser = async (username) => {		 
		
		if (username !== ""){
			if (username != user.username){
				await axios({
					method: 'delete',
					url: "/delete_user/" + username,			
					headers: {
						'accept': 'application/json',
						'Authorization': "Bearer " + token,
					},
				}).then(response => {
					if (response.status === 201) {
						console.log("User Successfuly deleted");	
						setMessages("User deleted successfuly" + Math.random());
						toast.success("User Successfuly deleted");	
					}
				}).catch((error) => {
					console.error({"message":error.message, "detail":error.response.data.detail});
					handleLogout();
				});
			}else{
				toast.info("Please cant not delete your own user");
			}
		}else{
			toast.warning("Please select a user");
		}
	}	
	
	const activateUser = async (user_item) => {
		
		if (user_item.username != null){
			await axios({
				method: 'put',
				url: "/activate_user/" + user_item.username,
				data: {
						disable: user_item.disable ? false : true						
						},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("User updated successfuly");
					setMessages("User activated successfuly" + Math.random());
					toast.success("User status changed successfuly");
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		}else{
			toast.warning("Please select a user");
		}			
	}
	
	const buttonClassActivate = async (user_item) => {
		if (user_item.disable){
			return "btn-danger";
		}
		return "btn btn-sm btn-success";
	}
	
	const renderTableData = () => {
		return users?.map((user_item, index) => (
				<tr className="row-md" key={user_item.username}>
					<th scope="row">{index + 1}</th>
					<td>{user_item.full_name}</td>
					<td>{user_item.username}</td>
					<td>{user_item.email}</td>
					<td>{user_item.role[0]}</td>
					<td>{user_item.disable ? "Not Active" : "Active"}</td>
					<td> 						
						<div className="col justify-content-end">						
							<div className="row">		
								<div className="col">
									<div className="d-grid gap-3">
										<button 
											type="button" 
											className="btn btn-sm btn-danger ml-2 mr-2" 							
											onClick={(e) => deleteUser(user_item.username)}> 
												Del
										</button>
									</div>
								</div>
								<div className="col">	
									<div className="d-grid gap-3">
										<button 
											type="button" 
											className= "btn btn-sm btn-warning ml-2 mr-2"				
											onClick={(e) => activateUser(user_item)}> 
												Activate
										</button>
									</div>
								</div>	
								<div className="col">	
									<div className="d-grid gap-3">
										< ResetUserPasswordModal selecteduser={user_item}/>		
									</div>
								</div>	
								<div className="col">	
									<div className="d-grid gap-3">
										< UpdateUserModal selecteduser={user_item}/>		
									</div>
								</div>	
								
							</div>						
						</div>						
					</td>
				</tr>					
			));
		}

	return (
		<div className>            	
            <Table className="table table-striped table-bordered" responsive>
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>	
						<th scope="col">Name</th>							
						<th scope="col">User</th>
						<th scope="col">Mail</th>							
						<th scope="col">Role</th>
						<th scope="col">Active</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTableData()}
				</tbody>
			</Table>   
			<ToastContainer />
        </div>
	);  
}

export default UserTable;