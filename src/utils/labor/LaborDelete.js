import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LaborDelete = ( props ) => {
	
	const { token, setMessages, handleLogout } = useContext(Context);	
	const { selectedlabor, setSelectedLabor } = useContext(Context);	
	
	
	const deleteLabor = async (id) => {		 
		
		if (id != ""){
			await axios({
				method: 'delete',
				url: "/delete_labor/" + id,			
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Labor successfuly deleted");
					toast.success("Labor delete successfuly");
					setSelectedLabor({});
					setMessages("Labor deleted successfully" + Math.random());
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			    handleLogout();
			});
		}else{
			toast.danger("Please select a project...");
		}
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.labor.id != null){
			deleteLabor(props.labor.id);
		}else{
			toast.warning("Not labor selected to delete");
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