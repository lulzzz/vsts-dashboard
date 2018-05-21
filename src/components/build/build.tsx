import * as React from 'react';
import { Card, CardSubtitle, CardTitle, Progress } from 'reactstrap';
import './build.css';

export interface IBuildProps {
  buildName: string;
  buildNumber: string;
  status: boolean;
}

export default class Build extends React.Component<IBuildProps, any> {
  private progressValue: number = 0;
  private buildStatus: string = this.props.status ? 'success' : 'danger';

  public render() {
    return (
      <div className="card-holder">
        <Card body={true} inverse={true} color={this.buildStatus}>
          <CardTitle>{this.props.buildName}</CardTitle>
          {this.showProgressBar()}
          <div className="info-bar">
            <CardSubtitle className="subtitle">#{this.props.buildNumber} - 2 hours ago</CardSubtitle>
          </div>
        </Card>
      </div>
    );
  }

  private showProgressBar(): any {
    if (this.progressValue > 0) {
      return <Progress className="progress" value={this.progressValue} color="info" />;
    } else {
      return <Progress className="progress" value="100" color="success" />;
    }
  }
}
