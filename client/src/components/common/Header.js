import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';
import logo from './backboard.png';
import { withAuth } from '@okta/okta-react';

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
		this.state={
			authenticated:null
		};
		this.checkAuthentication = this.checkAuthentication.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.navLinks = {
			main : '/',
			currentUserProfile : '/profile/' + this.props.currentUser
		}
	}

	async checkAuthentication(){
		const authenticated = await this.props.auth.isAuthenticated();
		if(authenticated !== this.state.authenticated) {
			this.setState({authenticated});
		}
	}

	componentDidUpdate() {
		this.checkAuthentication();
	}

	async login() {
      // Redirect to '/' after login
      this.props.auth.login('/');
    }

    async logout() {
      // Redirect to '/' after logout
      this.props.auth.logout('/');
    }


	render(){

		const account = this.state.authenticated ? <span></span> : <NavItem href="/signup"> Sign up </NavItem>;
		const logInOrlogOut = this.state.authenticated ? <NavItem onClick={this.logout}> Log out </NavItem> : <NavItem onClick={this.login}> Log in </NavItem>;
		return (
			<Navbar collapseOnSelect>
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
					{account}
				  	{logInOrlogOut}
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
		);
	}
}

export default withAuth(Header);
