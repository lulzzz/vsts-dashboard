import * as React from 'react';
import { Card, CardSubtitle, CardTitle, Progress } from 'reactstrap';
import './build.css';

export interface IBuildProps {
  buildName: string;
}

export default class Build extends React.Component<IBuildProps, any> {
  private progressValue: number = Math.random() * 100;

  public render() {
    return (
      <div className="card-holder">
        <Card body={true} inverse={true} color="success">
          <CardTitle>{this.props.buildName}</CardTitle>
          {this.showProgressBar()}
          <div className="info-bar">
            <CardSubtitle className="subtitle">#1 - 2 hours ago</CardSubtitle>
          </div>
        </Card>
      </div>
    );
  }

  private showProgressBar(): any {
    if (this.progressValue > 0) {
      return <Progress className="progress" value={this.progressValue} color="info" />;
    } else {
      return <div className="progress" />;
    }
  }
}
