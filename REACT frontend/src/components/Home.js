import React from "react";
import { Container, Carousel, Row, Col, Jumbotron, Figure , Spinne, Image} from 'react-bootstrap';
import styled from 'styled-components';
import {GameBox} from './GameBox.js'


const Styles = styled.div`





`;

export class Home extends React.Component{


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
            <Col sm={4}>
              <Image src={require('../images/UBETCHA272.jpg')} />
            </Col>
            <Col sm={8}>
              <Jumbotron>
                <h1>Welcome to uBETcha!!!</h1>
                <p>We are a College football betting model website, to learn about how we make our model and paid subscriptions, click the 'About' tab at the top of your screen. Below is our top 3 games for the week.</p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        </Styles>
    );
  }
}