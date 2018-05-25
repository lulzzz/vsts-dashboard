import * as React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Main } from './components/main/main';

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
   * Render the application
   */
  public render(): React.ReactNode {
    return (
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <Main numberOfColumns={this.numberOfColumns} refreshInterval={this.refreshInterval} />
      </div>
    );
  }
}
