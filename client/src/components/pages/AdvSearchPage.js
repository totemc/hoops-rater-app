import React from 'react';
import {Redirect} from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';

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
                <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder='Enter Zipcode' onChange={this.handleChangeZipcode}/>
                <label>test
                <br></br>
                <select name='value' onChange={this.handleChangeBusiestTime}>
                    <option value='default'>default</option>
                    <option value='Excellent'>Excellent</option>
                    <option value='Good'>Good</option>
                    <option value='Poor'>Poor</option>
                </select>
                </label>
                <label>anotherOne
                <br />
                <select onChange={this.handleChangeRating}>
                    <option value='default'>default</option>
                    <option value='Excellent'>Excellent</option>
                    <option value='Good'>Good</option>
                    <option value='Poor'>Poor</option>
                </select>
                </label>
                <input type='submit' value='Submit' />
                </form>
            );
        } else{
            return <Redirect to={this.state.value} />
        }
    }
}
export default AdvSearch;
