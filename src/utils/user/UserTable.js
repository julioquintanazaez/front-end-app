import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import AlertMessage from './../../components/AlertMessage.js';



const UserTable = (props) => {

	const { token } = useContext(Context);
    const [users, setUsers] = useState([]); 	
	
	useEffect(()=> {
        fetchUsers();
    }, []);
		
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
			}else {
				console.log("Load Failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur": error});
			
		});			  
	}
	
	const deleteUser = async (username) => {		 
		
		if (username != ""){
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
					alert({"User Successfuly deleted": username});			
				}else {
					console.log("User delete Failed, please try again");
					alert({"User delete Failed, please try again": username});						
				}
			}).catch((error) => {
				console.log(error);
				alert({"Something rong with the server conection": username});
			});
		}else{
			alert("Please select a user...");	
		}
	}	
	
	const activateUser = async (user) => {
		
		if (user.username != ""){
			await axios({
				method: 'put',
				url: "/activate_user/" + user.username,
				data: {
						disable: user.disable ? false : true						
						},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log({"Response ": response.data});	
					console.log("User updated successfuly");	
					alert({"User updated successfuly": username});
				}else {
					console.log({"Update goes rongs": response.data});
					alert({"User update Failed, please try again": username});
				}
			}).catch((error) => {
				console.log({"An error ocur": error});
				alert({"Something rong with the server conection": username});
			});		
		}else{
			alert("Please select a user...");
		}			
	}
	
	const buttonClassActivate = async (user) => {
		if (user.disable){
			return "btn-danger";
		}
		return "btn btn-sm btn-success";
	}
	
	const renderTableData = () => {
		return users?.map((user, index) => (
				<tr className="row-md" key={user.username}>
					<th scope="row">{index + 1}</th>
					<td>{user.full_name}</td>
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>{user.role}</td>
					<td>{user.disable ? "Not Active" : "Active"}</td>
					<td> 
						<div className="row">	
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-info btn-sm" 							
									onClick={(e) => props.setSelectedUser(user)}> 
										Upd
								</button><br/>
							</div>
							<div className="col-sm-3">
								<button 
									type="button" 
									className="btn btn-danger btn-sm" 							
									onClick={(e) => deleteUser(user.username)}> 
										Del
								</button>
							</div>
							<div className="col-sm-3">
								<button 
									type="button" 
									className= "btn btn-sm btn-warning"				
									onClick={(e) => activateUser(user)}> 
										Activate
								</button>
							</div>
						</div>						
					</td>
				</tr>
			));
		}

	return (
		<div className>            	
            <div className="table-responsive-md">
				<table className="table table-striped table-bordered ">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>	
							<th scope="col">Name</th>							
							<th scope="col">User</th>
							<th scope="col">Mail</th>							
							<th scope="col">Role</th>
							<th scope="col">Active</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody className="table-group-divider">						
						{renderTableData()}
					</tbody>
				</table>
			</div>          
        </div>
	);  
}

export default UserTable;