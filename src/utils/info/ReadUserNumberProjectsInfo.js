import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';
import { useNavigate } from "react-router";


export default function ReadUserNumberProjectsInfo ( props )  {
	
	const { token, messages, handleLogout } = useContext(Context);
	const { user, projects } = useContext(Context);
	const [number, setNumber] = useState(0);

	const fetchNumberOfProjects = async (email) => {
		
		await axios({
			method: 'get',
			url: '/number_projects_by_user/' + email,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response user projects info ":response.data});
				setNumber(response.data.project_number);
				console.log("Loaded data from user projects info successfuly");			
			}else {
				console.log("Load from server to read user projects info failed, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur reading user projects info": error});
			handleLogout();
		});			  
	}
	
			
	useEffect(()=> {			
		fetchNumberOfProjects(user.email);			
	}, [, projects, messages]);
		
	return (							
		<div>
			<span className="badge bg-info"> projects {number}</span>
		</div>
	);
}
