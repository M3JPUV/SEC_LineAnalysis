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
         var h = this.state.HomeLinks;
         h.push(this.state.Games[i].homeTeam);
         var v = this.state.VorALinks;
         v.push(this.state.Games[i].VSorAT);
         var a = this.state.AwayLinks;
         a.push(this.state.Games[i].awayTeam);
         var p = this.state.PwinTLinks;
         p.push(this.state.Games[i].PwinT)
         this.setState({HomeLinks: h});
         this.setState({VorALinks: v});
         this.setState({AwayLinks: a});
         this.setState({PwinTLinks: p});
         console.log(this.state.HomeLinks);
         console.log(this.state.VorALinks);
         console.log(this.state.AwayLinks);
         console.log(this.state.PwinTLinks);
         this.setState({loaded: true});
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
                    className="d-block w-1000"
                    src={require("../images/rsz_w5.jpg")}
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
    { this.state.loaded && <GameBox away={(this.state.AwayLinks[0].toString())} VorA={(this.state.VorALinks[0].toString())} home={(this.state.HomeLinks[0].toString())} PwinT={(this.state.PwinTLinks[0].toString())} /> }
            </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}
