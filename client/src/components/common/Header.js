import React from 'react';
import { Navbar } from 'react-bootstrap';
// import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';

class Header extends React.Component{

	constructor(props){
		super(props);
		this.navLinks = {
			main : '/',
			currentUserProfile : '/profile/' + this.props.currentUser
		}
	}
	render(){
		if (this.props.loginValue){
			return (
				<div>
				<div className="container-fluid">
				   <div className="navbar-header"> Hoops Rater </div>
				   <br />
				   <br />
				   <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> </div>
				</div>
				<header id="header">
				   	<Navbar>
					<nav id="nav">
				      <ul>
				         <li><a href={this.navLinks.main}>Home</a></li>
				         <li><a href="SignUpPage.html" className="button special">Sign Up</a></li>
				         <li><a href="LogInPage.html" className="button special">Log In </a></li>
				      </ul>
				   	</nav>
				   	</Navbar>
				</header>
			</div>
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

	}
}

export default Header;