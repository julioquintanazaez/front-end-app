import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Context } from './../../context/Context';
import axios from 'axios';


export default function RegisterUserModal( ) {
	
	const [show, setShow] = useState(false);

	const [fullname, setFullName] = useState("");
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	
	const options = ["admin", "manager", "user"]
	
	const registerUser = async () => {
		
		axios({
			method: 'post',
			url: '/create_user/',
			data: {
				full_name: fullname,
				username: username,
				email: email,				
				role: role,
				disable: true,
				hashed_password: password
			}
		}).then(response => {
			if (response.status === 201) {
				console.log("User data registered successfuly ");
				alert({"User data registered successfuly": username});	
				setFullName("");
				setUserName("");
				setEmail("");
				setRole("");
				setPassword("");
			}else if (response.status === 500) {
				console.log("Integrity error");
				alert({"User already exist in DB": username});	
			}else {
				console.log("Register user failed, please try again");	
				alert({"Register user failed, please try again": username});	
			}
		}).catch((error) => {
			console.log({"An error ocurr ": username});
			alert({"An error ocurr ": username});	
		});				  
	}
  
	const handleClose = () => {
		setFullName("");
		setUserName("");
		setEmail("");
		setRole("");
		setPassword("");
		setShow(false);
	}
	
	const handleSave = () => {
		if (username != null && email != null && role != null && password != null){
			registerUser();
		}else{
			alert("Some missing parameters");
		}
	}
	
	const handleRole = (role) => {
		if (role == "admin"){
			setRole(["admin", "manager", "user"]);
		}else if (role == "manager"){
			setRole(["manager", "user"]);
		}else{
			setRole(["user"]);
		}
	}

	const handleShow = () => setShow(true);  

	return (
		<>
		<Button className="nextButton btn-sm" onClick={handleShow}>
			Register
		</Button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton>
				<Modal.Title>
					User data
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>				
				
				<label>User Full Name</label>
				<input
				  type="text"
				  value={fullname}
				  onChange={(e) => setFullName(e.target.value)}
				  className="form-control mt-1"
				  placeholder="Enter name (e.g: Peter Crouch)"
				/>
			
				<label>User name</label>
				<input
				  type="text"
				  value={username}
				  onChange={(e) => setUserName(e.target.value)}
				  className="form-control mt-1"
				  placeholder="Enter nickname (e.g: peter87)"
				/>
			
				<label>Email address</label>
				<input
				  type="email"
				  value={email}
				  onChange={(e) => setEmail(e.target.value)}
				  className="form-control mt-1"
				  placeholder="Enter email (e.g peter@gmail.com)"
				/>
				<label>peter@gmail.com</label><br/>
			
				<label>User role</label>
				<select className="form-control form-control-sm mt-2" id="FormControlSelectCategory" >	
					<option selected>Open to select an option</option>
					{options?.map(opt => (
						<option 
							key={opt}
							value={opt}
							onClick={(e) => handleRole(e.target.value)}>
							{opt}
						</option>
					))}
				</select>
			
				<label>Password</label>
				<input
				  type="password"
				  value={password}
				  onChange={(e) => setPassword(e.target.value)}
				  className="form-control mt-1"
				  placeholder="Enter password"
				/>
			
				<label>Confirm Password</label>
				<input
				  type="password"
				  value={password2}
				  onChange={(e) => setPassword2(e.target.value)}
				  className="form-control mt-1"
				  placeholder="Re-enter password"
				/>
			
			</Modal.Body>

			<Modal.Footer>		
				<Button className="btn-sm" variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button className="btn-sm" variant="primary" onClick={handleSave}>
					Register
				</Button>		  
			</Modal.Footer>
			</Modal>
		</>
	);
}