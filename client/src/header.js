import React from 'react';

class Header extends React.Component{
	render(){
		if (this.props.loginValue){
			return (
				<div>
					<h1> This is my header component. I will be styled later. You are logged in.</h1>
				</div>
			)
		}else{
			return (
				<div>
					<h1> This is my header component. I will be styled later. You are not logged in.</h1>
				</div>
			)
		}

	}
}

export default Header;