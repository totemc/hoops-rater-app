import React from 'react';
//import ReactDOM from 'react-dom';

class Profile extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<span style={{fontSize:"3em"}}>{this.props.fname}</span>
				<br></br>
				<span style={{fontSize:"2em"}}>{this.props.lname}</span>
			</div>

		)
	}
}

export default Profile;