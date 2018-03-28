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
			<div style={{margin: '1em'}}>
				<img src="http://placehold.it/300x400" />
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
	}
}

export default Profile;