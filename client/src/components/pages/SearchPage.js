import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import biglogo from '../common/hoops-rater-logo-wh.png';

const styles = {
	verticalAlignPrototype : {
		position:"absolute",
		top:"50%",
		left:"50%",
		transform:"translate(-50%,-50%)"
	},
	sectionStylePrototype: {
		position:"relative",
		height:"100%"
	},
	linkStyle:{
		color:"white"
	},
	rowStyle:{
		marginTop:"15em"
	},
	buttonStyle:{
		backgroundColor:"rgba(255,255,255,0)",
		color:"white",
		borderColor:"white"
	},
	logoStyle:{
		position:"relative",
		top:"50%",
		left:"50%",
		transform:"translate(-50%,-50%)",
		maxHeight:"30em",
		maxWidth:"30em",
		display:"inline-block"
	}
}

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
				<section>
					<Grid>
						<Row style={styles.rowStyle}>

							<img style={styles.logoStyle} src={biglogo}/>

							<form onSubmit={this.handleSubmit}>
								<Col lg={11}>
									<FormGroup controlId="formBasicText">
										<ControlLabel></ControlLabel>
										<FormControl type="text" value={this.state.value} placeholder="Enter Name or Zipcode" onChange={this.handleChange} name="search"/>
									</FormGroup>
									<HelpBlock>
										<Link to="/advsearch" style={styles.linkStyle}>advanced search</Link>
									</HelpBlock>
								</Col>
								<Col lg={1} style={{"marginTop":"20px"}}>
									<Button type="submit" style={styles.buttonStyle}>Search</Button>
								</Col>
							</form>
					  	</Row>
				  	</Grid>
				</section>
			)
		}
		else{
			return <Redirect to={this.state.value} />
		}
	}
}

export default Search;
