import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Grid, Row, Col, Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles = {
    jumboStyle:{
        textAlign: "center",
        minHeight: "35em",
        background : "rgba(248, 201, 149, 1)"

    }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }


        render () {
            // render the correct button

            const button = this.state.authenticated ? <Button onClick={this.logout}>Log out</Button> : <Button onClick={this.login}>Log in</Button>;
            let buttons;

            if(this.state.authenticated){
                buttons = (
                    <Col lg={12} style={{textAlign:"center"}}>
                         <Link to="/search"> <Button className="buttonLanding">Search</Button></Link>
                    </Col>
                )
            }else{
                buttons = (
                    <div>
                        <Col lg={6} style={{textAlign:"right"}}>
                            <Link to="/signup" ><Button className="buttonLanding"> Sign up </Button></Link>
                        </Col>
                        <Col lg={6} style={{textAlign:"left"}}>
                             <Link to="/search"> <Button className="buttonLanding" style={{ marginLeft:"2em"}}>Search</Button></Link>
                        </Col>
                    </div>
                )
            }
            return (
                <Jumbotron style={styles.jumboStyle}>
                    <h1>Hoops Rater</h1>
                    <h3>Never be uncertain about a basketball court ever again.</h3>
                    <Grid>
                        <Row>
                            <Col lg={12}>
                                <Row style={{marginTop:"2em"}}>
                                    {buttons}
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
            );
        }
};

export default withAuth(Home);

