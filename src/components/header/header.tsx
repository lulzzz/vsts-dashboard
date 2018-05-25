import * as React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './header.css';

/**
 * Responsible for rendering the header part of the application
 */
export class Header extends React.Component {
  /**
   * The title displayed in the navbar
   */
  private readonly title: string = 'VSTS Dashboard';

  /**
   * Render the header
   */
  public render(): React.ReactNode {
    return (
      <div>
        <Navbar color="dark" dark={true} expand="md">
          <NavbarBrand href="/">{this.title}</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
