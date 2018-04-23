import React from 'react';
import {Navbar,NavItem,Nav} from 'react-bootstrap';
import {BodyBackgroundColor} from 'react-bootstrap';


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
	}
}

export default Header;