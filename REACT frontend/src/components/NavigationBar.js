import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #DC143C;
    &:hover { color: red; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #DC143C;
    &:hover { color: red; }
  }
  .form-center {
    left: 25%;
    right: 25%;
  }
  .container{
    overflow-y: scroll;
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">uBETcha</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Login">Login</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Register">Register</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Subscriptions">Subscriptions</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Basic">Basic</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Advanced">Advanced</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/Pro">Pro</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)