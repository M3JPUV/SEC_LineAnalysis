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
  ButtonGroup,
} from "react-bootstrap";
import styled from "styled-components";
import { GameBox } from "./GameBox.jsx";
import axios from "axios";
import Newsticker from 'react-newsticker';
const Styles = styled.div``;

export class Advanced extends React.Component {
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
      PwinPLinks: [],
      initialWteam: "",
      intialWper: "",
      currentVars: [],
      currentVarZero: "",
      currentVarOne: "",
      currentVarTwo: "",
      currentWteam: "LSU",
      currentWper: "0",
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
     axios.get("http://138.47.204.105:5000/api/Basic").then(res => {
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
        var per = this.state.PwinPLinks;
        }
        a.push(this.state.Games[i].awayTeam);
        v.push(this.state.Games[i].VSorAT);
        h.push(this.state.Games[i].homeTeam);
        p.push(this.state.Games[i].PwinT)
        per.push(this.state.Games[i].PwinP)
        if (i === this.state.GameCount -1){
        this.setState({HomeLinks: h});
        this.setState({VorALinks: v});
        this.setState({AwayLinks: a});
        this.setState({PwinTLinks: p});
        this.setState({PwinPLinks: per})
        this.setState({loaded: true});
        }
      }
       
     }).catch(error => console.log(error));
     
   }

   selectGame = (choice) => {
      //obtain and select the new model game data
     axios({
        method: 'POST',
        url: 'http://138.47.204.102:3000/api/Model',
        data: {
          "variables":"",
          "awayTeam": this.state.AwayLinks[parseInt(choice)].toString(),
          "homeTeam": this.state.HomeLinks[parseInt(choice)].toString()
        }
      }).then(res => {
        this.setState({initialWteam: res.data.PwinT});
        this.setState({intialWper: res.data.PwinP});
        this.setState({currentgame: parseInt(choice)});
        this.setState({currentWper: res.data.PwinP});
        this.setState({currentWteam: res.data.PwinT});
        var temp = [];
        for (var i = 0; i < 12; i++){
            temp.push(res.data.top_features[i]);
        }
        this.setState({currentVars: temp});
        this.setState({selectGame: false});
        this.setState({Metrics: true});
      }).catch(error => console.log(error));
   }

   updateVariables = () => {
     var variables = this.state.currentVarZero.toString() + "," + this.state.currentVarOne.toString() + "," + this.state.currentVarTwo.toString();
    axios.post("http://138.47.204.102:3000/api/Model", {"variables": variables, "awayTeam": this.state.AwayLinks[this.state.currentgame].toString(), "homeTeam": this.state.HomeLinks[this.state.currentgame].toString() }).then(res => {
    this.setState({currentWteam: res.data.PwinT});
    this.setState({currentWper: res.data.PwinP});
    });
   }

   chooseNewGame = () => {
     this.setState({selectGame: true});
     this.setState({Metrics: false});
   }

   chooseNewTwoVar = (vars) => {
      this.setState({currentVarTwo: vars});
   }

   chooseNewOneVar = (vars) => {
     this.setState({currentVarOne: vars});
   }

   chooseNewZeroVar = (vars) => {
    this.setState({currentVarZero: vars});
  }

   verifyLogin = () => {
    axios.post('http://138.47.204.105:5000/api/checkTokens/', { "Token": this.props.token, "Login": this.props.LC }).then(res => {
      if (res.data != null ){
        if (res.data.Advanced.toString() === "1"){
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
                <h1>Advanced Model</h1>
                <p>
                  Welocme to the ADVANCED model. Please select a game for the advanced metrics by 
                  clicking on the "Show advanced Metrics" button adjacent to the game and it will swap to that games view.
                  You will be able to adjust a few of the models top variables for that game. Adjust them as you see fit and hit the dark "Submit Changes" button.
                  Thank you so much for being a patron of uBETcha!!!
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
            <Jumbotron>
                <h1>How winning percentage works:</h1>
                <p>An Equation Model takes in data from our win/loss outcome of the logarithmic regression model and then compares two teams’ outcomes. This comparison is made by looking at each teams’ top features and analyzing which team has the better features based their performance. In the end, the win/loss outcome is the confidence level of that team winning over another team.</p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
            { !this.state.verifiedLogin && (<Alert variant="danger">
                  <Alert.Heading>Attention</Alert.Heading>
                  <p>
                    Note that you are currently not logged in as a ADVANCED user, if you would like access to more features, please consider purchasing an ADVANCED subscription.
                    Additionally, all PRO users also have access to ADVANCED Metrics.
                  </p>
                  <hr />
                  <p className="mb-0">
                    If you have purchased an ADVANCED subscription, please login first. 
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
          <Button variant="danger" size="lg" onClick={() => this.selectGame(this.state.Games.indexOf(game))}> Show Advanced Metrics </Button>{' '}
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
                      <GameBox away={(this.state.AwayLinks[this.state.currentgame].toString())} VorA={(this.state.VorALinks[2].toString())} home={(this.state.HomeLinks[this.state.currentgame].toString())} PwinT={this.state.initialWteam} PwinP={this.state.intialWper}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>Current Winning Team:</h4>
                    </Col>
                    <Col>
                      <Image src={require("../CFB_HELMETS/" + this.state.currentWteam + ".gif")} />
                    </Col>
                    <Col>
                      <h4>Current Winning Percentage:</h4>
                    </Col>
                    <Col>
                      <Image src={require("../images/percents/" + this.state.currentWper + ".png")} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Jumbotron>
                        <h4>Above is the current model outcome based off of your decisions.</h4>
                        <h4>Below is the way you can influence the model. We have a table with all of the avaliable variables you would like the model to prioritize (i.e. you think the game will 
                          end up being more dependant on these variables to determine the outcome.)
                        </h4>
                      </Jumbotron>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <Button variant="danger" block={true}>View Variable Translation Table</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>_____________________________________________________________________________________________</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>Advanced Model: Please pick a variable to prioritize from each button group below:</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>_____________________________________________________________________________________________</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <h3>Group 1 Selection: {this.state.currentVarZero}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[0])}>{this.state.currentVars[0]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[1])}>{this.state.currentVars[1]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[2])}>{this.state.currentVars[2]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[3])}>{this.state.currentVars[3]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[4])}>{this.state.currentVars[4]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[5])}>{this.state.currentVars[5]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[6])}>{this.state.currentVars[6]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[7])}>{this.state.currentVars[7]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[8])}>{this.state.currentVars[8]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[9])}>{this.state.currentVars[9]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[10])}>{this.state.currentVars[10]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewZeroVar(this.state.currentVars[11])}>{this.state.currentVars[11]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>_____________________________________________________________________________________________</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>Group 2 Selection: {this.state.currentVarOne}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[0])}>{this.state.currentVars[0]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[1])}>{this.state.currentVars[1]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[2])}>{this.state.currentVars[2]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[3])}>{this.state.currentVars[3]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[4])}>{this.state.currentVars[4]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[5])}>{this.state.currentVars[5]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[6])}>{this.state.currentVars[6]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[7])}>{this.state.currentVars[7]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[8])}>{this.state.currentVars[8]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[9])}>{this.state.currentVars[9]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[10])}>{this.state.currentVars[10]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewOneVar(this.state.currentVars[11])}>{this.state.currentVars[11]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>_____________________________________________________________________________________________</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>Group 3 Selection: {this.state.currentVarTwo}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[0])}>{this.state.currentVars[0]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[1])}>{this.state.currentVars[1]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[2])}>{this.state.currentVars[2]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[3])}>{this.state.currentVars[3]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[4])}>{this.state.currentVars[4]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[5])}>{this.state.currentVars[5]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[6])}>{this.state.currentVars[6]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[7])}>{this.state.currentVars[7]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[8])}>{this.state.currentVars[8]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[9])}>{this.state.currentVars[9]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[10])}>{this.state.currentVars[10]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Button variant="primary" block={true} onClick={ () => this.chooseNewTwoVar(this.state.currentVars[11])}>{this.state.currentVars[11]}</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>_____________________________________________________________________________________________</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <h3>Submit Changes</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                          <Button variant="danger" block={true} onClick={ () => this.updateVariables()}>Submit changes to model</Button>
                    </Col>
                  </Row>
                </React.Fragment>}
        </Container>
      </Styles>
    );
  }
}
