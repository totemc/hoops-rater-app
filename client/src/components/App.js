import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Profile from './pages/ProfilePage';
import CourtView from './pages/CourtViewPage';
import Header from './common/Header';
import NotFound from './pages/NotFoundPage';
import { Security, ImplicitCallback, SecureRoute} from '@okta/okta-react';
import Home from './pages/HomePage';
import Account from './pages/AccountPage';
import AUTH_CONFIG from './auth-config';
import CourtList from './pages/CourtListPage';
import Search from './pages/SearchPage';
import AdvSearch from './pages/AdvSearchPage';
import AdvCourtList from './pages/AdvCourtListPage';

const config = {
  issuer: AUTH_CONFIG.oidc.issuer,
  redirect_uri: AUTH_CONFIG.oidc.redirect_uri,
  client_id: AUTH_CONFIG.oidc.client_id
}

class App extends Component {

  constructor(props){
    super(props);
    
    // Create routes object for cleaner code.
    this.routes = {
      root : "/",
      implicitCallback : "/implicit/callback",
      mainPage : "/main",
      profilePage : "/profile/:nameParam",
      courtViewPage : "/court/:id",
      notFoundPage : "/404",
      accountPage : "/account",
      court: "/search/court/:nameParam",
      search: "/search",
      advSearch: "/advsearch",
      advCourtList: "/advsearch/court/:courtAttributes"
    };

    this.state = {
      loggedIn : true,
      currentUser: 'user1'
    }


  }

  render(){
    return (
      <div>
        <Router>
          <Security issuer={config.issuer}
                    client_id={config.client_id}
                    redirect_uri={config.redirect_uri}>
                    <Header loginValue={this.state.loggedIn} currentUser={this.state.currentUser}/>
              <Switch>
                <Route exact path={this.routes.root} component={Home}/>
                <Route exact path={this.routes.search} component={Search}/>
                <Route exact path={this.routes.implicitCallback} component={ImplicitCallback}/>
                <Route exact path={this.routes.profilePage} component={Profile}/>
                <Route exact path={this.routes.courtViewPage} component={CourtView}/>
                <Route exact path={this.routes.notFoundPage} component={NotFound}/>
                <Route exact path={this.routes.court} component={CourtList}/>
                <Route exact path={this.routes.advSearch} component={AdvSearch}/>
                <Route exact path={this.routes.advCourtList} component={AdvCourtList}/>
                <SecureRoute path={this.routes.accountPage} component={Account} />
                <Route component={NotFound}/>
              </Switch>
          </Security>
        </Router>
      </div>
    );
  }

}

export default App;
