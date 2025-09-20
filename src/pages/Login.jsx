import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/login", {
        email: "elton@gmail.com",
        password: "123456"
      });
      
      const { accessToken } = response.data;
      if (accessToken) {
        login({ accessToken });
        navigate("/home");
      } else {
        throw new Error("Token não recebido do servidor");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError(err.response?.data?.message || "Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="p-8 border rounded-xl shadow-lg w-96 bg-white flex flex-col gap-4"
        style={{ maxWidth: 400 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Bem-vindo!</h2>
        <p className="text-center text-gray-500 mb-4">Faça login para acessar o sistema</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-center mb-2 animate-pulse">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded w-full outline-none transition mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded w-full outline-none transition mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button
          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold transition flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : null}
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="text-center mt-2">
          <a href="#" className="text-blue-500 hover:underline text-sm">Esqueci minha senha</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
