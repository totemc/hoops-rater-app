import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';

export default withAuth(class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      error: null,
      username: '',
      password: ''
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }))
      .catch(err => {
        this.setState({error: err.message});
        console.log(err.statusCode + ' error', err)
      });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ?
	<span className="error-message">{this.state.error}</span> :
	null;

    return (
        <Grid>
            <Row>
                <h1> Log in </h1>
                <Col lg={4} lgOffset={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Email Address</ControlLabel>
                            <FormControl type="email" value={this.state.username} onChange={this.handleUsernameChange}/>
                            <br/>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        </FormGroup>
                        <Button type="submit">Login</Button>
                    </form>
                </Col>
            </Row>
        </Grid>
    );
  }
});
