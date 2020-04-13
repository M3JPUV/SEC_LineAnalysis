import React from "react";
import {
  Container,
  Carousel,
  Row,
  Col,
  Jumbotron,
  Image,
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
              <Jumbotron>
                <h1>Our Staff</h1>
              </Jumbotron>
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
                <h1>Monetization</h1>
            </Col>
          </Row>
          <Row>
            <Col>
                <h1>Security</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>The Model</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Contact Us</h1>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}
