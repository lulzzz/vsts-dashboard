import * as React from 'react';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <Main NumberOfColumns={2} />
      </div>
    );
  }
}

export default App;
