import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/home">Sistema de Usuários</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <NavDropdown title="Clientes" id="clients-nav-dropdown">
                <NavDropdown.Item as={Link} to="/cliente/novo">Cadastrar Novo</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/clientes">Listar Todos</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item onClick={handleLogout}>
                  Sair
                </NavDropdown.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h2>Bem-vindo ao Sistema</h2>
        <p>Selecione uma opção no menu acima.</p>
      </Container>
    </div>
  );
}

export default Home;
