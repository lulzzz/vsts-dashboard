import * as React from 'react';
import * as Spinner from 'react-spinkit';
import { Col, Container, Row } from 'reactstrap';
import BuildService from '../../services/build-service';
import Build from '../build/build';
import IBuildState from '../build/build-state';
import './main.css';

export default class Main extends React.Component<any, IBuildState> {
  public componentWillMount() {
    this.setState({ Loading: true });
    new BuildService().getBuilds().then(builds => {
      this.setState({ Builds: builds, Loading: false });
    });
  }

  public render() {
    const builds =
      this.state && this.state.Builds
        ? this.state.Builds.map(b => <Build key={b.Name + b.BuildNumber} buildName={b.Name} buildNumber={b.BuildNumber} status={b.Status} time={b.EndTime} />)
        : [];
    if (this.state.Loading) {
      return (
        <div className="loader">
          <Spinner name="cube-grid" color="white" />
        </div>
      );
    } else {
      return (
        <Container fluid={true}>
          <Row>
            <Col md="6">{builds.filter((v, i) => i % 2 === 0)}</Col>
            <Col md="6">{builds.filter((v, i) => i % 2 === 1)}</Col>
          </Row>
        </Container>
      );
    }
  }
}
