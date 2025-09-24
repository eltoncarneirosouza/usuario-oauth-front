import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Table } from "react-bootstrap";
import api from "../api/axios";

function Cliente() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    cep: ""
  });
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const response = await api.get("/clients");
      setClientes(response.data);
    } catch (err) {
      setError("Erro ao carregar clientes");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await api.delete(`/clients/${id}`);
        await loadClientes();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError("Erro ao excluir cliente");
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (formData.id) {
        await api.put(`/clients/${formData.id}`, formData);
      } else {
        await api.post("/clients", formData);
      }
      
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        cpf: "",
        cep: ""
      });
      await loadClientes(); 
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar/atualizar cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Cadastrar Novo Cliente</h2>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" className="mb-4">
          Cliente cadastrado com sucesso!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Digite o nome completo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Digite o email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Digite a senha"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            placeholder="Digite o CPF (apenas números)"
            maxLength="11"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
            placeholder="Digite o CEP (apenas números)"
            maxLength="8"
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit"
          disabled={loading}
          className="d-flex align-items-center"
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          )}
          {loading ? "Cadastrando..." : "Cadastrar Cliente"}
        </Button>
      </Form>

      <h3 className="mt-5 mb-4">Clientes Cadastrados</h3>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>CEP</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.name}</td>
              <td>{cliente.email}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.cep}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        id: cliente.id,
                        name: cliente.name,
                        email: cliente.email,
                        cpf: cliente.cpf,
                        cep: cliente.cep,
                        password: ""
                      });
                      window.scrollTo(0, 0);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Cliente;