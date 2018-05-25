import * as moment from 'moment';
import * as React from 'react';
import * as Spinner from 'react-spinkit';
import { Card, CardLink, CardSubtitle, CardTitle, Progress } from 'reactstrap';
import { BuildData } from '../../services/build-data';
import './build.css';

export interface IBuildProps {
  build: BuildData;
}

/**
 * This is responsible for rendering a build
 */
export class Build extends React.Component<IBuildProps> {
  /**
   * Ultimately will represent what colour to render the build
   */
  private buildStatus: string;

  /**
   * How far has the build progressed whilst running
   */
  private readonly progressValue: number = 0;

  /**
   * A string that represents build times or status of the build
   */
  private timeMarker: string;

  /**
   * Render the component
   */
  public render(): React.ReactNode {
    if (this.props.build.isRunning()) {
      this.buildStatus = "info"
      this.timeMarker = "Running"
    } else if (this.props.build.isQueued()) {
      this.buildStatus = "info"
      this.timeMarker = "Queued"
    } else {
      if (this.props.build.wasSuccessful() !== true) {
        this.buildStatus = 'danger'
      } else {
        this.buildStatus = 'success'
      }
      this.timeMarker = moment(this.props.build.endTime).fromNow();
    }

    return (
      <div className="card-holder">
        <Card className="shadow" body={true} inverse={true} color={this.buildStatus}>
          <CardTitle>
            <div className="title">
              {this.showProgressIndicator()}
              <CardLink className="header" href={this.props.build.url}>
                {this.props.build.name}
              </CardLink>
            </div>
          </CardTitle>
          {this.showProgressBar()}
          <div className="info-bar">
            <CardSubtitle className="subtitle">
              #{this.props.build.buildNumber} - {this.timeMarker}
            </CardSubtitle>
          </div>
        </Card>
      </div>
    );
  }

  private showProgressBar(): any {
    if (this.props.build.isRunning() || this.props.build.isQueued()) {
      return <Progress className="progress" value={this.progressValue} color="info" />;
    } else {
      return <Progress className="progress" value="100" color={this.buildStatus} />;
    }
  }

  private showProgressIndicator(): any {
    if (this.props.build.isRunning()) {
      return <Spinner name="circle" color="white" />;
    }
  }
}
