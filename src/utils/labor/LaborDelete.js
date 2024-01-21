import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const LaborDelete = ( ) => {
	
	const { token, setMessages, handleLogout } = useContext(Context);	
	const { selectedlabor, setSelectedLabor } = useContext(Context);	
	
	
	const deleteLabor = async () => {		 
		
		if (selectedlabor.id != ""){
			await axios({
				method: 'delete',
				url: "/delete_labor/" + selectedlabor.id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Labor successfuly deleted");
					alert("Labor delete successfuly");
					setSelectedLabor({});
					setMessages("Labor deleted successfully" + Math.random());
				}else {
					console.log("Labor delete failed, please try again");			
				}
			}).catch((error) => {
				console.log("Error conecting with backend server or with submited data: " + selectedlabor.id);
				console.log(error);
				handleLogout();
			});
		}else{
			alert("Please select a project...");	
		}
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (selectedlabor.id != null){
			deleteLabor();
		}else{
			alert("Not labor selected to delete");
		}
	}
	
	return (	
		<>
			<button type="submit" 
					className="btn btn-sm btn-danger"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Delete 
			</button>
		</>
	);
}

export default LaborDelete;