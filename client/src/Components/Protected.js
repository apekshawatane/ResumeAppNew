import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter, Router, Switch, NavLink } from 'react-router-dom'
import Applicant from '../Components/Applicant';
import Logout from '../Components/Logout';
import AuthenticatedComponent from './AuthenticatedComponent';
// import Table from '../Components/Table';

const Protected = () => {
    
    return(
        
        <BrowserRouter>
        <div>
        <h1>I am Protected</h1>
        <div>
                    <NavLink to="/applicant/viewApplicant">VIEW APPLICANTS</NavLink> <br />
                   
        </div>
        <Switch>
            <Route path='/applicant/viewApplicant' component={Applicant} exact />

        </Switch>
        {/* <ul>
            <li><a href="/applicant/viewApplicant">View Applicants</a></li>
        </ul> */}
        </div>
        </BrowserRouter>
       
    )
    // ReactDOM.render(Protected, document.getElementById('root'));
};

export default Protected;