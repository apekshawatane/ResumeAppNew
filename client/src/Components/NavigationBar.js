import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
  .navbar {
     background-color: #BB4F5E;
     position: fixed;
     display: flex;
     justify-content: space-between;
     align-items: center;
     overflow: hidden;
     width: 100%;
     top: 0;
  } 
  a, .navbar-nav, .navbar-light .nav-link{
    color: #9FFFCB;
    &:hover { color: white; };
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute fixed !important;
    left: 25%;
    right: 25%;
    top: 0;
  }
`;
export const NavigationBar = () => (
  <div className="sticky-top">
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">ResumeApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      {/* <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/applicant">Applicant</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/manager">Manager</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
  </div>
)