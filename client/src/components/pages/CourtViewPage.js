import React from 'react';
import {Redirect} from 'react-router-dom';
import NotFound from './NotFoundPage';
import StarRatingComponent from 'react-star-rating-component';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

const styles = {
    panelStyle : {
        background : "rgba(248, 201, 149, 1)",
        color: "darkslategrey",
        borderColor: "rgba(222,127,24,.2)"
    }
}

class CourtView extends React.Component{
	constructor(props){
		super(props);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
	}
    
	state = { response: [],
             courtNotFound: false,
             comment: '',
             rating: 0
			};
    handleChange(event){
        console.log(this.state.comment)
        this.setState({comment: event.target.value})
    }
    handleCommentSubmit(event){
        event.preventDefault();
        fetch('/api/form-submit-comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: this.state.comment,
                                 id: this.props.match.params.id})
        })
        .then(this.setState({comment: ''}));
    }
    handleRatingSubmit(event){
        event.preventDefault();
        fetch('/api/form-submit-rating', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rating: this.state.rating,
                                 id: this.props.match.params.id})
        })
    }
    onStarClick(value){
        this.setState({rating: value})
    }

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
      //console.log(body.slice(0,1));
	  if (response.status !== 200) {
	  	throw Error(body.message)
	  };

	  return body;
	};

	// Bools not yet rendered (Amenities, outdoor_status, membership_status)
	render(){
        console.log(this.state.rating)
		if(this.state.courtNotFound == true) {
			return <Redirect to="/404"/>
		}
		return (
			<div>
                
     <Grid>
        <Row>
            <Col lg={12}>
                {this.state.response.slice(0,1).map((item) => (
                    <div>
                        <Row>
                            <Col lg={10}>
                                <h1>{item.court_name}</h1>
                            </Col>
                            <Col lg={1}>
                                <h1>{item.avg_stars}</h1>
                            </Col>
                            <Col lg={12}>
                                <h2>{item.address}  {item.court_zip}</h2>
                            </Col>
                        </Row>
                        <Panel style={styles.panelStyle}>
                            <Panel.Body>
                                <Row>
                                    <Col lg={2}>
                                        <h4>busiest times</h4>
                                        {item.busiest_times}
                                    </Col>
                                    <Col lg={2}>
                                        <h4>court size</h4>
                                        {item.busiest_times}
                                    </Col>
                                    <Col lg={2}>
                                        <h4>hoop height</h4>
                                        {item.busiest_times}
                                    </Col>
                                    <Col lg={2}>
                                        <h4>membership status</h4>
                                        {item.busiest_times}
                                    </Col>
                                    <Col lg={2}>
                                        <h4>indoor status</h4>
                                        {item.busiest_times}
                                    </Col>
                                    <Col lg={2}>
                                        <h4>net status</h4>
                                        {item.busiest_times}
                                    </Col>
                                    <Col lg={2}>
                                        <h4>filler</h4>
                                        {item.busiest_times}
                                    </Col>
                                </Row>
                            </Panel.Body>
                        </Panel>
                    </div>
                ))}
            </Col>
            <Col xs={6} md={4}>
            </Col>
            
            
            
            <Col xs={6} md={4}>
            </Col>
				
    
            <Col xs={6} md={4}>
				<code>Address:<span style={{fontSize:"3em"}}>{this.state.response.map((item, address) => (<p>{item.address}</p>))}</span></code>
                <code>Zipcode: <span style={{fontSize:"3em"}}>{this.state.response.map((item, court_zip) => (<p>{item.court_zip}</p>))}</span></code> 
            </Col>
        </Row>

				<br></br>
                                                                                                  
                                                                                                    
        <Row className="show-grid">
            <Col xs={6} md={4}>
                <code>Busiest time: <span style={{fontSize:"3em"}}>{this.state.response.map((item, busiest_times) => (<p>{item.busiest_times}</p>))}</span></code>
            </Col>
        
            <Col xs={6} md={4}>
				<code>Outdoor status: <span style={{fontSize:"3em"}}>{this.state.response.slice(0,1).map((item) => (<p>{item.outdoor_status.toString()}</p>))}</span></code>
            </Col>
                                                                                                   
            <Col xs={6} md={4}>
				<code>Membership status: <span style={{fontSize:"3em"}}>{this.state.response.map((item, membership_status) => (<p>{item.membership_status}</p>))}</span></code>
            </Col>
        </Row>
                                                                                                            
				<br></br>
        
        <Row className="show-grid">
            <Col md={6} mdPush={6}>
				<code>Open time: <span style={{fontSize:"3em"}}>{this.state.response.map((item, open_time) => (<p>{item.open_time}</p>))}</span></code>
            </Col>
        
            <Col md={6} mdPull={6}>
				<code>Close time: <span style={{fontSize:"3em"}}>{this.state.response.map((item, close_time) => (<p>{item.close_time}</p>))}</span></code>
            </Col>
        </Row>
                                                                                                         
				<br></br>
                                                                                                                 
        <Row className="show-grid">
            <Col md={6} md={6}>                                                                      
				<code>Has Fountain: <span style={{fontSize:"3em"}}>{this.state.response.map((item, has_fountain) => (<p>{item.has_fountain}</p>))}</span></code>
            </Col>
				
            <Col md={6} md={6}> 
				<code>Has Vending machine: <span style={{fontSize:"3em"}}>{this.state.response.map((item, has_vending_machine) => (<p>{item.has_vending_machine}</p>))}</span></code>
            </Col>
        </Row>
				<br></br>

        <Row className="show-grid">
            <Col xs={12} md={12}>
				<code>Court size: <span style={{fontSize:"3em"}}>{this.state.response.map((item, court_size) => (<p>{item.court_size}</p>))}</span></code>
            </Col>
        </Row>

				<br></br>

        <Row className="show-grid">
            <Col xs={6} md={4}>
				<code>Pavement quality: <span style={{fontSize:"3em"}}>{this.state.response.map((item, pavement_quality) => (<p>{item.pavement_quality}</p>))}</span></code>
			</Col>
            
            <Col xs={6} md={4}>
				<code>Cleanliness: <span style={{fontSize:"3em"}}>{this.state.response.map((item, cleanliness) => (<p>{item.cleanliness}</p>))}</span></code>
			</Col>

            <Col xs={6} md={4}>
				<code>Rim quality: <span style={{fontSize:"3em"}}>{this.state.response.map((item, rim_quality) => (<p>{item.rim_quality}</p>))}</span></code>
            </Col>
        </Row>

				<br></br>

        <Row className="show-grid">
            <Col xs={6} md={4}>
				<code>Net quality: <span style={{fontSize:"3em"}}>{this.state.response.map((item, net_quality) => (<p>{item.net_quality}</p>))}</span></code>
            </Col>

            <Col xs={6} md={4}>
                <code>Net type: <span style={{fontSize:"3em"}}>{this.state.response.map((item, net_type) => (<p>{item.net_type}</p>))}</span></code>
            </Col>

            <Col xs={6} md={4}>
				<code>Hoop height: <span style={{fontSize:"3em"}}>{this.state.response.map((item, hoop_height) => (<p>{item.hoop_height}</p>))}</span></code>
            </Col>
        </Row>


				<br></br>


        <Row className="show-grid">
            <Col md={6} md={6}>
				<code>Comment: <span style={{fontSize:"3em"}}>{this.state.response.map((comment, index) => (<p key={index}>{comment.comment_username} {comment.comment_text}</p>))}</span></code>
            </Col>

            <Col md={6} md={6}>
				<code>Comment: <span style={{fontSize:"3em"}}>{this.state.response.map((visited, index) => (<p key={index}>{visited.visited_username} {visited.has_visited}</p>))}</span></code>
            </Col>
        </Row>

    </Grid>;

				<span style={{textAlign:"left"}}>{this.state.response.map((visited, index) => (
					<p key={index}>{visited.visited_username} {visited.has_visited}</p>
				))}</span>
                <form onSubmit={this.handleCommentSubmit}>
                    Email Address:<br/>
                    <input type="text" name="comment" onChange={this.handleChange}/><br/>
                    <input type="submit" value="Add Comment"/>
                </form>
                <form onSubmit={this.handleRatingSubmit}>
                        <StarRatingComponent name="rate1" starCount={5} onStarClick={this.onStarClick.bind(this)}/>
                        <br/>
                        <input type="submit" value="Add Rating"/>
                </form>
			</div>


		)
	}
}
export default CourtView;
