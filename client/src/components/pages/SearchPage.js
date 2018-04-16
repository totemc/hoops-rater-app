import React from 'react';
import {Redirect} from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Search extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			value:'',
			madeSearch:false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		console.log('changing the value in form!')
		this.setState({value:e.target.value});
	}


	handleSubmit(event) {
	    event.preventDefault();
	    console.log('reached this func');
	    this.setState((prev) => ({
            madeSearch:true,
            value: '/search/court/' + prev.value
        }))
    }

	render(){
		if(!this.state.madeSearch){
			return (
				<Grid>
					<Row>
						<form onSubmit={this.handleSubmit}>
							<Col lg={11}>
								<FormGroup controlId="formBasicText">
									<ControlLabel>Search</ControlLabel>
									<FormControl type="text" value={this.state.value} placeholder="Search..." onChange={this.handleChange} name="search"/>
								</FormGroup>
							</Col>
							<Col lg={1} style={{"marginTop":"25px"}}>
								<Button type="submit">Search</Button>
							</Col>
						</form>
				  	</Row>
			  	</Grid>
			)
		}
		else{
			return <Redirect to={this.state.value} />
		}
	}
}

export default Search;
