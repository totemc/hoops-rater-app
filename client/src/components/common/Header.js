import React from 'react';
<<<<<<< HEAD
import {Navbar,NavItem,Nav} from 'react-bootstrap';
import {BodyBackgroundColor} from 'react-bootstrap';

=======
import { Link } from 'react-router-dom';
import {Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';
import logo from './backboard.png';
import { withAuth } from '@okta/okta-react';
import FontAwesome from 'react-fontawesome';

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
>>>>>>> master

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
<<<<<<< HEAD
	render(){
          
		if (this.props.loginValue){
			return (
                
              
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">Hoop Rater-App</a>
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
              
			)
            
		}else{
			return (
				<div>
					<h1> This is my header component. I will be styled later. You are not logged in.</h1>
					<a href={this.navLinks.main}>Main</a>
					<a href={this.navLinks.currentUserProfile}>User1 Profile</a>
				</div>
			)
		}
        
document.body.style = 'background: red;';
=======

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

		const account = this.state.authenticated ? <NavItem>Welcome, <Link to="/profile/user4">Teddy!</Link></NavItem> : <NavItem href="/signup"> Sign up </NavItem>;
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
					<NavItem><Link to="/search" style={{color:"white"}}><FontAwesome name="search" size="lg"/></Link></NavItem>
				  	{logInOrlogOut}
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
		);
>>>>>>> master
	}
}

export default withAuth(Header);
