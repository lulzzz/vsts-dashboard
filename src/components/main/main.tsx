import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BuildService from '../../services/build-service';
import Build from '../build/build';
import IBuildState from '../build/build-state';
import './main.css';

export default class Main extends React.Component<any, IBuildState> {
  public componentDidMount() {
    new BuildService().getBuilds().then(builds => this.setState({ Builds: builds }));
  }

  public render() {
    const builds = this.state ? this.state.Builds.map(b => <Build key={b.Name + b.BuildNumber} buildName={b.Name} buildNumber={b.BuildNumber} status={b.Status} />) : [];
    const halfLength = Math.ceil(builds.length / 2);
    return (
      <Container>
        <Row>
          <Col md="6">{builds.splice(0, halfLength)}</Col>
          <Col md="6">{builds}</Col>
        </Row>
      </Container>
    );
  }
}
