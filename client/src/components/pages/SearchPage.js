import React from 'react';
import {Redirect} from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

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
						<Col lg={12}>
							<form onSubmit={this.handleSubmit}>
								<FormGroup controlId="formBasicText">
									<ControlLabel>Search</ControlLabel>
									<FormControl type="text" value={this.state.value} placeholder="Search..." onChange={this.handleChange} name="search"/>
								</FormGroup>
							</form>
				  		</Col>
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
