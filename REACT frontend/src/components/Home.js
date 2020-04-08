import React from "react";
import {
  Container,
  Carousel,
  Row,
  Col,
  Jumbotron,
  Figure,
  Spinner,
  Image,
} from "react-bootstrap";
import styled from "styled-components";
import { GameBox } from "./GameBox.jsx";
import axios from "axios";
const Styles = styled.div``;

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GameCount: 0,
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
      // this.setState({GameCount: Object.keys(this.state.Game).length});
      this.setState({Games: JSON.parse(this.state.Games)});
      this.setState({GameCount: this.state.Games.length})
       console.log(this.state.Games);
       console.log(this.state.GameCount);

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
         if (i == this.state.GameCount -1){
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
            <Col sm={4}>
              <Image src={require("../images/UBETCHA272.jpg")} />
            </Col>
            <Col sm={8}>
              <Jumbotron>
                <h1>Welcome to uBETcha!!!</h1>
                <p>
                  We are a College football betting model website, to learn
                  about how we make our model and paid subscriptions, click the
                  'About' tab at the top of your screen. Below is our top 3
                  games for the week.
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
    { this.state.loaded && this.state.Games.map(game => (<React.Fragment><h1>Game {this.state.Games.indexOf(game) + 1}</h1><GameBox away={(this.state.AwayLinks[this.state.Games.indexOf(game)].toString())} VorA={(this.state.VorALinks[this.state.Games.indexOf(game)].toString())} home={(this.state.HomeLinks[this.state.Games.indexOf(game)].toString())} PwinT={(this.state.PwinTLinks[this.state.Games.indexOf(game)].toString())} /> </React.Fragment>)   ) 
    }
            </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}
