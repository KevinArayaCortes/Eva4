import { useRouter } from 'next/router';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
  const router = useRouter();

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey) {
      router.push(selectedKey);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Menú Principal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={handleSelect}>
            <Nav.Link eventKey="/Componentes/pagRegistrarUsuario">Registrar nuevo usuario</Nav.Link>
            <Nav.Link eventKey="/Componentes/pagRegistrarJuego">Registrar Juego</Nav.Link>
            <Nav.Link eventKey="/Componentes/VerUsuarios">Ver Registro de Usuarios</Nav.Link>
            <Nav.Link eventKey="/Componentes/VerJuegos">Ver Registro de Videojuegos</Nav.Link>
            <Nav.Link eventKey="/">Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
