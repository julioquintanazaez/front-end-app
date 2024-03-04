import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useLocation } from "react-router";
import { Context } from './../context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";

function Login () {
	
	const navigate = useNavigate();
	const location = useLocation();

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	
	const { isLoggedIn, setToken, setIsLoggedIn, handleLogout } = useContext(Context);
	 
	const authenticate_user = async () => {
		 
		const form_data = new FormData();
		form_data.append("username",  formik.values.username);
		form_data.append("password", formik.values.password);		
		
		await axios({
			method: 'post',
			url: '/token/',                         
			data: form_data
		}).then(response => {
			if (response.status === 200) {				
				const dataUser = {
					access_token: response.data.access_token,
					token_type: response.data.token_type
				};
				console.log({"Respuesta de autenticacion": username});
				setToken(response.data.access_token);
				setIsLoggedIn(true);
				setUserName("");
				setPassword("");	
				const origin = location.state?.from?.pathname || '/manager'; 
				navigate(origin);
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});	
			Swal.fire("Access denied!", error.response.data.detail, "error");
		});		
	}	
	
	const handleSubmit = (event) => {
		event.preventDefault();	
		authenticate_user();			
	}	

	const signOut = () => {
		handleLogout();
		setUserName("");
		setPassword("");		
		navigate("/");
	}
	
	const validationRules = Yup.object().shape({
		username: Yup.string().trim()	
			.min(3, "Password must be 3 characters at minimum")
			.max(15, "Password must be 15 characters at maximum")
			.required("Username is required"),
		password: Yup.string()
			.min(3, "Password must be 3 characters at minimum")
			.required("Password is required"),
	});
	
	const registerInitialValues = {
		username: '',
		password: ''
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log(data.username);
			authenticate_user();
			formik.resetForm();
		},
		validationSchema: validationRules,
	});

	return (  		
		<div className="Auth-form-container" style={{ 
			backgroundImage: "url(/images/background4.jpg)",
			height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",			
			}}
		>
			<form className="Auth-form" onSubmit={formik.handleSubmit}>
				<div className="Auth-form-content">
					{isLoggedIn ? ( 
					
					<div>
						<p> User logged-in......</p>
						<button className="btn btn-primary" onClick={signOut}>Log-out</button>
					</div>
					
					) : (
					
					<div>
						<h3 className="Auth-form-title">
							Sing In
						</h3>
						<div className="form-group mt-3">
							<input
							  type="text"
							  name="username"
							  value={formik.values.username}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"form-control mt-1" + 
											(formik.errors.username && formik.touched.username
											? "is-invalid"
											: ""
										)}
							  placeholder="User name"
							/>
							<div>{(formik.errors.username) ? <p style={{color: 'red'}}>{formik.errors.username}</p> : null}</div>
						</div>
						<div className="form-group mt-3">
							<input
							  type="password"
							  name="password"
							  value={formik.values.password}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"form-control mt-1" + 
											(formik.errors.password && formik.touched.password
											? "is-invalid"
											: ""
										)}
							  placeholder="Enter password"
							/>
							<div>{(formik.errors.password) ? <p style={{color: 'red'}}>{formik.errors.password}</p> : null}</div>
						</div>
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-success">
									Sing In
							</button>					
						</div>						
					</div>
					
					)}
				</div>					
			</form>				 
		</div>
		
	);
	
}

export default Login