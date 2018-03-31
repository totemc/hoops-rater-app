import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Profile from './profile';
import Main from './main';
import Header from './header';

class App extends Component {

  constructor(props){
    super(props);

    // Create routes object for cleaner code.
    this.routes = {
      mainPage : "/",
      profilePage : "/profile/:nameParam"
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
          <div>
            <Route exact path={this.routes.mainPage} component={Main}/>
            <Route exact path={this.routes.profilePage} component={Profile}/>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
