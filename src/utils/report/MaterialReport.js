import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
//import fs from 'fs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MaterialReport ( ) {
	
	const { token, selectedlabor, handleLogout } = useContext(Context);	
	
	const generateReportMaterial = async (id) => {		 
		
		await axios({
			method: 'get',
			url: "/pdf_materials_report_for_labor_id/" + id,			
			headers: {				
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
			responseType: 'blob'
		}).then(responseType => {
			const url = window.URL.createObjectURL(new Blob([responseType.data]));
			const link = document.createElement('a');
			link.href = url;
			const outputFileName = "Materials-Report-" + `${Date.now()}.pdf`
			link.setAttribute('Download', outputFileName);
			document.body.appendChild(link);
			link.click();
			//Or save file locally
			//fs.writeFileSync(outputFileName, responseType.data);
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
		
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		if (selectedlabor.id != null){
			generateReportMaterial(selectedlabor.id);
		}else{
			toast.danger("Not Labor selected for report");
		}
	}
	
	return (	
		<>
			<button type="submit" 
					className="btn btn-sm btn-outline-success"
					onClick={(e) => handleSubmit(e)} > 
					Materials (PDF) 
			</button>
		</>
	);
}

