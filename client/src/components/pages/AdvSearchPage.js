import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock, Checkbox } from 'react-bootstrap';

class AdvSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            madeSearch: false,
            value:'default',
            court_zip:'default',
            outdoor_status: 'default',
            rating: 'default',
            open_time: 'default',
            close_time: 'default',
            membership_status: 'default',
            busiest_times: 'default'
        };
        this.handleChangeZipcode = this.handleChangeZipcode.bind(this);
        this.handleChangeBusiestTime = this.handleChangeBusiestTime.bind(this);
        this.handleChangeMemberStatus = this.handleChangeMemberStatus.bind(this);
        this.handleChangeOpenHours = this.handleChangeOpenHours.bind(this);
        this.handleChangeCloseHours = this.handleChangeCloseHours.bind(this);
        this.handleChangeOutdoorStatus = this.handleChangeOutdoorStatus.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChangeZipcode(e){
        this.setState({court_zip: e.target.value})
    }

    handleChangeBusiestTime(e){
        this.setState({busiest_times: e.target.value})
    }

    handleChangeMemberStatus(e){
        this.setState({membership_status: e.target.value})
    }

    handleChangeOpenHours(e){
        this.setState({open_time: e.target.value})
    }

    handleChangeCloseHours(e){
        this.setState({close_time: e.target.value})
    }

    handleChangeOutdoorStatus(e){
        this.setState({outdoor_status: e.target.value})
    }

    handleChangeRating(e){
        this.setState({rating: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        let newValue = '/advsearch/court/';
        Object.keys(this.state).map((key) => {
            if (this.state[key] != 'default'){
                if(newValue == '/advsearch/court/'){
                    newValue += (key+'='+this.state[key])
                } else{
                    newValue += ('+' + key + '=' + this.state[key])
                }
            }
        })
        this.setState((prev) => ({
            madeSearch: true,
            value: newValue
        }))

        //this.setState({value: e.target.newValue})
        console.log(this.state.value)
    }

    render(){
//        console.log("court" + this.state.court_zip)
//        console.log("rating" + this.state.rating)
        console.log('value' + this.state.value)
        if(!this.state.madeSearch){
            return(
                <Grid>
                    <Row>
                        <form onSubmit={this.handleSubmit}>
                            <Col lg={11}>
                                <FormGroup controlId="formBasicText">
                                    <ControlLabel>Search</ControlLabel>
                                    <FormControl type="text" placeholder="Enter Zipcode" onChange={this.handleChangeZipcode}/>
                                </FormGroup>
                            </Col>
                            <Col lg={1} style={{"marginTop":"25px"}}>
                                <Button type="submit">Search</Button>
                            </Col>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={2}>
                                        <ControlLabel>Busiest Times</ControlLabel>
                                        <FormGroup controlId="formControlSelect" name="value" onChange={this.handleChangeBusiestTime}>
                                            <FormControl componentClass="select">
                                                <option value="default">Default</option>
                                                <option value="poor">Poor</option>
                                                <option value="good">Good</option>
                                                <option value="excellent">Excellent</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <ControlLabel>Member Status</ControlLabel>
                                        <Checkbox onChange={this.handleChangeMemberStatus}>Membership Needed</Checkbox>
                                    </Col>
                                    <Col lg={4}>
                                        <ControlLabel>Hours</ControlLabel>
                                        <Row>
                                            <Col lg={5}>
                                                <FormGroup controlId="formControlSelect" name="value" onChange={this.handleChangeOpenHours}>
                                                    <FormControl componentClass="select">
                                                        <option value="default">Default</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </FormControl>
                                                </FormGroup>
                                            </Col>
                                            <Col lg={2} style={{"textAlign":"center"}}>
                                                to
                                            </Col>
                                            <Col lg={5}>
                                                <FormGroup controlId="formControlSelect" name="value" onChange={this.handleChangeCloseHours}>
                                                    <FormControl componentClass="select">
                                                        <option value="default">Default</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </FormControl>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={2}>
                                        <ControlLabel>Outdoor Status</ControlLabel>
                                        <Checkbox onChange={this.handleChangeOutdoorStatus}>Indoors</Checkbox>
                                    </Col>
                                    <Col lg={2}>
                                        <ControlLabel>Rating</ControlLabel>
                                        <FormGroup controlId="formControlSelect" name="value" onChange={this.handleChangeRating}>
                                            <FormControl componentClass="select">
                                                <option value="default">Default</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <HelpBlock>
                                    <Link to="/search">regular search</Link>
                                </HelpBlock>
                            </Col>
                        </form>
                    </Row>
                </Grid>
            );
        } else{
            return <Redirect to={this.state.value} />
        }
    }
}
export default AdvSearch;
