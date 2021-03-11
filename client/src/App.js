import React, { Component, Fragment } from 'react';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';
// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Image} from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Components/Home';
import ManagerLogin from './Components/ManagerLogin';
import ApplicantPost from './Components/ApplicantPost';
import Applicant from './Components/Applicant';
import Protected from './Components/Protected';
import AuthenticatedComponent from './Components/AuthenticatedComponent';
import { NavigationBar } from './Components/NavigationBar';
import Logout from './Components/Logout';
import './css/bg.css';
// import resumeBG from './image/resumeBG.png';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <div>
          <header className="App-header">
            <div>
              {/* <React.Fragment>
  <Router>  */}
              <NavigationBar />
              {/* </Router>
</React.Fragment> */}
            </div>
{/* <div className="bg"></div> */}
            <div>
              <Switch>
                <Route exact path='/' exact component={Home} />
                <Route exact path='/manager'
                  render={(props) => <ManagerLogin {...props} />} />
                <Route exact path='/applicant'
                  render={(props) => <ApplicantPost {...props} />}
                />
                <AuthenticatedComponent>
                  {/* <Route exact path='/Protect' component={Protected} /> */}
                  <Route exact path='/applicant/viewApplicant' component={Applicant} />
                </AuthenticatedComponent>
                {/* <Route exact path='/applicant/viewApplicant' render={(props) => <Applicant {...props} />} />
                  <Route exact path='/Protect' render={(props) => <Protected {...props} />} /> */}
                <Route exact path='/logout' component={Logout} />

              </Switch>
            </div>
          </header>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;