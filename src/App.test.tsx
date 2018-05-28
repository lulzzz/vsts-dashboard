import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
// tslint:disable-next-line:no-import-side-effect
import './mocks/local-storage';

it('renders without crashing', () => {
  const div: HTMLDivElement = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing when config is set', () => {
  const div: HTMLDivElement = document.createElement('div');
  localStorage.setItem('VSTS_PROJECT', 'Project');
  localStorage.setItem('VSTS_TOKEN', 'TOKEN');
  localStorage.setItem('VSTS_URL', 'https://fabrikam.visualstudio.com/defaultcollection');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
