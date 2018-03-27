import React from 'react';
//import ReactDOM from 'react-dom';


class Profile extends React.Component{
	constructor(props){
		super(props);
	}
	state = {
	  response: ''
	};

	componentDidMount() {
	  this.callApi()
	    .then(res => this.setState({ response: res }))
	    .catch(err => console.log(err));
	}

	callApi = async () => {
	  const response = await fetch('/api/profile/'+this.props.match.params.nameParam);
	  const body = await response.json();

	  if (response.status !== 200) throw Error(body.message);

	  return body;
	};
	render(){
		return (
			<div>
				<span style={{fontSize:"3em"}}>{this.props.match.params.nameParam}</span>
				<br></br>
				<span style={{fontSize:"3em"}}>{this.state.response.fname}</span>
				<br></br>
				<span style={{fontSize:"2em"}}>{this.state.response.lname}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.age}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.username}</span>
			</div>

		)
	}
}

export default Profile;