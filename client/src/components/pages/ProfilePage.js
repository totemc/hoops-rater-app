import React from 'react';
import {Redirect} from 'react-router-dom';
//import NotFound from './notFound';


class Profile extends React.Component{
	// Initialize state to empty param for rendering
	state = {
	  response:{
	  	fname:'',
	  	lname:'',
	  	age:'',
	  	username:''
	  },
	  userNotFound : null
	};

	componentDidMount(){
		this.callApi()
		  .then(res => {
		  		this.setState({ response: res, userNotFound : false})
		  })
		  .catch(err => {
		  	console.log('Did not setState to response.');
		  	console.log(err)
		  	this.setState({userNotFound : true})
		  });
	}


	callApi = async () => {
	  // Talk to our middleware with the username in question.
	  const response = await fetch('/api/profile/'+this.props.match.params.nameParam);
	  
	  // Get our response body.
	  const body = await response.json();

	  // If we do not receive a 200 OK success code, throw an error. The state is not changed.
	  // Error prints in the catch in the function call.
	  if (response.status !== 200) {
	  	throw Error(body.message)
	  };

	  return body;
	};

	render(){
		if(this.state.userNotFound){
			return <Redirect to="/404"/>
		}else if(this.state.userNotFound == false){
			// neccessary for the else statement to execute when appropriate
			return (
				<div style={{margin: '1em'}}>
					<img src="http://placehold.it/300x400" alt="placeholder"/>
					<div style={{display:'inline-block', marginLeft:10}}>
						<div style={{fontSize:'3em', fontWeight:'bold'}}>
							{this.props.match.params.nameParam}
						</div>
						<div style={{fontSize:'2.5em', fontWeight:'bold'}}>
							{this.state.response.fname} 
						</div>
						<div style={{fontSize:'2em', fontWeight:'bold'}}>
							{this.state.response.lname}
						</div>
						<div style={{fontSize:'1.5em', fontWeight:'bold'}}>
							{this.state.response.age}
						</div>
						<div style={{fontSize:'1em', fontWeight:'bold'}}>
							{this.state.response.username}
						</div>
					</div>
				</div>
			)
		}else{
			return <div></div>
		}

	}
}

export default Profile;