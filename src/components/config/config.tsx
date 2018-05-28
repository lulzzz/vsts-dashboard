import * as React from 'react';
import { Button, Container, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { ConfigService } from '../../services/config-service';
import './config.css';

interface IConfigData {
  accountName: string;
  project: string;
  token: string;
}

/**
 * Configures the settings for the dashboard
 */
export class Config extends React.Component<IConfigData, IConfigData> {
  public constructor(props: IConfigData) {
    super(props);
    this.setAccountName = this.setAccountName.bind(this);
    this.setProject = this.setProject.bind(this);
    this.setToken = this.setToken.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
  }

  public componentDidMount(): void {
    this.setState(this.props);
  }

  /**
   * Render the page
   */
  public render(): React.ReactNode {
    return (
      <Container className="input-container">
        <p>Configure your dashboard here:</p>
        <InputGroup>
          <Input placeholder="account-name" onChange={this.setAccountName} defaultValue={this.state ? this.state.accountName : ''} />
          <InputGroupAddon addonType="append">.visualstudio.com</InputGroupAddon>
        </InputGroup>
        <Input type="password" placeholder="auth-token" onChange={this.setToken} defaultValue={this.state ? this.state.token : ''} />
        <Input placeholder="project-name" onChange={this.setProject} defaultValue={this.state ? this.state.project : ''} />
        <Button color="primary" block={true} onClick={this.saveConfig}>
          Save
        </Button>
      </Container>
    );
  }

  private saveConfig(): void {
    const configService: ConfigService = new ConfigService();
    configService.AccountURL = this.state.accountName;
    configService.ProjectName = this.state.project;
    configService.Token = this.state.token;
    location.reload();
  }

  private setAccountName(event: any): void {
    this.setState({ accountName: `https://${event.target.value}.visualstudio.com` });
  }

  private setProject(event: any): void {
    this.setState({ project: event.target.value });
  }

  private setToken(event: any): void {
    this.setState({ token: event.target.value });
  }
}
