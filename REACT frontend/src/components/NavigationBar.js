import React from 'react';
import { Nav, Navbar, Container, Row, Col} from 'react-bootstrap';
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
  <Container>
    <Row>
      <Col>
    <Navbar expand="lg" fixed="top">
      <Navbar.Brand>uBETcha</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
      </Navbar.Collapse>
    </Navbar>
    </Col>
    </Row>
  </Container>
</Styles>
)