import * as React from 'react';
import { Button, Navbar, NavbarBrand } from 'reactstrap';
import { ConfigService } from '../../services/config-service';
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
          <Button onClick={this.configure}>Configure</Button>
        </Navbar>
      </div>
    );
  }

  private configure(): void {
    new ConfigService().ProjectName = '';
    location.reload();
  }
}
