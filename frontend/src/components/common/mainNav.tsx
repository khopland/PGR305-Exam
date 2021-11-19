import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";

export const MainNav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ecomers
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/">
            Hjem
          </Nav.Link>
          <Nav.Link as={Link} to="cart">
            cart
          </Nav.Link>
          <Nav.Link as={Link} to="orders">
            orders
          </Nav.Link>
          <Nav.Link as={Link} to="admin">
            Admin
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
