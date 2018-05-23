import * as React from 'react';
import * as Spinner from 'react-spinkit';
import { Col, Container, Row } from 'reactstrap';
import BuildService from '../../services/build-service';
import Build from '../build/build';
import IMainProps from './main-props';
import IMainState from './main-state';
import './main.css';

export default class Main extends React.Component<IMainProps, IMainState> {
  public componentWillMount() {
    this.setState({ Loading: true });
    new BuildService().getBuilds().then(builds => {
      this.setState({ Builds: builds, Loading: false });
    });
  }

  public render() {
    const numCols = this.props.NumberOfColumns;
    const builds =
      this.state && this.state.Builds
        ? this.state.Builds.map(b => <Build key={b.Name + b.BuildNumber} buildName={b.Name} buildNumber={b.BuildNumber} status={b.Status} time={b.EndTime} />)
        : [];

    const cols = [];
    for (let j = 0; j < numCols; j++) {
      cols.push(
        <Col key={j} lg={12 / numCols}>
          {builds.filter((v, i) => i % numCols === j)}
        </Col>
      );
    }

    if (this.state.Loading) {
      return (
        <div className="loader">
          <Spinner name="cube-grid" color="white" />
        </div>
      );
    } else {
      return (
        <Container fluid={true}>
          <Row>{cols}</Row>
        </Container>
      );
    }
  }
}
