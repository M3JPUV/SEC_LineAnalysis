import React from "react";
import loginImg from "../football.svg";
import axios from 'axios';
import { Container, Carousel, Row, Col, Jumbotron, Figure , Spinner, Button, Form, Alert} from 'react-bootstrap';
import styled from 'styled-components';


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
      this.setState({loginStatusA: "Invalid Signup"});
      this.setState({loginStatusB: ""});
      this.setState({loginStatusC: ""});
      this.setState({loginStatusD: "Your sign-up information is invalid"});
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
                src={require('../images/rsz_w1.jpg')}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require('../images/rsz_w3.jpg')}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-1000"
                src={require('../images/rsz_w5.jpg')}
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
        <Row>
          <Col> 
            <h1>Register</h1>
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