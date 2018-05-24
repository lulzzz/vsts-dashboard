import * as moment from 'moment';
import * as React from 'react';
import * as Spinner from 'react-spinkit';
import { Col, Container, Row } from 'reactstrap';
import BuildService from '../../services/build-service';
import Build from '../build/build';
import IMainProps from './main-props';
import IMainState from './main-state';
import './main.css';

export default class Main extends React.Component<IMainProps, IMainState> {
  private timer: NodeJS.Timer;

  public componentWillMount() {
    this.setState({ loading: true });
    this.getBuildData();
  }

  public componentDidMount() {
    this.timer = setInterval(() => this.getBuildData(), this.props.refreshInterval);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public render() {
    const numCols = this.props.numberOfColumns;
    const builds =
      this.state && this.state.builds
        ? this.state.builds.map(b => <Build key={b.name} build={b} />)
        : [];

    const cols = [];
    for (let j = 0; j < numCols; j++) {
      cols.push(
        <Col key={j} lg={12 / numCols}>
          {builds.filter((v, i) => i % numCols === j)}
        </Col>
      );
    }

    if (this.state.loading) {
      return (
        <div className="loader">
          <Spinner name="cube-grid" color="white" />
        </div>
      );
    } else {
      return (
        <Container fluid={true}>
          <Row>{cols}</Row>
          <Row>
            <p className="last-updated">Last Updated: {moment(this.state.lastUpdated).format('HH:mm:ss')}</p>
          </Row>
        </Container>
      );
    }
  }

  private getBuildData() {
    return new BuildService().getBuilds().then(b => {
      this.setState({ builds: b, loading: false, lastUpdated: new Date(moment.now()) });
    });
  }
}
