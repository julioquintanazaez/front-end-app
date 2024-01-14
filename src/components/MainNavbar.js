import './../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Context } from './../context/Context';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from "react-router-bootstrap";

import ReadUserNumberProjectsInfo from './../utils/info/ReadUserNumberProjectsInfo.js';
import ResetUserPasswordDrop from './../utils/user/ResetUserPasswordDrop.js';

const Navigation = ( props ) => {
	
	const { handleLogout, handleGetCurrentUser } = useContext(Context);
	const { token, user, isLoggedIn, isAdmin } = useContext(Context);
	const { setProjects, projects } = useContext(Context);
	
	const logoutUser = () => {
		handleLogout();
	}
	
	useEffect(()=> {
		handleGetCurrentUser();
	}, []);	
	
	const fetchProjects = async (email) => {				
		await axios({
			method: 'get',
			url: '/read_projects_by_user_email/' + email,
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log({"Response projects ":response.data});	
				setProjects(response.data);
				console.log({"Load projects from nav successfuly ": projects});
				//alert("Load projects successfuly");
			}else {
				console.log("Load from server Failed in nav routing, please try again");			
			}
		}).catch((error) => {
			console.log({"An error ocur in nav routing": error});
		});								
	}	
	
	useEffect(()=> {
		fetchProjects(user.email);
    }, []);	 
	
	
	return (
		<>
			<Navbar expand="lg" fixed="top" className="navbar-light" bg="bg-dark" data-bs-theme="dark">
				<Container>
					<Navbar.Brand href="#home">
						Project manager
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse className="justify-content-end">
						<Nav className="me-auto" activeKey={window.location.pathname}>
							<LinkContainer to="/manager">
								<Nav.Link>Projects</Nav.Link>
							</LinkContainer>
							{isAdmin && 
								<LinkContainer to="/admin">
									<Nav.Link>Admin panel</Nav.Link>
								</LinkContainer>					
							}							
							<LinkContainer to="/about">
								<Nav.Link>About Us</Nav.Link>
							</LinkContainer>	
						</Nav>	
						<Nav className="justify-content-end">
							<NavDropdown title={user.email} id="basic-nav-dropdown">
								<NavDropdown.Item>
									<p>User projects </p>
									< ReadUserNumberProjectsInfo />
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>									
									User statistics
								</NavDropdown.Item>
								{isAdmin ? ( 
									<NavDropdown.Item>									
										General statistics
									</NavDropdown.Item>								
								): null}								
								<NavDropdown.Divider />
								<ResetUserPasswordDrop />
								<NavDropdown.Divider />
								<NavDropdown.Item as="button" onClick={logoutUser}>
									LogOut
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>		
	);
}

export default Navigation