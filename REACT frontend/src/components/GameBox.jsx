import React from "react";
import {
  Container,
  Row,
  Col,
  Figure,
  Spinner,
} from "react-bootstrap";
import styled from "styled-components";
const Styles = styled.div``;
//import React, { useState } from 'react';
export class GameBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: "LSU",
      loaded: false,
    }
  }

  render() {
    return (
      <Styles>
        <Container fluid>
          <Row>
            <Col>
              <Figure>
                <Figure.Image
                  width={160}
                  height={106}
                  alt="160x106"
                  src={ require("../CFB_HELMETS/" + this.props.away + ".gif")}
                  roundedCircle
                />
                <Figure.Caption>
                  {this.props.away}
                </Figure.Caption>
              </Figure>
            </Col>
            <Col>
              <Figure>
                <Figure.Image
                  width={160}
                  height={106}
                  alt="160x106"
                  src={ require("../CFB_HELMETS/" + this.props.VorA + ".jpg")}
                  roundedCircle
                />
              </Figure>
            </Col>
            <Col>
              <Figure>
                <Figure.Image
                  width={160}
                  height={106}
                  alt="160x106"
                  src={require("../CFB_HELMETS/" + this.props.home + ".gif")}
                  roundedCircle
                />
                <Figure.Caption>
                  {this.props.home}
                </Figure.Caption>
              </Figure>
            </Col>
            <Col>
              <Figure>
                <Spinner animation="border" variant="dark" />
                <Spinner animation="border" variant="dark" />
                <Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="danger" />
                <Figure.Caption>Our Model Predicts...</Figure.Caption>
                <Spinner animation="border" variant="dark" />
                <Spinner animation="border" variant="dark" />
                <Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="danger" />
              </Figure>
            </Col>
            <Col>
              <Figure>
                <Figure.Image
                  width={160}
                  height={106}
                  alt="160x106"
                  src={require("../CFB_HELMETS/" + this.props.PwinT + ".gif")}
                  roundedCircle
                />
                <Figure.Caption>
                  {this.props.PwinT}
                </Figure.Caption>
              </Figure>
            </Col>
            <Col>
            <Figure>
                <Figure.Image
                  width={160}
                  height={106}
                  alt="160x106"
                  src={require("../images/percents/" + this.props.PwinP + ".png")}
                  roundedCircle
                />
              </Figure>
            </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}
