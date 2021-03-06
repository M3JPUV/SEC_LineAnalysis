import React from "react";
import axios from 'axios';
import { Container, Carousel, Row, Col, Jumbotron , Image, Button, Form, Alert} from 'react-bootstrap';
import styled from 'styled-components';
import Newsticker from 'react-newsticker';
const Styles = styled.div`

`;


export class Login extends React.Component {
  state = {
    token: '',
    email: '',
    password: '',
    success: false,
    bademail: false,
    badpassword: false,
    badfailure: false,
    test: [""], 
  }
  constructor(props) {
    super(props);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
  }

  componentDidMount(){
    axios.get("http://138.47.204.105:5000/api/Scores").then(res => {
      this.setState({test: res.data});
    })
  }

  sendCredentials = () => {
    this.props.parentCallbackT(this.state.token);
    this.props.parentCallbackL(this.state.email);
  }

  onSubmit = async () => {
    if (!this.isEmptyOrSpaces(this.state.email) || !this.isEmptyOrSpaces(this.state.password)){
        await axios.post('http://138.47.204.105:5000/api/login/', { "Email": this.state.email, "Password": this.state.password}).then(res => {
          this.setState({token: res.data.toString()});
          this.setState({success: true});
          this.setState({bademail: false});
          this.setState({badpassword: false});
          this.setState({badfailure: false});
          this.sendCredentials();
        }).catch(error => {
        if (error.response.status.toString() == "402") {
          this.setState({bademail: true});
          this.setState({success: false});
          this.setState({badpassword: false});
        }
        else if (error.response.status.toString() == "401") {
          this.setState({success: false});
          this.setState({bademail: false});
          this.setState({badpassword: true});
        }}).catch(err => {});
      }
    else{
      this.setState({badfailure: true});
    }
  }

  handleEChange(e) {
    this.setState({ email: e.target.value })
  }
  handlePChange(e) {
    this.setState({ password: e.target.value })
  }

  isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
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
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/rsz_w3.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/q1.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p1.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p2.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p3.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p4.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p5.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p6.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p7.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p8.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p9.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p10.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p11.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p12.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p13.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p14.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p15.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p16.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p17.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p18.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p19.jpg")}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={require("../images/p20.jpg")}
                    alt=""
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
                <h1>Login</h1>
                <p>If you have any issues with logging in, please contact us via the "Contact Us" page. We eill try to get back to you as quickly as possible.</p>
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
            <Row>
              <Col>
              { this.state.badfailure && (<Alert variant="danger">
              <Alert.Heading>Signup Error!</Alert.Heading>
              <p>
                Please type something in each field.
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