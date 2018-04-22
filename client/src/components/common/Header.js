import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';
import logo from './backboard.png';

const styles = {
	logoStyle:{
		maxHeight:"2em",
		maxWidth:"2em",
		display:"inline-block"
	},
	hackyStyle:{
		marginTop:"-.3em"
	}
}

class Header extends React.Component{

	constructor(props){
		super(props);
		this.navLinks = {
			main : '/',
			currentUserProfile : '/profile/' + this.props.currentUser
		}
	}
	render(){
			return (
				<Navbar inverse collapseOnSelect>
				  <Navbar.Header style={styles.hackyStyle}>
				    <Navbar.Brand>
					  <Link to="/"><img style={styles.logoStyle} src={logo}/> Hoops Rater</Link>
				    </Navbar.Brand>
				    <Navbar.Toggle />
				  </Navbar.Header>
				  <Navbar.Collapse>
				    <Nav>

				    </Nav>
				    <Nav pullRight>
				      <NavItem eventKey={1} href="#">
				        Sign Up
				      </NavItem>
				      <NavItem eventKey={2} href="#">
				       Log-In
				      </NavItem>
				    </Nav>
				  </Navbar.Collapse>
				</Navbar>
			);
	}
}

export default Header;
