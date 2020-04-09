import React from "react";
import { Container, Carousel, Row, Col, Jumbotron, Figure , Alert, Image, Button} from 'react-bootstrap';
import styled from 'styled-components';
import Newsticker from 'react-newsticker';
const Styles = styled.div`
`;

export class Subscriptions extends React.Component{

    state = {
        token: '',
        basic: true,
        advanced: false,
        pro: false,
        test: [" @              Game A Team A vs Team B Score 45-30 Team B", "@       Game B Team C vs Team D Score 45-30 Team C", "      Game C Team E vs Team F Score 45-30 Team F"],
     
    } 
  componentDidMount() {
    this.setState({token: this.props.token});
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
                <h1>Subscriptions</h1>
                <p>Here is the place to see the subscriptions we offer (week-to-week or by season) for our Advanced and Pro Models. For more information on why you should consider our Subscriptions, look in the "Subscription" tab in our About Us page.</p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
              <Col>
                { this.state.basic && (<Alert variant="success">
                  <Alert.Heading>Attention</Alert.Heading>
                  <p>
                    Note that you are currently a BASIC user (if this is incorrect, please Login)
                  </p>
                </Alert>) }
              </Col>
            </Row>
            <Row>
              <Col>
                { this.state.advanced && (<Alert variant="success">
                  <Alert.Heading>Attention</Alert.Heading>
                  <p>
                    Note that you are currently an ADVANCED user.
                  </p>
                </Alert>) }
              </Col>
            </Row>
            <Row>
              <Col>
                { this.state.pro && (<Alert variant="success">
                  <Alert.Heading>Attention</Alert.Heading>
                  <p>
                    Note that you are currently an PRO user.
                  </p>
                </Alert>) }
              </Col>
            </Row>
          <Row>
              <Col md={{ span:6, offset:3 }}>
                <h1>Week-by-Week Subscriptions</h1>
              </Col>
          </Row>
          <Row>
              <Col>
                <Figure>
                    <Figure.Image 
                        width={172}
                        height={131}
                        alt="172x131"
                        src={require('../images/1dollarsign.png')}
                    />
                    <Figure.Caption>
                        Basic: Free to the public.
                    </Figure.Caption>
                    <Button variant="success"> FREE!!!</Button>
                </Figure>
              </Col>
              <Col>
                <Figure>
                    <Figure.Image 
                        width={172}
                        height={131}
                        alt="172x131"
                        src={require('../images/2dollarsign.png')}
                    />
                    <Figure.Caption>
                        Advanced: $4.99 USD /week
                    </Figure.Caption>
                </Figure>
              </Col>
              <Col>
                <Figure>
                    <Figure.Image 
                        width={172}
                        height={131}
                        alt="172x131"
                        src={require('../images/3dollarsign.png')}
                    />
                    <Figure.Caption>
                        Pro: $14.99 USD /week
                    </Figure.Caption>
                </Figure>
              </Col>
          </Row>
          <Row>
              <Col md={{ span:6, offset:3 }}>
                <h1>Per-Season Subscriptions</h1>
              </Col>
          </Row>
          <Row>
              <Col>
                <Figure>
                    <Figure.Image 
                        width={172}
                        height={131}
                        alt="172x131"
                        src={require('../images/1dollarsign.png')}
                    />
                    <Figure.Caption>
                        Basic: Free to the public.
                    </Figure.Caption>
                    <Button variant="success"> FREE!!!</Button>
                </Figure>
              </Col>
              <Col>
                <Figure>
                    <Figure.Image 
                        width={172}
                        height={131}
                        alt="172x131"
                        src={require('../images/2dollarsign.png')}
                    />
                    <Figure.Caption>
                        Advanced: $35.99 USD /season
                    </Figure.Caption>
                </Figure>
              </Col>
              <Col>
                <Figure>
                    <Figure.Image 
                        width={172}
                        height={131}
                        alt="172x131"
                        src={require('../images/3dollarsign.png')}
                    />
                    <Figure.Caption>
                        Pro: $107.99 USD /season
                    </Figure.Caption>
                </Figure>
              </Col>
          </Row>
        </Container>
        </Styles>
    );
  }
}