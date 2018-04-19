import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar,NavItem,Nav} from 'react-bootstrap';

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
				  <Navbar.Header>
				    <Navbar.Brand>
					  <Link to="/">Hoop Rater-App</Link>
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
