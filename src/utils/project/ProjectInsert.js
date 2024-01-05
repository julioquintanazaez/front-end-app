import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../../context/Context';
import axios from 'axios';

const ProjectInsert = ( ) => {
	
	const { token } = useContext(Context);	
	const [inputname, setInputName] = useState(""); 
	const [inputdescription, setInputDescription] = useState("");
	const [inputmanager, setInputManager] = useState("");
	const [inputemail, setInputEmail] = useState("");	
	
	const registerProject = async () => {
		
		if (inputname != "" && inputdescription != "" && inputmanager != 0 && inputemail != 0){
			await axios({
				method: 'post',
				url: 'https://app-project-jczo.onrender.com/create_project/',
				data: {
					name: inputname,
					description: inputdescription,
					manager: inputmanager,	
					mail_manager: inputemail,						
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,
				},
			}).then(response => {
				if (response.status === 201) {
					console.log("Project data inserted successfuly ");
					alert({"Project Successfuly deleted": inputname});	
				}else {
					console.log("Insert project Failed, please try again");	
					alert({"Insert project Failed, please try again": inputname});	
				}
			}).catch((error) => {
				console.log({"An error ocurr ": inputname});
				alert({"An error ocurr ": inputname});	
			});	
		}else{
			alert("Please enter the parameters...");	
		}		  
	}
	
	const handleSubmitProject = (event) => {
		event.preventDefault();
		registerProject();		
	}
	
	return (				
		<form className="form" onSubmit={handleSubmitProject}>			
			
			<label>ENTER PROJECT DATA</label>
			<input type="text" value={inputname}
			  onChange={(e) => setInputName(e.target.value)}
			  className="form-control mt-2"
			  placeholder="e.g: Some place"
			/>
			<input type="text" value={inputdescription}
			  onChange={(e) => setInputDescription(e.target.value)}
			  className="form-control mt-2"
			  placeholder="e.g: Some to-do"
			/>
			<input type="text" value={inputmanager}
			  onChange={(e) => setInputManager(e.target.value)}
			  className="form-control mt-2"
			  placeholder="e.g: John Doe"
			/>
			<input type="email" value={inputemail}
			  onChange={(e) => setInputEmail(e.target.value)}
			  className="form-control mt-2"
			  placeholder="e.g: johndoe@gmail{hotmail, etc}.com"
			/>
								
			<div className="d-grid gap-2 mt-2">
				<button type="submit" className="btn btn-primary btn-sm"> CREATE </button>
			</div>				
						
		</form>					
	);	
	
}


export default ProjectInsert;