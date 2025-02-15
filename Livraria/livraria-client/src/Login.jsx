import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { VITE_API_BASE_URL, VITE_NOTIFICATIONS_WS_URL } from "./config";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro ao fazer login");

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userBalance", data.balance);
      localStorage.setItem("userId", data.id);
      onLogin();
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${VITE_API_BASE_URL}/api/auth/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, balance: 0 }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar usuário");
      alert("Cadastro realizado com sucesso!");
      setShowRegister(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <div className={`div-image ${showRegister ? "expand" : ""}`}>
        {!showRegister ? (
          <button
            onClick={() => setShowRegister(true)}
            className="button cadastrar"
          >
            Registre-se!
          </button>
        ) : (
          <div className="register-form">
            <div className="header-cadastro">
              <button
                className="back-button-login"
                onClick={() => setShowRegister(false)}
              >
                ⮜
              </button>
              <div className="cadastro-conta">Registro</div>
            </div>
            <form className="form" onSubmit={handleCadastroSubmit}>
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="baixo">
                <button type="submit" className="button" disabled={loading}>
                  {loading ? "Cadastrando..." : "Registrar"}
                </button>
                <button
                  className="clear"
                  type="button"
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setNome("");
                  }}
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {!showRegister && (
        <div className="login">
          <h2 className="titulo">Login</h2>
          <form className="inputs" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button className="button" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
