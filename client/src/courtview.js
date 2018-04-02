import React from 'react';
import {Redirect} from 'react-router-dom';
import NotFound from './notFound';


class CourtView extends React.Component{
	constructor(props){
		super(props);
	}
	state = { response: [],
			  courtNotFound: false
			};

	componentDidMount() {
	  this.callApi()
	    .then(res => { 
	    	this.setState({ response: res })
	    })
	    .catch(err => {
	    	console.log('Did not setState to response.');
	    	console.log(err)
	    	this.setState({ courtNotFound: true })
	    });
	}

	callApi = async () => {
	  const response = await fetch('/api/court/'+this.props.match.params.id);
	  const body = await response.json();

	  if (response.status !== 200) {
	  	throw Error(body.message)
	  };

	  return body;
	};

	// Bools not yet rendered (Amenities, outdoor_status, membership_status)
	render(){
		if(this.state.courtNotFound == true) {
			return <Redirect to="/404"/>
		}
		return (
			<div>
				<span style={{fontSize:"3em"}}>{this.props.match.params.id}</span>
				<br></br>


				<span style={{fontSize:"3em"}}>{this.state.response.map((item, court_name) => (
					<p>{item.court_name}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, avg_stars) => (
					<p>{item.avg_stars}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, address) => (
					<p>{item.address}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, court_zip) => (
					<p>{item.court_zip}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, busiest_times) => (
					<p>{item.busiest_times}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, outdoor_status) => (
					<p>{item.outdoor_status}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, membership_status) => (
					<p>{item.membership_status}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, open_time) => (
					<p>{item.open_time}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, close_time) => (
					<p>{item.close_time}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, has_fountain) => (
					<p>{item.has_fountain}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, has_vending_machine) => (
					<p>{item.has_vending_machine}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, court_size) => (
					<p>{item.court_size}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, pavement_quality) => (
					<p>{item.pavement_quality}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, cleanliness) => (
					<p>{item.cleanliness}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, rim_quality) => (
					<p>{item.rim_quality}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, net_quality) => (
					<p>{item.net_quality}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, net_type) => (
					<p>{item.net_type}</p>
				))}</span>
				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((item, hoop_height) => (
					<p>{item.hoop_height}</p>
				))}</span>


				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((comment, index) => (
					<p key={index}>{comment.comment_username} {comment.comment_text}</p>
				))}</span>


				<br></br>
				<span style={{textAlign:"left"}}>{this.state.response.map((visited, index) => (
					<p key={index}>{visited.visited_username} {visited.has_visited}</p>
				))}</span>

			</div>
		)
	}
}

export default CourtView;