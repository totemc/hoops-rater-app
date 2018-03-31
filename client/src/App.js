import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Profile from './profile';
import CourtView from './courtview';
import Main from './main';
import Header from './header';
import NotFound from './notFound'

class App extends Component {

  constructor(props){
    super(props);

    // Create routes object for cleaner code.
    this.routes = {
      mainPage : "/",
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
<<<<<<< HEAD
      <div>
        <Header loginValue={this.state.loggedIn} currentUser={this.state.currentUser}/>
        <Router>
          <Switch>
              <Route exact path={this.routes.mainPage} component={Main}/>
              <Route exact path={this.routes.profilePage} component={Profile}/>
              <Route exact path={this.routes.notFoundPage} component={NotFound}/>
              <Route component={NotFound}/>
          </Switch>
        </Router>
      </div>
=======
      <Router>
        <div>
          <Route exact path="/" component={Main}/>
          <Route exact path="/profile/:nameParam" component={Profile}/>
          <Route exact path="/court/:id" component={CourtView}/>
        </div>
      </Router>
>>>>>>> court-view
    );
  }

}

export default App;
