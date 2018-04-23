import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const styles = {
    panelStyle : {
        background : "rgba(248, 201, 149, 1)",
        color: "darkslategrey",
        borderColor: "rgba(222,127,24,.2)"
    },
    h1Style : {
        color:"white"
    },
    linkStyle : {
        color:"darkslategrey"
    },
    titleStyle : {
        color:"white"
    }
}

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
            <Grid>
                <Row>
                    <Col lg={12}>
                        <h1 style={styles.h1Style}>Search Results</h1>
                    </Col>
                    <div style={styles.titleStyle}>
                        <Col lg={4}>
                            <h2>Name</h2>
                        </Col>
                        <Col lg={6}>
                            <h2>Address</h2>
                        </Col>
                        <Col lg={2}>
                            <h2>Rating</h2>
                        </Col>
                    </div>
                    {this.state.response.map((response, index) => (
                        <Col lg={12} key={index}>
                            <Panel style={styles.panelStyle}>
                                <Panel.Body>
                                    <Row>
                                        <Col sm={4} md={4} lg={4}>
                                            <Link style={styles.linkStyle} to={"/court/" + response.court_id}><h3>{response.court_name.toUpperCase()}</h3></Link>
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
                                            <h3><FontAwesome name="star" size="1x"/> {response.rating}</h3>
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
        );
    }

}
export default AdvCourtList;
