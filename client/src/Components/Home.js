import React from 'react';
import { Route, Link, BrowserRouter, Router, Switch, NavLink } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';
import ApplicantPost from '../Components/ApplicantPost';
import ManagerLogin from '../Components/ManagerLogin';
import Protected from './Protected';
// import AuthenticatedComponent from './AuthenticatedComponent';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../css/bg.css';
import Applicant from './Applicant';
import resumeBG from '../image/resumeBG.png';
import { Image } from 'react-bootstrap';



const Home = () => {
  return (
    <BrowserRouter>

<MDBView>
              {/* <img
                src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg"
                className="img-fluid"
                alt=""
              /> */}
              <div className="bg"></div>
              <MDBMask className="flex-center black-text" overlay="teal-slight">
               
                <h1>WELCOME TO THE RESUME APPLICATION</h1>

          {/* <div>
            <NavLink to="/applicant">APPLICANT</NavLink> <br />
            <NavLink to="/manager">MANAGER</NavLink>
          </div> */}
              </MDBMask>
            </MDBView>

      <div style={{ width: 'auto' }}>
        {/* <Image 
                  style={sectionStyle} responsive 
                  >
        <div style={textStyle}> */}
          {/* <h1>Resume App</h1>

          <div>
            <NavLink to="/applicant">APPLICANT</NavLink> <br />
            <NavLink to="/manager">MANAGER</NavLink>
          </div> */}
        </div>
        {/* </Image>
      </div> */}








      <Switch>
        <Route path='/applicant' component={ApplicantPost} exact />
        <Route path='/manager' component={ManagerLogin} exact />
        {/* <AuthenticatedComponent> */}
        {/* <Route path='/Protect' component={Protected} />  */}
        {/* <Route path='/applicant/viewApplicant' component={Applicant} /> */}
        {/* </AuthenticatedComponent>  */}

        {/* <Route path='/ApplicationSubmitted' component={ApplicationSubmitted} /> */}

      </Switch>

    </BrowserRouter>
  )
};

export default Home;