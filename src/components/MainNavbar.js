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
	
	const { handleLogout } = useContext(Context);
	const { user, isAdmin } = useContext(Context);
	
	
	const logoutUser = () => {
		handleLogout();
	}
	
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
							<NavDropdown title="Admin panel">
								<NavDropdown.Item>
									<LinkContainer to="/about">
										<Nav.Link>Admin projects</Nav.Link>
									</LinkContainer>									
								</NavDropdown.Item>	
								<NavDropdown.Item>
									<LinkContainer to="/admin">
										<Nav.Link>Admin users</Nav.Link>
									</LinkContainer>									
								</NavDropdown.Item>	
							</NavDropdown >
							}
							<LinkContainer to="/about">
								<Nav.Link>About Us</Nav.Link>
							</LinkContainer>
						</Nav>	
						<Nav className="justify-content-end">
							<NavDropdown title={user.email} id="basic-nav-dropdown">																				
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