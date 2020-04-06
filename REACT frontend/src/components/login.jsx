import React from "react";
import loginImg from "../football.svg";
import axios from 'axios';
import { Container, Carousel, Row, Col, Jumbotron, Figure , Spinner, Button, Form, Alert} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`

`;


export class Login extends React.Component {
  state = {
    email: '',
    password: '',
    success: false,
    bademail: false,
    badpassword: false,
  }
  constructor(props) {
    super(props);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
  }

  onSubmit = async () => {
    this.setState({show: true});
    await axios.post('http://138.47.204.105:5000/api/login/', { "Email": this.state.email, "Password": this.state.password}).then(value => {
      this.setState({success: true});
      this.setState({bademail: false});
      this.setState({badpassword: false});
      //Place to reset number of password attempts
    }).catch(error => {
      console.log(error.response.status);
    if (error.response.status == "402") {
      this.setState({bademail: true});
      this.setState({success: false});
      this.setState({badpassword: false});
    }
    else if (error.response.status == "401") {
      this.setState({success: false});
      this.setState({bademail: false});
      this.setState({badpassword: true});
      //Place for number of invalid password attempts
    }});
  }

  handleEChange(e) {
    this.setState({ email: e.target.value })
  }
  handlePChange(e) {
    this.setState({ password: e.target.value })
  }

  //API goes here

  render() {
    return (
      <Styles>
          <Container fluid>
          <Row>
            <Col>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/rsz_w1.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/rsz_w3.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-1000"
                    src={require("../images/rsz_w5.jpg")}
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
            <Row>
              <Col> 
                <h1>Login</h1>
              </Col>
            </Row>
            <Row>
              <Col>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="example@email.com" onChange={this.handleEChange} />
                </Form.Group>
              </Form>
              </Col>
            </Row>
            <Row>
            <Col>
              <Form>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={this.handlePChange} />
                </Form.Group>
              </Form>
              </Col>
            </Row>
            <Row> 
              <Col>
              <Button variant="danger" size="lg" onClick={() => this.onSubmit()}>
              Login
            </Button>{' '}
              </Col>
            </Row>
            <Row>
              <Col>
                { this.state.bademail && (<Alert variant="danger">
                  <Alert.Heading>Login Error!</Alert.Heading>
                  <p>
                    We do not have that email in our system.
                  </p>
                  <hr />
                  <p className = "mb-0">
                    Please retype your email OR sign-up using the register page.
                  </p>
                </Alert>) }
              </Col>
            </Row>
            <Row>
              <Col>
                { this.state.badpassword && (<Alert variant="warning">
                  <Alert.Heading>Login Error!</Alert.Heading>
                  <p>
                    We do not recognise that password.
                  </p>
                  <hr />
                  <p className = "mb-0">
                    Please retype your password.
                  </p>
                </Alert>) }
              </Col>
            </Row>
            <Row>
              <Col>
                { this.state.success && (<Alert variant="success">
                  <Alert.Heading>Success</Alert.Heading>
                  <p>
                    You may now visit other pages on our site! 
                  </p>
                </Alert>) }
              </Col>
            </Row>
        </Container>
      </Styles>
    );
  }
}
export default Login;