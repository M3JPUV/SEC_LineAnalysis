import React from "react";
import {
  Container,
  Carousel,
  Row,
  Col,
  Jumbotron,
  Image,
  ListGroup,
  Button,
  Alert,
} from "react-bootstrap";
import styled from "styled-components";
import { GameBox } from "./GameBox.jsx";
import axios from "axios";
import Newsticker from 'react-newsticker';
const Styles = styled.div``;

export class Pro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentgame: -1,
      GameCount: 0,
      Games: [],
      HomeLinks: [],
      VorALinks: [],
      AwayLinks: [],
      PwinTLinks: [],
      loaded: false,
      verifiedLogin: false,
      selectGame: true,
      Metrics: false,
      test: [""],
    };
  }

   componentDidMount(){
      axios.get("http://138.47.204.105:5000/api/Scores").then(res => {
        this.setState({test: res.data});
      })
     axios.get("http://138.47.204.105:5000/api/gamebox").then(res => {
       this.verifyLogin();
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

   selectGame = (choice) => {
      this.setState({currentgame: parseInt(choice)});
      this.setState({selectGame: false});
      this.setState({Metrics: true});
   }

   chooseNewGame = () => {
     this.setState({selectGame: true});
     this.setState({Metrics: false});
   }

   verifyLogin = () => {
    axios.post('http://138.47.204.105:5000/api/checkTokens/', { "Token": this.props.token, "Login": this.props.LC }).then(res => {
      if (res.data != null ){
        if (res.data.Pro.toString() === "1"){
          this.setState({verifiedLogin: true});
        }
    }
    }).catch(error => { });
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
                <h1>Pro Model</h1>
                <p>
                  Welocme to the PRO model. Please select a game for the advanced metrics by 
                  clicking on the "See Pro-Model Metrics" button adjacent to the game and it will swap to that games view.
                  You will be able to adjust a ALL of the models variables for that game. Adjust them as you see fit and hit the dark "Submit Changes" button.
                  Thank you so much for being a patron of uBETcha!!!
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
            { !this.state.verifiedLogin && (<Alert variant="danger">
                  <Alert.Heading>Attention</Alert.Heading>
                  <p>
                    Note that you are currently not logged in as a PRO user, if you would like access to more features, please consider purchasing an PRO subscription.
                  </p>
                  <hr />
                  <p className="mb-0">
                    If you have purchased an PRO subscription, please login first. 
                  </p>
                </Alert>) }
            </Col>
          </Row>
          <Row>
            <Col> 
              <ListGroup>
    { this.state.loaded && this.state.selectGame && this.state.verifiedLogin && this.state.Games.map(game => (
    <React.Fragment>
      <Row>
        <Col sm={9}>
          <ListGroup.Item>
            {this.state.AwayLinks[this.state.Games.indexOf(game)].toString()} {this.state.VorALinks[this.state.Games.indexOf(game)].toString()} {this.state.HomeLinks[this.state.Games.indexOf(game)].toString()}
          </ListGroup.Item>
        </Col>
        <Col sm={3}>
          <Button variant="danger" size="lg" onClick={() => this.selectGame(this.state.Games.indexOf(game))}>See Pro-Model Metrics </Button>{' '}
        </Col>
      </Row>
    </React.Fragment>)   ) 
    }
              </ListGroup>
            </Col>
          </Row>
              { this.state.loaded && this.state.Metrics && <React.Fragment>
                <Row>
                  <Col>
                    <Button variant="danger" block={true} onClick={() => this.chooseNewGame()}> Return to Game Selection Page </Button>{' '}
                  </Col>
                </Row>
                  <Row>
                    <Col>
                      <GameBox away={(this.state.AwayLinks[this.state.currentgame].toString())} VorA={(this.state.VorALinks[2].toString())} home={(this.state.HomeLinks[this.state.currentgame].toString())} PwinT={(this.state.PwinTLinks[this.state.currentgame].toString())}/>
                    </Col>
                  </Row>
                </React.Fragment>}
        </Container>
      </Styles>
    );
  }
}
