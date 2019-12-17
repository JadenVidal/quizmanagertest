import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import LandingPage from './containers/landingPage';
import Header from './components/header';
import HomePage from './containers/homePage';
import SigninPage from './containers/signinPage';
import SignupPage from './containers/signupPage';
import ViewPage from './containers/viewPage';
import CreatePage from './containers/createPage';
import { getCookie } from './actions/cookie';

class Routes extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" 
                render={props => {
                  if (!getCookie('session')) {
                    return <LandingPage />;
                  }else{
                    return <HomePage />;
                  }
                }}/>
              <Route exact path="/signin" component={SigninPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/view" component={ViewPage} />
              <Route exact path="/create/:id" component={CreatePage} />
              <Redirect to="/" />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default Routes;