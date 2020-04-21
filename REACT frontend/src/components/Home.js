import React from "react";
import {
  Container,
  Carousel,
  Row,
  Col,
  Jumbotron,
  Image,
  Table,
} from "react-bootstrap";
import styled from "styled-components";
import { GameBox } from "./GameBox.jsx";
import axios from "axios";
import Newsticker from 'react-newsticker';
const Styles = styled.div``;

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GameCount: 0,
      test: [" @              Game A Team A vs Team B Score 45-30 Team B", "@       Game B Team C vs Team D Score 45-30 Team C", "      Game C Team E vs Team F Score 45-30 Team F"],
      Iterator: 0,
      Games: [],
      HomeLinks: [],
      VorALinks: [],
      AwayLinks: [],
      PwinTLinks: [],
      loaded: false,
    };
  }

   componentDidMount(){
     axios.get("http://138.47.204.105:5000/api/gamebox").then(res => {
       this.setState({Games: JSON.stringify(res.data)});
       this.setState({GameCount: this.state.Games.length});
      this.setState({Games: JSON.parse(this.state.Games)});
      this.setState({GameCount: this.state.Games.length});
       var i = 0;
       for (i=0; i < this.state.GameCount; i++) {
         if (i === 0){
         var h = this.state.HomeLinks;
         var v = this.state.VorALinks;
         var a = this.state.AwayLinks;
         var p = this.state.PwinTLinks;
         }
         a.push(this.state.Games[i].awayTeam);
         v.push(this.state.Games[i].VSorAT);
         h.push(this.state.Games[i].homeTeam);
         p.push(this.state.Games[i].PwinT)
         if (i === this.state.GameCount -1){
         this.setState({HomeLinks: h});
         this.setState({VorALinks: v});
         this.setState({AwayLinks: a});
         this.setState({PwinTLinks: p});
         this.setState({loaded: true});
         }
       }
       
     }).catch(error => console.log(error));
     
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
                <h1>Welcome to uBETcha!!!</h1>
                <p>
                  We are a College football betting model website, to learn
                  about how we make our model and paid subscriptions, continue scrolling to the bottom of the home screen. Below is our top 3
                  games for the week.
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
    { this.state.loaded && <React.Fragment><h1>Game 1</h1><GameBox away={(this.state.AwayLinks[0].toString())} VorA={(this.state.VorALinks[0].toString())} home={(this.state.HomeLinks[0].toString())} PwinT={(this.state.PwinTLinks[0].toString())} /> </React.Fragment>
    }
    { this.state.loaded && <React.Fragment><h1>Game 2</h1><GameBox away={(this.state.AwayLinks[1].toString())} VorA={(this.state.VorALinks[1].toString())} home={(this.state.HomeLinks[1].toString())} PwinT={(this.state.PwinTLinks[1].toString())} /> </React.Fragment>
    }
    { this.state.loaded && <React.Fragment><h1>Game 3</h1><GameBox away={(this.state.AwayLinks[2].toString())} VorA={(this.state.VorALinks[2].toString())} home={(this.state.HomeLinks[2].toString())} PwinT={(this.state.PwinTLinks[2].toString())} /> </React.Fragment>
    }
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Our Mission Statement</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>We are a college football betting model website. We are transparent on how we make money and how the model works (see "Monetization" and "The Model" below). 
                We promise to be fair in pricing, adhere to good Security and Ethical standards, and to always be willing to serve our customers. ~Lane Arnold 2020 
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Our Staff</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Lane Arnold</h1>
                <p>Project Lead [Front End, Security, Database, and Express Endpoints]</p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={require("../staff/lanefinal.jpg")} />
            </Col>
            <Col>
              <h2>Lane Arnold is a senior at Louisiana Tech University. He will graduate with a Bachelor's in Compter Science with a concentration in Cybersecurity. He is pursuing a carrer in the Security field or Specialized Embedded Systems. 
                He was project lead, and head of Security Features, Express endpoints, and the React frontend. Graduating in November 2020.
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Andrew Almond</h1>
                <p>Software Engineer []</p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={require("../staff/drew.png")} />
            </Col>
            <Col>
              <h3>Andrew Almond is a senior at Louisiana Tech University pursuing a Bachelor of Science in Computer Science. Andrew is concentrating in Big Data, Cybersecurity and Cloud Computing and is planning to work in the security or big data fields. He gathered, processed and modeled the data as well as oversaw changes between the frontend and backend model to ensure smooth transitioning between them.

              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Matthew Tures</h1>
                <p>Software Engineer []</p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={require("../staff/matt.jpg")} />
            </Col>
            <Col>
              <h3>Matthew is a Senior Computer Science major at Louisiana Tech University, with concentrations in game design and cyber security. Matthew previously held a job as an intern at a cyber security company and would like to have a career in either cyber security or game design. In this project, he assisted in security measures, API communication and database queries.
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                 <h1>Travis Freese</h1>
                <p>Software Engineer []</p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={require("../staff/travisfinal.png")} />
            </Col>
            <Col>
              <h2>Travis Freese is a senior at Louisiana Tech University pursuing a Bachelors degree in computer science. Travis is concentrating in Computer Engineering and planning on working with embedded systems after graduation. For this project Travis maintained the SQL databases and aided in the design of the mathematical model.</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Zach Bignall</h1>
                <p>Sofware Engineer</p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={require("../staff/zach.jpg")} />
            </Col>
            <Col>
              <h3>Zachery Bignall is a senior at Louisiana Tech University getting a Bachelor of science in computer science. 
With concentrations in Big data, Cybersecurity, and Cloud Computing,
he was the head data scientist for getting the Probability of who will win a game on this project. 
After this project he plans on finishing his  college career at Louisiana Tech University a and pursuing a job in the field of computer science.</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Our Website</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>Navigation</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>We wanted our website to be diffrent than a typical website design. That influenced our design decisions to have the photo-carousels, the sidebar with the unique buttons, and our logo placement.
                For those who are confused about the buttons, a table with the descriptions are below.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Button</th>
                    <th>Button Name</th>
                    <th>Button Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Image src={require("../images/1.png")} />
                    <td>Home</td>
                    <td>Welcome page and general Website info.</td>
                  </tr>
                  <tr>
                    <Image src={require("../images/2.png")} />
                    <td>Login</td>
                    <td>Login Page.</td>
                  </tr>
                  <tr>
                    <Image src={require("../images/3.png")} />
                    <td>Register</td>
                    <td>Create uBETcha account.</td>
                  </tr>
                  <tr>
                    <Image src={require("../images/4.png")} />
                    <td>Subscriptions</td>
                    <td>View and sign-up for paid Subscriptions.</td>
                  </tr>
                  <tr>
                    <Image src={require("../images/5.png")} />
                    <td>Basic</td>
                    <td>Basic (free to public) model page.</td>
                  </tr>
                  <tr>
                    <Image src={require("../images/6.png")} />
                    <td>Advanced</td>
                    <td>Advanced (Subscription Based) model page.</td>
                  </tr>
                  <tr>
                    <Image src={require("../images/7.png")} />
                    <td>Pro</td>
                    <td>Pro (Subscription Based) model page.</td>
                  </tr>
                  <tr>
                    <Image src={require("../images/8.png")} />
                    <td>Contact Us</td>
                    <td>Various ways to conatact us directly.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
                <h1>Monetization</h1>
            </Col>
          </Row>
          <p>We want to be transparent on how we make money. We only make money from paid Subscriptions from our users. We do not allow ads on the website nor sell your information or email.
             If you want to support us, coinsider purchasing one of our Subscriptions.
          </p>
          <Row>
            <Col>
                <h1>Security</h1>
            </Col>
          </Row>
          <Row>
            <Col>
                <h3>We take security very seriously. Here are some of the features of our system.</h3>
            </Col>
          </Row>
          <Row>
            <Col>
                <h4>#Password Hashing</h4>
            </Col>
          </Row>
          <Row>
            <Col>
                <p>We never store your passwords. We hash your passwords and store the hashed password and store the hashed password in our database. When your login, we compare your password to the 
                  hashed password.
                </p>
            </Col>
          </Row>
          <Row>
            <Col>
                <h4>#Mega Tokens</h4>
            </Col>
          </Row>
          <Row>
            <Col>
                <p>"Mega Tokens" are our custom 1024 length encrypted tokes based off of a key that is randomly generated every two hours, and all of the tokens are re-created every two hours. 
                  The token is sesson dependant, i.e. everytime you exit the website that token can never be used again. We also verify your IP address against the token. For referece, Facebook's tokens are only 255 length.
                </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>The Model</h1>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}
