import React from 'react';
//import ReactDOM from 'react-dom';


class CourtView extends React.Component{
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
	  const response = await fetch('/api/court/'+this.props.match.params.id);
	  const body = await response.json();

	  if (response.status !== 200) throw Error(body.message);

	  return body;
	};

	/* 
	Add stars, amenities, floor_quality,
	hoop_quality, visited(?), & comments attributes
	*/
	// Amenities are bool, so no text to show?

	render(){
		return (
			<div>
				<span style={{fontSize:"3em"}}>{this.props.match.params.id}</span>
				<br></br>
				<span style={{fontSize:"3em"}}>{this.state.response.court_name}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.address}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.court_zip}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.busiest_times}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.outdoor_status}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.membership_status}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.open_time}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.close_time}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.has_fountain}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.has_vending_machine}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.court_size}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.pavement_quality}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.cleanliness}</span>
			</div>
		)
	}
}

export default CourtView;