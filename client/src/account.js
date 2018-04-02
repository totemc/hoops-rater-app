import React from 'react';
import { withAuth } from '@okta/okta-react';


export default withAuth(class Account extends React.Component{
	state = {
	  response:''
	};

	componentDidMount() {
	  this.callApi()
	    .then(res => {
	    		console.log(res.messages[0].text);
	    		this.setState({ response: res.messages[0].text})
	    })
	    .catch(err => {
	    	console.log('Did not setState to response.');
	    	console.log(err)
	    });
	}

	callApi = async () => {
        const accessToken = await this.props.auth.getAccessToken();

	  // Talk to our middleware with the username in question.
	  const response = await fetch('/api/messages', {
	  	headers: {
	  	  Authorization: `Bearer ${accessToken}`,
	  	},
	  });
	  
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
		return (
			<div>
				<h1>You are on the account page! here's some secret data you can only get if logged in.</h1>
				<h1>{this.state.response}</h1>
			</div>
		)
	}
})

