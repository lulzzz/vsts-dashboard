import * as moment from 'moment';
import * as React from 'react';
import * as Spinner from 'react-spinkit';
import { Col, Container, Row } from 'reactstrap';
import { BuildData } from '../../services/build-data';
import { BuildService } from '../../services/build-service';
import { Build } from '../build/build';
import { IMainState } from './main-state';
import './main.css';

export interface IMainProps {
  numberOfColumns: number;
  refreshInterval: number;
}

/**
 * The container that holds all the build components
 */
export class Main extends React.Component<IMainProps, IMainState> {
  /**
   * The timer to keep track of when to refresh
   */
  private timer: NodeJS.Timer;

  public componentDidMount(): void {
    this.timer = setInterval(() => this.getBuildData(), this.props.refreshInterval);
  }

  public componentWillMount(): void {
    this.setState({ loading: true });
    this.getBuildData();
  }

  public componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  /**
   * Render the component
   */
  public render(): React.ReactNode {
    const numCols: number = this.props.numberOfColumns;
    const builds: React.ReactNode[] =
      this.state && this.state.builds
        ? this.state.builds.map(b => <Build key={b.name} build={b} />)
        : [];

    const cols: React.ReactNode[] = [];
    const maxColumns: number = 12;
    for (let j: number = 0; j < numCols; j++) {
      cols.push(
        <Col key={j} lg={maxColumns / numCols}>
          {builds.filter((v: BuildData, i: number) => i % numCols === j)}
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

  /**
   * Get the build data from VSTS
   */
  private getBuildData(): void {
    new BuildService().getBuilds().then((b: BuildData[]) => {
      this.setState({ builds: b, loading: false, lastUpdated: new Date(moment.now()) });
    });
  }
}
