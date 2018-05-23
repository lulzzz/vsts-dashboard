import * as moment from 'moment';
import * as React from 'react';
import { Card, CardSubtitle, CardTitle, Progress } from 'reactstrap';
import { BuildResult, BuildStatus } from 'vso-node-api/interfaces/BuildInterfaces';
import './build.css';

export interface IBuildProps {
  buildName: string;
  buildNumber: string;
  result: number;
  status: number;
  time: Date;
}

/**
 * This is responsible for rendering a build
 */
export default class Build extends React.Component<IBuildProps, any> {
  /**
   * Ultimately will represent what colour to render the build
   */
  private buildStatus: string;

  /**
   * How far has the build progressed whilst running
   */
  private progressValue: number = 0;

  /**
   * Render the component
   */
  public render() {
    if (this.props.result === BuildResult.Succeeded) {
      this.buildStatus = 'success';
    } else if (this.props.status === BuildStatus.InProgress) {
      this.buildStatus = 'warning';
    } else {
      this.buildStatus = 'danger';
    }

    return (
      <div className="card-holder">
        <Card className="shadow" body={true} inverse={true} color={this.buildStatus}>
          <CardTitle>{this.props.buildName}</CardTitle>
          {this.showProgressBar()}
          <div className="info-bar">
            <CardSubtitle className="subtitle">
              #{this.props.buildNumber} - {this.props.time ? moment(this.props.time).fromNow() : 'Running'}
            </CardSubtitle>
          </div>
        </Card>
      </div>
    );
  }

  private showProgressBar(): any {
    if (this.progressValue > 0) {
      return <Progress className="progress" value={this.progressValue} color="info" />;
    } else {
      return <Progress className="progress" value="100" color={this.buildStatus} />;
    }
  }
}
