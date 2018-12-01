import React from 'react';

import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button
} from '@blueprintjs/core';

import '../assets/css/app-header.css';

const Header = () => (
  <Navbar className="app-header" fixedToTop>
    <NavbarGroup align="left">
      <NavbarHeading>Digital Empowerment</NavbarHeading>
      <NavbarDivider />
      <Link to="/"><Button minimal icon="home" text="Home" /></Link>
      <Link to="/paths"><Button minimal icon="path-search" text="Paths" /></Link>
      <Link to="/login"><Button minimal icon="log-in" text="Log in" /></Link>
    </NavbarGroup>
  </Navbar>
);

export default Header;
