import React from "react";
import loginImg from "../football.svg";
import axios from 'axios';
import { Container, Carousel, Row, Col, Jumbotron, Figure , Spinner, Button, Form, Image, Alert} from 'react-bootstrap';
import styled from 'styled-components';
import Newsticker from 'react-newsticker';
const Styles = styled.div`

`;


export class Register extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    success: false,
    failure: false,
    badfailure: false,
    test: [" @              Game A Team A vs Team B Score 45-30 Team B", "@       Game B Team C vs Team D Score 45-30 Team C", "      Game C Team E vs Team F Score 45-30 Team F"],
     
  }
  constructor(props) {
    super(props);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
  }

  onSubmit = async () => {
    this.setState({show: true});
    await axios.post('http://138.47.204.105:5000/api/signup/', { "FirstName": this.state.firstname, "LastName": this.state.lastname, "Email": this.state.email, "Password": this.state.password}).then(value => {
      this.setState({success: true});
      this.setState({failure: false});
      this.setState({badfailure: false});
    }).catch(error => {
      console.log(error.response.status);
    if (error.response.status == "400") {
      this.setState({success: false});
      this.setState({failure: true});
      this.setState({badfailure: false});
    }
    else if (error.response.status == "500") {
      this.setState({success: false});
      this.setState({failure: false});
      this.setState({badfailure: true});
      //Place to reset number of password attempts
    }
  });


  }
    handleEChange(e) {
      this.setState({ email: e.target.value })
    }

    handlePChange(e) {
      this.setState({ password: e.target.value })
    }

    handleFChange(e) {
      this.setState({ firstname: e.target.value })
    }

    handleLChange(e) {
      this.setState({ lastname: e.target.value })
    }

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
                    className="d-block w-100"
                    src={require("../images/q1.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p1.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p2.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p3.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p4.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p5.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p6.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p7.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p8.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p9.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p10.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p11.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p12.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p13.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p14.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p15.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p16.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p17.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p18.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p19.jpg")}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p20.jpg")}
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
          <Row>
            <Col>
            <Newsticker news={this.state.test} />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Image src={require('../images/UBETCHA272.jpg')} />
            </Col>
            <Col sm={8}>
              <Jumbotron>
                <h1>Register</h1>
                <p>Please sign up and create an account with us!
                  Your email will only be used to recieve offers and updates from us.
                  No third party ads or usage!!
                </p>
              </Jumbotron>
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
          <Form>
            <Form.Group controlId="formFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="name" placeholder="First Name" onChange={this.handleFChange} />
            </Form.Group>
          </Form>
          </Col>
        </Row>
        <Row>
        <Col>
          <Form>
            <Form.Group controlId="formLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="name" placeholder="Last Name" onChange={this.handleLChange} />
            </Form.Group>
          </Form>
          </Col>
        </Row>
        <Row> 
          <Col>
          <Button variant="danger" size="lg" onClick={() => this.onSubmit()}>
          Register
        </Button>{' '}
          </Col>
        </Row>
        <Row>
          <Col>
            { this.state.failure && (<Alert variant="danger">
              <Alert.Heading>Signup Error!</Alert.Heading>
              <p>
                Failure to register.
              </p>
              <hr />
              <p className = "mb-0">
                This email is already in our system
              </p>
            </Alert>) }
          </Col>
        </Row>
        <Row>
          <Col>
            { this.state.success && (<Alert variant="success">
              <Alert.Heading>Success!</Alert.Heading>
              <p>
                You have successfully signed up, please login via the login page.
              </p>
            </Alert>) }
          </Col>
        </Row>
        <Row>
          <Col>
            { this.state.badfailure && (<Alert variant="danger">
              <Alert.Heading>Signup Error!</Alert.Heading>
              <p>
                Please re-type your information.
              </p>
            </Alert>) }
          </Col>
        </Row>
    </Container>
  </Styles>
    );
  }
}
export default Register;