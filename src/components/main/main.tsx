import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Build from '../build/build';
import './main.css';

export default class Main extends React.Component {
  public render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <Build buildName="Test Build" />
            <Build buildName="Test Build" />
            <Build buildName="Test Build" />
            <Build buildName="Test Build" />
            <Build buildName="Test Build" />
          </Col>
          <Col xs="6">
            <Build buildName="Test Build 2" />
          </Col>
        </Row>
      </Container>
    );
  }
}
