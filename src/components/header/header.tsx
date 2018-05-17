import * as React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './header.css';

export default class Header extends React.Component {
  private title: string = 'VSTS Dashboard';
  public render() {
    return (
      <div>
        <Navbar color="dark" dark={true} expand="md">
          <NavbarBrand href="/">{this.title}</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
