import React from "react";
import {
  Container,
  Carousel,
  Row,
  Col,
  Jumbotron,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import Newsticker from 'react-newsticker';
const Styles = styled.div``;

export class ContactUs extends React.Component {
    state = {
        email: '',
        subject: '',
        message: '',
        verifiedLogin: false,
        majorerror: false,
        retype: false,
        successM: false,
        test: [""],
       };
  constructor(props) {
    super(props);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleMChange = this.handleMChange.bind(this);
  }

  handleEChange(e) {
    this.setState({ email: e.target.value })
  }

  handleSChange(e) {
    this.setState({ subject: e.target.value })
  }
  handleMChange(e) {
    this.setState({ message: e.target.value })
  }

   componentDidMount(){
      axios.get("http://138.47.204.105:5000/api/Scores").then(res => {
        this.setState({test: res.data});
      })
       this.verifyLogin();
   }

   verifyLogin = () => {
    axios.post('http://138.47.204.105:5000/api/checkTokens/', { "Token": this.props.token, "Login": this.props.LC }).then(res => {
      if (res.data != null ){
        if (res.data.Basic.toString() === "1"){
          this.setState({verifiedLogin: true});
        }
    }
    }).catch(error => { });
   }

   isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
    }

onSubmit = async () => {
    if (!this.isEmptyOrSpaces(this.state.email) || !this.isEmptyOrSpaces(this.state.subject) || !this.isEmptyOrSpaces(this.state.message)){
        await axios.post('http://138.47.204.105:5000/api/ContactUs/', { "Email": this.state.email, "Subject": this.state.subject, "Message": this.state.message}).then(res => {
          this.setState({majorerror: false});
          this.setState({retype: false});
          this.setState({successM: true});
        }).catch(error => {
        if (error.response.status.toString() == "500") {
          this.setState({majorerror: true});
          this.setState({retype: false});
          this.setState({successM: false});
        }}).catch(err => {});
      }
    else{
      this.setState({retype: true});
      this.setState({successM: false});
      this.setState({majorerror: false});
    }
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
              <Image src={require("../images/UBETCHA272.jpg")} />
            </Col>
            <Col sm={8}>
              <Jumbotron>
                <h1>Contact Us</h1>
                <p>
                  If you have any questions or issues, please contact us with any of the methods below.
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
              <Col>
                  <Jumbotron>
                    <h1>Direct Messanger</h1>
                    <p>If you would like us to contact us directly in our system, feel free to use the Direct Messanger. Rember to leave a valid email for us to contact you at.</p>
                </Jumbotron>
              </Col>
          </Row>
          <Row>
            <Col>
            { !this.state.verifiedLogin && (<Alert variant="danger">
                  <Alert.Heading>Direct Messanger</Alert.Heading>
                  <p>
                    Note that you are currently not logged in. In order to use our direct messanger, please Log-In to contact us (if you are having issues loggin in, please email us or contact us on social media below).
                  </p>
                </Alert>) }
            </Col>
          </Row>
          <Row>
              <Col>
                { this.state.verifiedLogin && <React.Fragment>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group controlId="formEmail">
                                <Form.Label>Contact Email Address</Form.Label>
                                <Form.Control type="email" placeholder="example@email.com" onChange={this.handleEChange} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group controlId="formSubject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="subject" placeholder="example subject" onChange={this.handleSChange} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group controlId="formMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" placeholder="Type your message here..." rows={"8"} onChange={this.handleMChange} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="danger" size="lg" onClick={() => this.onSubmit()}>
                            Submit Message
                            </Button>{' '}
                        </Col>
                    </Row>
                    </React.Fragment>} 
                </Col>
          </Row>
          <Row>
              <Col>
                 { this.state.majorerror && (<Alert variant="danger">
                  <Alert.Heading>Oops</Alert.Heading>
                  <p>
                    It appears that there is an error on our end. Please contact us directly via email or social media. We apologize for any inconvinenience.</p>
                </Alert>) }
              </Col>
          </Row>
          <Row>
              <Col>
                 { this.state.retype && (<Alert variant="danger">
                  <Alert.Heading>Alert</Alert.Heading>
                  <p>
                    Please type something in each field before hitting "Submit".</p>
                </Alert>) }
              </Col>
          </Row>
          <Row>
              <Col>
                 { this.state.successM && (<Alert variant="success">
                  <Alert.Heading>Success</Alert.Heading>
                  <p>
                    We have recieved your message. We will get back to you as quickly as possible.</p>
                </Alert>) }
              </Col>
          </Row>
          <Row>
              <Col>
                <Jumbotron>
                    <h1>Social Media</h1>
                    <p>Feel free to direct message us in any of the social media platforms below.</p>
                </Jumbotron>
              </Col>
          </Row>
          <Row>
              <Col>
                <p>Twitter and facebook</p>
              </Col>
          </Row>
          <Row>
              <Col>
                <Jumbotron>
                    <h1>Email</h1>
                    <p>Feel free to contact us directly at ....</p>
                </Jumbotron>
              </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}
