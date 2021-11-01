import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export const MainNav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          konuslent
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/">
            Hjem
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/prosjekt">
            prosjekt
          </Nav.Link>
          <Nav.Link as={Link} to="/ansatte">
            Ansatte
          </Nav.Link>
          <Nav.Link as={Link} to="/kunder">
            Kunder
          </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
};
