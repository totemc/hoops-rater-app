import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

class AdvCourtList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            response: []
        };
    }

    componentDidMount(){
        this.callApi()
          .then(res => {
            this.setState({response: res})
        })
          .catch(err => {
            console.log('Did not setState to response.')
            console.log(err);
        });
    }

    callApi = async () => {
        // Talk to our middleware with the zipcode and attributes in question
        const response = await

        fetch('/api/advsearch/court/'+this.props.match.params.courtAttributes);

        // Get our response body
        const body = await response.json();

        // If we do not receive a 200 OK success code, throw an error. The state is not changed.
        // Error prints in the catch in the function call.
        if(response.status !== 200){
           throw Error(body.message)
           }
           return body;
    }

    render(){
        return(
            <div>
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <h1>Search Results</h1>
                        </Col>
                        {this.state.response.map((response, index) => (
                            <Col lg={12} key={index}>
                                <Panel>
                                    <Panel.Body>
                                        <Row>
                                            <Col sm={4} md={4} lg={4}>
                                                <Link to={"/court/" + response.court_id}><h3>{response.court_name}</h3></Link>
                                            </Col>
                                            <Col sm={6} md={6} lg={6}>
                                                <Row>
                                                    <Col lg={6}>
                                                        <h3>{response.address}</h3>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <h3>{response.court_zip}</h3>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col sm={2} md={2} lg={2}>
                                                <h3>{response.court_id}</h3>
                                            </Col>
                                            <Col lg={12}>
                                                some other information TBD
                                            </Col>
                                        </Row>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        ))}
                    </Row>
                </Grid>
            </div>
        );
    }

}
export default AdvCourtList;
