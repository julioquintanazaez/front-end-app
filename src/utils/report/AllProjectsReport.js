import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
//import fs from 'fs'

export default function AllProjectsReport ( ) {
	
	const { token, handleLogout } = useContext(Context);	
	
	const generateReport = async (id) => {		 
		
		await axios({
			method: 'get',
			url: "/pdf_report_summary_projects/",			
			headers: {				
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
			responseType: 'blob'
		}).then(responseType => {
			const url = window.URL.createObjectURL(new Blob([responseType.data]));
			const link = document.createElement('a');
			link.href = url;
			const outputFileName = "Summary-Projects-" + `${Date.now()}.pdf`
			link.setAttribute('Download', outputFileName);
			document.body.appendChild(link);
			link.click();
			//Or save file locally
			//fs.writeFileSync(outputFileName, responseType.data);
		}).catch((error) => {
			console.log("Error conecting with backend server or with submited data: " + id);
			console.log(error);
			handleLogout();
		});
		
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		generateReport();		
	}
	
	return (	
		<>
			<button type="submit" 
					className="btn btn-sm btn-outline-success"
					onClick={(e) => handleSubmit(e)} > 
					All projects (PDF) 
			</button>
		</>
	);
}

