import * as React from 'react';
import './App.css';
import { Config } from './components/config/config';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { ConfigService } from './services/config-service';

/**
 * Represents the "entry point" for the react UI
 */
export class App extends React.Component {
  /**
   * What is the default number of columns for the application
   */
  private readonly numberOfColumns: number = 2;

  /**
   * How many ms to wait before refreshing the data
   */
  private readonly refreshInterval: number = 60000;

  /**
   * Configuration service to determine whether
   * the site is configured
   */
  private readonly configService: ConfigService = new ConfigService();

  /**
   * Render the application
   */
  public render(): React.ReactNode {
    return (
      <div className="App">
        <div className="header">
          <Header />
        </div>
        {this.showPage()}
      </div>
    );
  }

  private showPage(): React.ReactNode {
    if (!this.configService.AccountURL) {
      return <Config accountName={this.configService.AccountURL} project={this.configService.ProjectName} token={this.configService.Token} />;
    } else {
      return <Main configService={this.configService} numberOfColumns={this.numberOfColumns} refreshInterval={this.refreshInterval} />;
    }
  }
}
