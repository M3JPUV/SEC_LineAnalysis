import React from "react";
import { Container, Carousel, Row, Col, Jumbotron, Figure , Spinner} from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`

`;

export class GameBox extends React.Component{
    state = {
        HorA: "../CFB_HELMETS/VS.jpg",
        visiting: "../CFB_HELMETS/LSU.gif",
        home: "../CFB_HELMETS/LSU.gif",
        PwinT: "../CFB_HELMETS/LSU.gif",
        PwinP: "100"
    }



  render() {
    return (
        /*
      <Styles>
        <Container fluid>
          <Row>
            <Col>
              <Figure>
                <Figure.Image
                  width={160}
                  height={106}
                  alt="160x106"
                  src={require(this.away)}
                  roundedCircle
                />
                <Figure.Caption>
                  LSU
                </Figure.Caption>
              </Figure>
            </Col>
            <Col>
            <Figure>
                <Figure.Image
                  width={160}
                  height={106}
                  alt="160x106"
                  src={require(this.HorA)}
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
                  src={require(this.home)}
                  roundedCircle
                />
              </Figure>
              <Figure.Caption>
                  Alabama
              </Figure.Caption>
            </Col>
            <Col>
            <Figure>
                 <Spinner animation="border" variant="dark" />
                <Spinner animation="border" variant="dark" />
                <Spinner animation="border" variant="danger" />
                <Spinner animation="border" variant="danger" />
              <Figure.Caption>
                  Our Model Predicts...
              </Figure.Caption>    
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
                  src={require(this.PwinT)}
                  roundedCircle
                />
              </Figure>
              <Figure.Caption>
                  LSU
              </Figure.Caption>
            </Col>
          </Row>
        </Container>
        </Styles>
        */
       <div></div>
    );
  }
}