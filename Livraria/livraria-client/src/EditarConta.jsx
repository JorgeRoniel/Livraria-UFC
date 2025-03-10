import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditarConta.css";
import { isAuthenticated, logout } from "./auth";
import { VITE_API_BASE_URL } from "./config";

export default function EditarConta({ onBalanceUpdate }) {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setSaldo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  
  const editarConta = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${VITE_API_BASE_URL}/api/users/${userId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, balance: parseFloat(balance) }),
        }
      );

      if (response.ok) {
        const newBalance = parseFloat(balance);
        localStorage.setItem("userBalance", newBalance);
        if (onBalanceUpdate) {
          onBalanceUpdate(newBalance);
        }
        alert("Conta atualizada com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao atualizar conta");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  const deletarConta = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${VITE_API_BASE_URL}/api/users/${userId}/delete`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        logout();
        alert("Conta excluída com sucesso!");
        navigate("/login");
      } else {
        alert("Erro ao excluir conta");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="container-editar container">
      <div className="header">
        <button className="logout" onClick={() => navigate("/")}>
          ⮜
        </button>
        <h2 className="titulo">Editar Conta</h2>
        <div className="logout" style={{ opacity: 0, cursor: "default" }}></div>
      </div>
      <form onSubmit={editarConta}>
        <input
          type="text"
          placeholder="Novo nome de usuário"
          value={name}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Novo email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Novo saldo"
          value={balance}
          onChange={(e) => setSaldo(e.target.value)}
          required
        />
        <div className="baixo">
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
          <button className="clear" type="button" onClick={deletarConta}>
            Excluir
          </button>
        </div>
      </form>
    </div>
  );
}
