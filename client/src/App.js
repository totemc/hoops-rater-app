import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Profile from './profile';
import Main from './main';
import Header from './header';
import NotFound from './notFound';
import { Security, ImplicitCallback } from '@okta/okta-react';
import Home from './home';

const config = {
  issuer: 'https://dev-947498.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaeiol7nu8DRAqCz0h7'
}

class App extends Component {

  constructor(props){
    super(props);

    // Create routes object for cleaner code.
    this.routes = {
      root : "/",
      implicitCallback : "/implicit/callback"
      mainPage : "/main",
      profilePage : "/profile/:nameParam",
      notFoundPage : "/404"
    };

    this.state = {
      loggedIn : true,
      currentUser: 'user1'
    }

  }

  render(){
    return (
      <div>
        <Header loginValue={this.state.loggedIn} currentUser={this.state.currentUser}/>
        <Router>
          <Security issuer={config.issuer}
                    client_id={config.client_id}
                    redirect_uri={config.redirect_uri}
          >
            <Switch>
                <Route exact path={this.routes.root} component={Home}/>
                <Route path={this.routes.implicitCallback} component={ImplicitCallback}/>
                <Route exact path={this.routes.mainPage} component={Main}/>
                <Route exact path={this.routes.profilePage} component={Profile}/>
                <Route exact path={this.routes.notFoundPage} component={NotFound}/>
                <Route component={NotFound}/>
            </Switch>
          </Security>
        </Router>
      </div>
    );
  }

}

export default App;
