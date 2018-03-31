import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './profile';
import Main from './main';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);

    // Create routes object for cleaner code.
    this.routes = {
      mainPage : "/",
      profilePage : "/profile/:nameParam"
    };

  }

  render(){
    return (
      <Router>
        <div>
          <Route exact path={this.routes.mainPage} component={Main}/>
          <Route exact path={this.routes.profilePage} component={Profile}/>
        </div>
      </Router>
    );
  }

}

export default App;
