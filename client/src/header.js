import React from 'react';

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
					<h1> This is my header component. I will be styled later. You are logged in.</h1>
					<a href={this.navLinks.main}>Main</a>
					<a href={this.navLinks.currentUserProfile}>User1 Profile</a>
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