import React from 'react';
import {Redirect} from 'react-router-dom';
import { Grid, Row, Col, Panel, Image } from 'react-bootstrap';
import teddy from './images/teddy.png';
//import NotFound from './notFound';

const styles = {
	panelStyle : {
        background : "rgba(248, 201, 149, 1)",
        color: "darkslategrey",
        borderColor: "rgba(222,127,24,.2)"
    }
}
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
				<Grid>
					<Row>
						<Col lg={12}>
							<h1 style={{color:"darkslategrey"}}>{this.props.match.params.nameParam.toUpperCase()}'s Profile</h1>
						</Col>
						<Panel style={styles.panelStyle}>
							<Panel.Body>
							<Col lg={4}>
								<Image style={{maxWidth:"300px", maxHeight:"400px"}} src={teddy} alt="placeholder" rounded />
							</Col>
							<Col lgOffset={3} lg={5}>
								<Row>
									<Col lg={12}>
										<h1>{this.state.response.fname} {this.state.response.lname}</h1>
									</Col>
									<Col lg={12}>
										<h3><span style={{color:"white"}}>username:</span> {this.state.response.username}</h3>
										<h3><span style={{color:"white"}}>age:</span> {this.state.response.age}</h3>
									</Col>
								</Row>
							</Col>
							</Panel.Body>
						</Panel>
					</Row>
				</Grid>
			)
		}else{
			return <div></div>
		}

	}
}

export default Profile;
